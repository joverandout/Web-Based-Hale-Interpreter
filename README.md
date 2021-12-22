# Web Based Hale Interpreter
This is the subject of my Dissertation. It is a web based interpreter for my own functional programming language 'Hale'. Work is still in progress and while the interpeter works fully the website currently just prints the result of the `return` function in `api/test1.hale`

## Hale

Hale is statically typed and purely functional, its grammar can be found in `Hale.g4`. Run by either

```
$ python3 main.py 
```
OR
```
$ python3 main.py [testfilename]
```
The former will open a blank interpreter, whilst the latter will execute a `.hale` file. The 4 test files show off some of what Hale can do.

For example `test1.hale` is a fibbonaci calculator but shows how Hale allows function composition and can pass functions as arguments. This is seen when in line 3 when the funciton `printFibs` takes `fib` another function as a parameter.
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
## Running

To start the flask server navigate into the `/api` folder and activate the virtual environment:
```
$ . venv/bin/activate
```
Due to the altered `.flaskenv` file there is no need to use `EXPORT` the folder will automatically assing the `api.py`. Then run the server:
```
$ flask run
```
This should see the followig result
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
