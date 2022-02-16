import time
from flask import Flask
from flask import request
from flask import jsonify
from inputStream import InputStream
from CommonTokenStream import CommonTokenStream
import haleMain

import sqlite3
from sqlite3 import Error

app = Flask(__name__)

@app.route('/write', methods = ['POST'])
def write_file():
    code = request.get_json()
    print(code['title'])
    code_to_write = code['title']
    code_to_write = code_to_write.replace(";", ";\n")
    with open("testx.hale", "w") as fo:
        fo.write(code_to_write)
    return {'time': "hello"}

@app.route('/time')
def get_current_time():
    test, prints = haleMain.runInterpreter("testx.hale")
    print(str(test))
    print(str(prints))
    return {'time': str(test), 'prints':prints}

@app.route('/hostlogin', methods=["POST"])
def hostlogin():
    info = request.get_json()
    if info == None:
        return "No login information was provided"
    print("Info")
    print(info)
    returnDict = dict()
    returnDict["token"] = 'test123'
    return(jsonify(returnDict))

    #Dont actually know what to do if parsing fails. info will be an error
    # try:
    #     username = info["username"]
    #     password = info["password"]

    #     hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
    #     print(hashed_password)
    #     succesful_login = False

    #     #logic to determine if the user is in the database,
    #     with sqlite3.connect("database.db") as con:
    #         print(hashed_password)
    #         print("Here")
    #         cur = con.cursor()
    #         query = "SELECT HostID, Password FROM HOSTS WHERE username = '" + username + "'"
    #         cur.execute(query)
    #         data = cur.fetchall()
    #         for each in data:
    #             if each[1] == hashed_password:
    #                 succesful_login = True
    #                 logged_in_id = each[0]

    #                 #DO THIS RETURN HOST ID 
    #                 returnDict = dict()
    #                 returnDict["hostid"] = logged_in_id
    #                 return jsonify(returnDict)
        
    #     if(not succesful_login):
    #         return ("wrong password",400)
    # except:
    #     #Likely error is that the request did not have the fields we wanted from it
    #     return ("Bad Request, probably missing the data we want", 400)
    

@app.route('/usercreate', methods=["POST"])
def usercreate():
    info = request.get_json()
    if info == None:
        return "No login information was provided"