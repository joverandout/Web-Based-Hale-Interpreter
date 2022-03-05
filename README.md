# Web Based Hale Interpreter
This is the subject of my Dissertation. It is a web based interpreter for my own functional programming language 'Hale'. Work is still in progress and while the interpreter works fully the website currently is under work. It currently has some functionality. Any Hale code written in the left hand box will run and the output will be printed to the right along with various other gubbins. The return value with be printed first and then any print lines that were called.

## Disclosure

The code in this git repository is the copyright of Joe Moore and distribution or use is not allowed without explicit permission and without giving full credit. Please see the LICENSE for a full and clear indication of what is allowed.

Hale also uses code form the react-chess repository (https://github.com/TalhaAwan/react-chess) by Talha Awan (https://github.com/TalhaAwan) for the chess game. This is done in accordance to the LICENSE (https://github.com/TalhaAwan/react-chess/blob/master/LICENSE) due to the acknowledgment of use and inclusion of the license in the folder where code is used.

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
`yarn` is required to run the project, install `yarn` on Unix systems using
```
$ npm install --global yarn
```
For windows guide please consult `yarn` documentaion. To start the backend server in a terminal window run
```
$ yarn start-api
```
This should start the backend `flask` server as follows:
```
yarn run v1.22.17
$ cd api && venv/bin/flask run --no-debugger
 * Serving Flask app 'api.py' (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
```
Now in a seperate terminal window then start up the front end with
```
$ yarn start
```
You should expect to see the following:
```
yarn run v1.22.17
$ react-scripts start

starting development server

Compiled with warnings.
```
This should open the website in your browser. If not you can navigate to the URL manually. 

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
