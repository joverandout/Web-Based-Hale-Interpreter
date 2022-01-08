import time
from flask import Flask
from flask import request
from inputStream import InputStream
from CommonTokenStream import CommonTokenStream
import haleMain

app = Flask(__name__)

@app.route('/write', methods = ['POST'])
def write_file():
    code = request.get_json()
    print(code['title'])
    with open("testx.hale", "w") as fo:
        fo.write(code['title'])
    return {'time': "hello"}

@app.route('/time')
def get_current_time():
    test = haleMain.runInterpreter("testx.hale")
    print(str(test))
    return {'time': str(test)}