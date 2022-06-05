NOTE: Now running live at http://178.79.146.181:3000/

# Web Based Hale Interpreter
This is the subject of my Dissertation. It is a web based interpreter for my own functional programming language 'Hale'.

## Disclosure

The code in this git repository is the copyright of Joe Moore and distribution or use is not allowed without explicit permission and without giving full credit. Please see the LICENSE (https://github.com/joverandout/Web-Based-Hale-Interpreter/blob/main/LICENSE) for a full and clear indication of what is allowed.

Hale also uses code form the react-chess repository (https://github.com/TalhaAwan/react-chess) by Talha Awan (https://github.com/TalhaAwan) for the chess game. This is done in accordance to the LICENSE (https://github.com/TalhaAwan/react-chess/blob/master/LICENSE) which required acknowledgment of use and inclusion of the license in the folder where code is used. Both conditions have been met.

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

If there are any packet issues, all the packages can be installed using `yarn install` which installs all the dependencies in `package.json`. To manually install packages, enable the virtual environment by navigating into the `\api` folder and running `. venv/bin/activate`. Then use `pip` or `pip3` to install all the packets. 

If you have any issues running it on your own machine, Hale is running live at: http://178.79.146.181:3000/

