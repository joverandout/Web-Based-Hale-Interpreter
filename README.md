# Web Based Hale Interpreter
This is the subject of my Dissertation. It is a web based interpreter for my own functional programming language 'Hale'. Work is still in progress and while the interpreter works fully the website currently just prints the result of the `return` function in `api/test1.hale`

## Hale

You can test the interpreter manually by navigating to the `/api` folder and running following commands. Hale's grammar is included at the end of this `readMe`

```
$ python3 haleMain.py 
```
This will open the interactive interpreter similar to GHCI or `stack repl` for haskell, or similar to running just `python3` and starting the python interpreter.
Otherwise you can run
```
$ python3 haleMain.py [testfilename]
```
for example:
```
$ python3 haleMain.py test1.hale
```
Unlike before this instead will execute an entire `.hale` file. The 4 test files show off some of what Hale can do.

For example `test1.hale` is a Fibonacci calculator but shows how Hale allows function composition and can pass functions as arguments. This is seen when in line 3 when the function `printFibs` takes `fib` another function as a parameter.
```
def fib ::= λ x : int . x <= 1 ? x : fib (x-1) + fib (x-2);
def printFibs ::= λ f x : int . x > 1 ? printFibs(f, (x-1)) & printline(f(x)) : printline(f(x));
printFibs(fib, 20);
```
This will print the first 20 fib numbers
```
1
1
2
3
5
8
13
21
34
55
89
144
233
377
610
987
1597
2584
4181
6765
```
Whilst `test3.hale` is a function that prints a list element by element to the console.
```
def printlistinlines ::= λ list : do . list == [] ? printline("") : printline(listhead(list)) & printlistinlines(listtail(list));
printlistinlines([1,2,3,4,99,5]);
```
This will recursively print the list head and call the function again on the list tail. If the list is empty an empty line is printed. The out put is as follows:
```
1
2
3
4
99
5
```
The grammar for Hale can also be found in `Hale.g4`

## Running

To start the flask server navigate into the `/api` folder and activate the virtual environment:
```
$ . venv/bin/activate
```
Due to the altered `.flaskenv` file there is no need to use `EXPORT` the folder will automatically assign the `api.py`. Then run the server:
```
$ flask run
```
This should see the following result
```
 * Serving Flask app 'api.py' (lazy loading) * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 101-941-003
```
Navigate to the local host url to see the website

## Disclosure

The code in this git repository is the copyright of Joe Moore and distribution or use is not allowed without explicit permission and without giving full credit

## Hale Grammar

```
statements:
    (statement SEMICOLON )+;

statement:
    simplestmt
    | funcdef
    ;

simplestmt:
    expr
    | assign
    | LCBR simplestmt (SEMICOLON simplestmt)* RCBR
    ;

funcdef:
    DEF ID DEFEQ LAMBDA (ID (ID)*)? COLON TYPE FULLSTOP simplestmt;

assign:
    ID (COMMA ID)* EQ expr;

expr:
    comp 
    | conditional;

conditional:
    condition=comp QUESTION ifcase=simplestmt COLON elsecase=simplestmt;

comp:
    right=boolean (op=(LT|LTE|GT|GTE|CEQ) left=boolean)*;

boolean:
    right=sumsub (op=(OR|AND|XOR) sumsub)*
    | NOT sumsub
    | LNOT sumsub;

sumsub:
    right=multdiv (op=(PLUS|MINUS) left=multdiv)*;

multdiv:
    right=exp (op=(MULT|DIV) left=exp)*;

exp:
    right=atom (POW left=atom)?;

atom:
    val=value
    | LPAR ival=simplestmt RPAR
    | ID LPAR (params)? RPAR
    | lval=lst;

params:
    expr (COMMA expr)*
    | DOLLAR listexpr=expr
    ;

lst:
    LBR  (expr ( COMMA expr)*)?  RBR;

value:
    INT
    | STRING
    | BOOL
    | ID
    ;

BOOL:       'True' | 'False';
DEF:        'def';
TYPE:       'int' | 'bool' | 'string' | 'do';
DEFEQ:      '::=';
FULLSTOP:   '.';
LAMBDA:     'λ';
INT:        [0-9]+;
PLUS:       '+';
MINUS:      '-';
MULT:       '*';
DIV:        '/';
LPAR:       '(';
RPAR:       ')';
POW:        '**';
LT:         '<';
LTE:        '<=';
GT:         '>';
GTE:        '>=';
CEQ:        '==';
COMMA:      ',';
ID:         [a-zA-Z][a-zA-Z0-9]*;
DQUOTE:     '"';
QUESTION:   '?';
COLON:      ':';
EQ:         '=';
SEMICOLON:  ';';
OR:         '|';
AND:        '&';
XOR:        '^';
NOT:        '~';
LNOT:       '!';
LBR:        '[';
RBR:        ']';
LCBR:       '{';
RCBR:       '}';
DOLLAR:     '$';
STRING:     DQUOTE ~["\r\n]* DQUOTE;
COMMENT:    '#' ~[\n]* -> skip;
WS:         [ \r\n\t]+ -> skip;
```
