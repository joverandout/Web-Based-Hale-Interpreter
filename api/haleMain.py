from distutils.log import error
import sys
import codecs
from hale.HaleVisitor import HaleVisitor
from hale.HaleLexer import HaleLexer
from hale.HaleParser import HaleParser
from antlr4.BufferedTokenStream import BufferedTokenStream
from antlr4.Lexer import Lexer
from antlr4.Token import Token
from antlr4.error.ErrorListener import ErrorListener

printValues = []
returnValue = []
errors = []

class MyErrorListener(ErrorListener):
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        temperror = ("SYNTAX ERROR: when parsing line %d column %d: %s\n" % \
                        (line, column, msg))
        errors.append(temperror)
                        

class InputStream (object):
    __slots__ = ('name', 'strdata', '_index', 'data', '_size')

    def __init__(self, data: str):
        self.name = "<empty>"
        self.strdata = data
        self._loadString()

    def _loadString(self):
        self._index = 0
        self.data = [ord(c) for c in self.strdata]
        self._size = len(self.data)

    @property
    def index(self):
        return self._index

    @property
    def size(self):
        return self._size

    def reset(self):
        self._index = 0

    def consume(self):
        if self._index >= self._size:
            assert self.LA(1) == Token.EOF
            errors.append("LOGICAL ERROR: cannot consume EOF")
        self._index += 1

    def LA(self, offset: int):
        if offset==0:
            return 0 # undefined
        if offset<0:
            offset += 1 # e.g., translate LA(-1) to use offset=0
        pos = self._index + offset - 1
        if pos < 0 or pos >= self._size: # invalid
            return Token.EOF
        return self.data[pos]

    def LT(self, offset: int):
        return self.LA(offset)

    def mark(self):
        return -1

    def release(self, marker: int):
        pass


    def seek(self, _index: int):
        if _index<=self._index:
            self._index = _index 
            return
        self._index = min(_index, self._size)

    def getText(self, start :int, stop: int):
        if stop >= self._size:
            stop = self._size-1
        if start >= self._size:
            return ""
        else:
            return self.strdata[start:stop+1]

    def __str__(self):
        return self.strdata

class CommonTokenStream(BufferedTokenStream):
    __slots__ = 'channel'

    def __init__(self, lexer:Lexer, channel:int=Token.DEFAULT_CHANNEL):
        super().__init__(lexer)
        self.channel = channel

    def adjustSeekIndex(self, i:int):
        return self.nextTokenOnChannel(i, self.channel)

    def LB(self, k:int):
        if k==0 or (self.index-k)<0:
            return None
        i = self.index
        n = 1
        while n <= k:
            i = self.previousTokenOnChannel(i - 1, self.channel)
            n += 1
        if i < 0:
            return None
        return self.tokens[i]

    def LT(self, k:int):
        self.lazyInit()
        if k == 0:
            return None
        if k < 0:
            return self.LB(-k)
        i = self.index
        n = 1 
        while n < k:
            if self.sync(i + 1):
                i = self.nextTokenOnChannel(i + 1, self.channel)
            n += 1
        return self.tokens[i]

    def getNumberOfOnChannelTokens(self):
        n = 0
        self.fill()
        for i in range(0, len(self.tokens)):
            t = self.tokens[i]
            if t.channel==self.channel:
                n += 1
            if t.type==Token.EOF:
                break
        return n


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
        errors.append("LOGICAL ERROR: Cannot use 'listsplit' on an empty list")


class Head(BaseFunction):
    def __init__(self):
        super().__init__("listhead")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return p[0]
        errors.append("LOGICAL ERROR: Cannot use 'listhead' on an empty list")

class Tail(BaseFunction):
    def __init__(self):
        super().__init__("listtail")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return p[1:]
        errors.append("LOGICAL ERROR: Cannot use 'listtail' on an empty list")

class Init(BaseFunction):
    def __init__(self):
        super().__init__("listinit")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return p[:-1]
        errors.append("LOGICAL ERROR: Cannot use 'listinit' on an empty list")

class End(BaseFunction):
    def __init__(self):
        super().__init__("listend")

    def call(self, context, param_values):
        p = param_values[0]
        if p:
            return p[-1]
        errors.append("LOGICAL ERROR: Cannot use 'listend' on an empty list")

class Length(BaseFunction):
    def __init__(self):
        super().__init__("listlength")

    def call(self, context, param_values):
        p = param_values[0]
        print(p)
        if p:
            return len(p)
        if p == []:
            return 0
        errors.append("LOGICAL ERROR: Cannot use 'listlength' on an non list")


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
        global printValues
        printValues.append(*param_values)
        return 1

class Return(BaseFunction):
    def __init__(self):
        super().__init__("return")

    def call(self, context, param_values):
        global returnValue
        returnValue = param_values
        return param_values

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
        self._add_function(Init())
        self._add_function(End())
        self._add_function(Length())
        self._add_function(Return())

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
        errors.append("LOGICAL ERROR: Variable '"+  name +"' is called but not defined")

    def set_var(self, name, value):
        if name in self._context_stack[-1]:
            errors.append("LOGICAL ERROR: Variable '"+  name +"' is defined twice")
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
            errors.append("LOGICAL ERROR: unable to match all variables")


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
                try:
                    right += left
                except TypeError:
                    value = right
                    if(type(left) is not int):
                        value = left
                    errors.append("Logical Error: Addition can only be applied to type int and string. You have applied it to '" + value + "' which is type " + str(type(value)))
            elif context.MINUS(i):
                try:
                    right -= left
                except TypeError:
                    value = right
                    if(type(left) is not int):
                        value = left
                    errors.append("Logical Error: Subtraction can only be applied to type int and string. You have applied it to '" + value + "' which is type " + str(type(value)))

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
                try:
                    right *= left
                except TypeError:
                    value = right
                    if(type(left) is not int):
                        value = left
                    errors.append("Logical Error: Multiplication can only be applied to type int. You have applied it to '" + value + "' which is type " + str(type(value)))
            elif context.DIV(i):
                try:
                    right /= left
                except TypeError:
                    value = right
                    if(type(left) is not int):
                        value = left
                    errors.append("Logical Error: Division can only be applied to type int. You have applied it to '" + value + "' which is type " + str(type(value)))
        return right

    def visitExp(self, context):
        right = self.visit(context.right)

        if context.POW():
            right **= self.visit(context.left)

        return right

    def visitAtom(self, context):
        try:
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
        except RecursionError:
            errors.append("Recursion Error: maximum recursion depth exceeded")


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
    error_listener = MyErrorListener()
    lexer = HaleLexer(input_stream)
    lexer.removeErrorListeners()
    lexer.addErrorListener(error_listener)
    tokens = CommonTokenStream(lexer)
    parser = HaleParser(tokens)
    parser.removeErrorListeners()
    parser.addErrorListener(error_listener)
    return parser.statements()



class FileStream(InputStream):
    __slots__ = 'code'

    def __init__(self, code:str):
        super().__init__(self.readDataFrom(code))
        self.code = code

    def readDataFrom(self, code:str):
        return code


def parse_file(code):
    input_stream = FileStream(code)
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
            errors.append("LOGICAL ERROR: Undefined variable '"+ e +"'")
        except EOFError:
            break

def runInterpreter(code):
    printValues.clear()
    errors.clear()
    try:
        parse_file(code)
    except:
        print("Errors")
    printVal = ""
    for value in printValues:
        printVal += str(value)
        printVal += "\r\n"
    if len(returnValue) > 0:
        return returnValue[0], printValues, errors
    else:
        return None, printValues, errors

if __name__ == "__main__":
    returnValue = 34
    if len(sys.argv) > 1:
        print(runInterpreter(sys.argv[1]))
    else:
        interactive()