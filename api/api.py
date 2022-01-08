import time
from flask import Flask
from flask import request
from inputStream import InputStream
from CommonTokenStream import CommonTokenStream
import haleMain

app = Flask(__name__)

@app.route('/')
def get_current_time():
    test = haleMain.runInterpreter("test1.hale")
    #print(test)
    return  {'time': str(test)}

@app.route('/write', methods = ['POST'])
def write_file():
    code = request.get_json()
    print(code['title'])
    with open("test1.hale", "w") as fo:
        fo.write(code['title'])
    return {'time': "hello"}

@app.route('/time', methods=["POST"])
def get_current_time2():
    test = haleMain.runInterpreter("test1.hale")
    #print(test)
    return  {'time': str(test)}

