import time
from flask import Flask
from inputStream import InputStream
from CommonTokenStream import CommonTokenStream
import haleMain

app = Flask(__name__)

@app.route('/')
def get_current_time():
    test = haleMain.parse_file("test1.hale")
    print(test)
    print("RESULT")

