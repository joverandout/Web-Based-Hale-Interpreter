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
    code_to_write = code['title']
    code_to_write = code_to_write.replace(";", ";\n")
    test, prints, errors = haleMain.runInterpreter(code_to_write)
    errorbool = False
    if(len(errors)):
        errorbool = True
    return {'time': str(test), 'prints':prints, 'errorbool':errorbool, 'errors':errors}

@app.route('/save', methods = ['POST'])
def save_file():
    code = request.get_json()
    print(code['title'])
    username = code['username']
    code_to_write = code['title']
    code_to_write = code_to_write.replace(";", ";\n")
    array_of_code = code_to_write.split("\n")
    task1 = ["moveup", "moveleft", "moveright", "movedown"]
    try:
        for code in array_of_code:
            if(code):
                found = False
                for function in task1:
                    if (not found) and code.startswith('def ' + function):
                        found = True
                        with sqlite3.connect("APIData.db") as con:
                            cur = con.cursor()
                            query = "UPDATE TASK1 SET "+ function + " = '" + code + "' WHERE Username = '"+ username +"';"
                            cur.execute(query)
    except:
        return {'errorbool': True}
    return {'errorbool': False}

@app.route('/hostlogin', methods=["POST"])
def hostlogin():
    info = request.get_json()
    if info == None:
        return ("No login information was provided",400)

    #Dont actually know what to do if parsing fails. info will be an error
    try:
        username = info["email"]
        password = info["password"]

        # hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        # print(hashed_password)
        succesful_login = False

        #logic to determine if the user is in the database,
        with sqlite3.connect("APIData.db") as con:
            cur = con.cursor()
            query = "SELECT Username, Password FROM USERS WHERE username = '" + username + "'"
            cur.execute(query)
            data = cur.fetchall()
            if data[0][1] == password:
                succesful_login = True
                #DO THIS RETURN HOST ID 
                returnDict = dict()
                returnDict["token"] = 'token1234'
                returnDict["username"] = username
                return jsonify(returnDict)
        
        if(not succesful_login):
            return ("wrong password",400)
    except:
        #Likely error is that the request did not have the fields we wanted from it
        return ("Bad Request, probably missing the data we want", 400)
    

@app.route('/usercreate', methods=["POST"])
def usercreate():
    info = request.get_json()
    if info == None:
        return "No login information was provided"