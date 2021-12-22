import sys
import codecs
from hale.HaleVisitor import HaleVisitor
from hale.HaleLexer import HaleLexer
from hale.HaleParser import HaleParser
from antlr4.BufferedTokenStream import BufferedTokenStream
from antlr4.Lexer import Lexer
from antlr4.Token import Token
from inputStream import InputStream
from CommonTokenStream import CommonTokenStream

class BaseFunction:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    def call(self, context, param_values):
        return 1

    def __str__(self):
        return f"<function {self._name}>"

    def __repr__(self):
        return str(self)


class Split(BaseFunction):
    def __init__(self):
        super().__init__("listsplit")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return (p[0], p[1:])
        raise Exception("Empty list")


class Head(BaseFunction):
    def __init__(self):
        super().__init__("listhead")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return p[0]
        raise Exception("Empty list")

class Tail(BaseFunction):
    def __init__(self):
        super().__init__("listtail")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return p[1:]
        raise Exception("Empty list")

class Length(BaseFunction):
    def __init__(self):
        super().__init__("listlength")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return len(p)
        raise Exception("Empty list")


class Map(BaseFunction):
    def __init__(self):
        super().__init__("mapfunc")

    def call(self, context, param_values):
        f = param_values[0]
        array = param_values[1]
        return [f.call(context, [e]) for e in array]


class PrintLn(BaseFunction):
    def __init__(self):
        super().__init__("printline")

    def call(self, context, param_values):
        print(*param_values)
        return 1


class Function(BaseFunction):
    def __init__(self, name, parent, params, body):
        super().__init__(name)
        self._parent = parent
        self._params = params
        self._body = body

    def call(self, context, param_values):
        func_vars = dict(zip(self._params, param_values))
        self._parent.push_context(func_vars)
        result = context.visit(self._body)
        self._parent.pop_context()
        return result


class Visitor(HaleVisitor):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._context_stack = [{}]
        self._functions = {}
        self._add_function(PrintLn())
        self._add_function(Split())
        self._add_function(Head())
        self._add_function(Map())
        self._add_function(Tail())
        self._add_function(Length())

    def _add_function(self, function):
        self._functions[function.name] = function

    def push_context(self, data):
        self._context_stack.append(data)

    def pop_context(self):
        d = self._context_stack.pop()

    def get_vars(self):
        return self._context_stack[-1] if self._context_stack else {}

    def get_var(self, name):
        if len(self._context_stack) > 0:
            value = self._context_stack[-1].get(name)
            if value is not None:
                return value
        if name in self._functions:
            return self._functions[name]
        raise KeyError(name)

    def set_var(self, name, value):
        if name in self._context_stack[-1]:
            raise Exception("Variable already defined")
        self._context_stack[-1][name] = value

    def visitFuncdef(self, context):
        ids = [i.getText() for i in context.ID()]
        func_name, params = ids[0], ids[1:]
        body = context.simplestmt()
        self._add_function(Function(func_name, self, params, body))
        return 1

    def visitSimplestmt(self, context):
        expr = context.expr()

        if expr:
            return self.visit(expr)

        assign = context.assign()

        if assign:
            return self.visit(assign)

        statements = context.simplestmt()
        result = 0
        for stmt in statements:
            result = self.visit(stmt)
        return result

    def visitAssign(self, context):
        var_names = context.ID()
        var_values = self.visit(context.expr())
        if not isinstance(var_values, tuple):
            var_values = (var_values,)

        if len(var_names) != len(var_values):
            raise Exception("Unable to match all variables")

        for k, v in zip(var_names, var_values):
            self.set_var(k.getText(), v)

        return 1

    def visitComp(self, context):
        booleans = context.boolean()
        right = self.visit(booleans[0])

        for i, left in enumerate(booleans[1:]):
            left = self.visit(left)
            if context.LT(i):
                return 1 if right < left else 0
            elif context.LTE(i):
                return 1 if right <= left else 0
            elif context.GT(i):
                return 1 if right > left else 0
            elif context.GTE(i):
                return 1 if right >= left else 0
            else:
                return 1 if right == left else 0
        return right

    def visitBoolean(self, context):
        subsums = context.sumsub()

        right = self.visit(subsums[0])

        if context.NOT():
            return ~right
        elif context.LNOT():
            if isinstance(right, int):
                return 0 if right > 0 else 1
            else:
                return 0 if right else 1
        else:
            for i, left in enumerate(subsums[1:]):
                left = self.visit(left)
                if context.OR(i):
                    right |= left
                elif context.AND(i):
                    right &= left
                elif context.XOR(i):
                    right ^= left

        return right

    def visitSumsub(self, context):
        multdiv = context.multdiv()
        right = self.visit(multdiv[0])

        for i, left in enumerate(multdiv[1:]):
            left = self.visit(left)
            if context.PLUS(i):
                right += left
            elif context.MINUS(i):
                right -= left

        return right

    def visitConditional(self, context):
        condition = self.visit(context.condition)

        if condition:
            return self.visit(context.ifcase)
        return self.visit(context.elsecase)

    def visitMultdiv(self, context):
        exp = context.exp()
        right = self.visit(exp[0])

        for i, left in enumerate(exp[1:]):
            left = self.visit(left)
            if context.MULT(i):
                right *= left
            elif context.DIV(i):
                right /= left
        return right

    def visitExp(self, context):
        right = self.visit(context.right)

        if context.POW():
            right **= self.visit(context.left)

        return right

    def visitAtom(self, context):
        if context.val:
            return self.visit(context.val)
        elif context.ival:
            return self.visit(context.ival)
        elif context.lval:
            return self.visit(context.lval)
        elif context.ID():
            func_name = context.ID().getText()
            params = self.visit(context.params())
            return self.get_var(func_name).call(self, params)

    def visitParams(self, context):
        if context.DOLLAR():
            return self.visit(context.listexpr)
        return [self.visit(e) for e in context.expr()]

    def visitLst(self, context):
        return [self.visit(e) for e in context.expr()]

    def visitValue(self, context):
        if context.INT():
            return int(context.INT().getText())
        elif context.STRING():
            return context.STRING().getText()[1:-1]
        elif context.BOOL():
            if context.BOOL().getText() == "True":
                return bool(1)
            elif context.BOOL().getText() == "False":
                return bool(0)
        elif context.ID:
            return self.get_var(context.ID().getText())


def get_tree(input_stream):
    lexer = HaleLexer(input_stream)
    tokens = CommonTokenStream(lexer)
    parser = HaleParser(tokens)
    return parser.statements()


class FileStream(InputStream):
    __slots__ = 'fileName'

    def __init__(self, fileName:str, encoding:str='utf8', errors:str='strict'):
        super().__init__(self.readDataFrom(fileName, encoding, errors))
        self.fileName = fileName

    def readDataFrom(self, fileName:str, encoding:str, errors:str='strict'):
        # read binary to avoid line ending conversion
        with open(fileName, 'rb') as file:
            bytes = file.read()
            return codecs.decode(bytes, encoding, errors)


def parse_file(filename):
    input_stream = FileStream(filename)
    tree = get_tree(input_stream)
    visitor = Visitor()
    return visitor.visit(tree)


def interactive():
    visitor = Visitor()

    string_buffer = ""
    while True:
        try:
            if len(string_buffer) == 0:
                print("> ", end="")
            else:
                print("+ ", end="")
            string_buffer += input().strip()
            if string_buffer[-1] == ";":
                input_stream = InputStream(string_buffer)
                string_buffer = ""
                visitor.visit(get_tree(input_stream))
        except KeyError as e:
            print(f"Undefined variable {e}")
        except EOFError:
            break


if __name__ == "__main__":

    if len(sys.argv) > 1:
        test = parse_file(sys.argv[1])
    else:
        interactive()
