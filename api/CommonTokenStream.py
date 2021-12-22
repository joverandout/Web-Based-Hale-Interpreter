
from antlr4.BufferedTokenStream import BufferedTokenStream
from antlr4.Lexer import Lexer
from antlr4.Token import Token

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
        # find k good tokens looking backwards
        while n <= k:
            # skip off-channel tokens
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
        n = 1 # we know tokens[pos] is a good one
        # find k good tokens
        while n < k:
            # skip off-channel tokens, but make sure to not look past EOF
            if self.sync(i + 1):
                i = self.nextTokenOnChannel(i + 1, self.channel)
            n += 1
        return self.tokens[i]

    # Count EOF just once.#/
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

