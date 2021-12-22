# Generated from Hale.g4 by ANTLR 4.9.1
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .HaleParser import HaleParser
else:
    from HaleParser import HaleParser

# This class defines a complete listener for a parse tree produced by HaleParser.
class HaleListener(ParseTreeListener):

    # Enter a parse tree produced by HaleParser#statements.
    def enterStatements(self, ctx:HaleParser.StatementsContext):
        pass

    # Exit a parse tree produced by HaleParser#statements.
    def exitStatements(self, ctx:HaleParser.StatementsContext):
        pass


    # Enter a parse tree produced by HaleParser#statement.
    def enterStatement(self, ctx:HaleParser.StatementContext):
        pass

    # Exit a parse tree produced by HaleParser#statement.
    def exitStatement(self, ctx:HaleParser.StatementContext):
        pass


    # Enter a parse tree produced by HaleParser#simplestmt.
    def enterSimplestmt(self, ctx:HaleParser.SimplestmtContext):
        pass

    # Exit a parse tree produced by HaleParser#simplestmt.
    def exitSimplestmt(self, ctx:HaleParser.SimplestmtContext):
        pass


    # Enter a parse tree produced by HaleParser#funcdef.
    def enterFuncdef(self, ctx:HaleParser.FuncdefContext):
        pass

    # Exit a parse tree produced by HaleParser#funcdef.
    def exitFuncdef(self, ctx:HaleParser.FuncdefContext):
        pass


    # Enter a parse tree produced by HaleParser#assign.
    def enterAssign(self, ctx:HaleParser.AssignContext):
        pass

    # Exit a parse tree produced by HaleParser#assign.
    def exitAssign(self, ctx:HaleParser.AssignContext):
        pass


    # Enter a parse tree produced by HaleParser#expr.
    def enterExpr(self, ctx:HaleParser.ExprContext):
        pass

    # Exit a parse tree produced by HaleParser#expr.
    def exitExpr(self, ctx:HaleParser.ExprContext):
        pass


    # Enter a parse tree produced by HaleParser#conditional.
    def enterConditional(self, ctx:HaleParser.ConditionalContext):
        pass

    # Exit a parse tree produced by HaleParser#conditional.
    def exitConditional(self, ctx:HaleParser.ConditionalContext):
        pass


    # Enter a parse tree produced by HaleParser#comp.
    def enterComp(self, ctx:HaleParser.CompContext):
        pass

    # Exit a parse tree produced by HaleParser#comp.
    def exitComp(self, ctx:HaleParser.CompContext):
        pass


    # Enter a parse tree produced by HaleParser#boolean.
    def enterBoolean(self, ctx:HaleParser.BooleanContext):
        pass

    # Exit a parse tree produced by HaleParser#boolean.
    def exitBoolean(self, ctx:HaleParser.BooleanContext):
        pass


    # Enter a parse tree produced by HaleParser#sumsub.
    def enterSumsub(self, ctx:HaleParser.SumsubContext):
        pass

    # Exit a parse tree produced by HaleParser#sumsub.
    def exitSumsub(self, ctx:HaleParser.SumsubContext):
        pass


    # Enter a parse tree produced by HaleParser#multdiv.
    def enterMultdiv(self, ctx:HaleParser.MultdivContext):
        pass

    # Exit a parse tree produced by HaleParser#multdiv.
    def exitMultdiv(self, ctx:HaleParser.MultdivContext):
        pass


    # Enter a parse tree produced by HaleParser#exp.
    def enterExp(self, ctx:HaleParser.ExpContext):
        pass

    # Exit a parse tree produced by HaleParser#exp.
    def exitExp(self, ctx:HaleParser.ExpContext):
        pass


    # Enter a parse tree produced by HaleParser#atom.
    def enterAtom(self, ctx:HaleParser.AtomContext):
        pass

    # Exit a parse tree produced by HaleParser#atom.
    def exitAtom(self, ctx:HaleParser.AtomContext):
        pass


    # Enter a parse tree produced by HaleParser#params.
    def enterParams(self, ctx:HaleParser.ParamsContext):
        pass

    # Exit a parse tree produced by HaleParser#params.
    def exitParams(self, ctx:HaleParser.ParamsContext):
        pass


    # Enter a parse tree produced by HaleParser#lst.
    def enterLst(self, ctx:HaleParser.LstContext):
        pass

    # Exit a parse tree produced by HaleParser#lst.
    def exitLst(self, ctx:HaleParser.LstContext):
        pass


    # Enter a parse tree produced by HaleParser#value.
    def enterValue(self, ctx:HaleParser.ValueContext):
        pass

    # Exit a parse tree produced by HaleParser#value.
    def exitValue(self, ctx:HaleParser.ValueContext):
        pass



del HaleParser