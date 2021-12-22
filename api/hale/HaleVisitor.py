# Generated from Hale.g4 by ANTLR 4.9.1
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .HaleParser import HaleParser
else:
    from HaleParser import HaleParser

# This class defines a complete generic visitor for a parse tree produced by HaleParser.

class HaleVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by HaleParser#statements.
    def visitStatements(self, ctx:HaleParser.StatementsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#statement.
    def visitStatement(self, ctx:HaleParser.StatementContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#simplestmt.
    def visitSimplestmt(self, ctx:HaleParser.SimplestmtContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#funcdef.
    def visitFuncdef(self, ctx:HaleParser.FuncdefContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#assign.
    def visitAssign(self, ctx:HaleParser.AssignContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#expr.
    def visitExpr(self, ctx:HaleParser.ExprContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#conditional.
    def visitConditional(self, ctx:HaleParser.ConditionalContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#comp.
    def visitComp(self, ctx:HaleParser.CompContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#boolean.
    def visitBoolean(self, ctx:HaleParser.BooleanContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#sumsub.
    def visitSumsub(self, ctx:HaleParser.SumsubContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#multdiv.
    def visitMultdiv(self, ctx:HaleParser.MultdivContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#exp.
    def visitExp(self, ctx:HaleParser.ExpContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#atom.
    def visitAtom(self, ctx:HaleParser.AtomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#params.
    def visitParams(self, ctx:HaleParser.ParamsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#lst.
    def visitLst(self, ctx:HaleParser.LstContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by HaleParser#value.
    def visitValue(self, ctx:HaleParser.ValueContext):
        return self.visitChildren(ctx)



del HaleParser