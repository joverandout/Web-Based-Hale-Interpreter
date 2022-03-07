import time
from xml.dom import UserDataHandler
from flask import Flask
from flask import request
from flask import jsonify
from inputStream import InputStream
from CommonTokenStream import CommonTokenStream
import haleMain

# import flask
# import flask_sqlalchemy
# # import flask_praetorian
# # import flask_cors

import hashlib
import sqlite3
from sqlite3 import Error

app = Flask(__name__)

@app.route('/task1', methods=['POST'])
def get_minus_eight():
    json = request.get_json()
    profile = json['username']
    src = json['src']
    file_to_run = ""
    try:
        with sqlite3.connect("APIData.db") as con:
            cur = con.cursor()
            query = "SELECT spaceForward, equalPos, pawnMoveForward FROM TASK1 WHERE username = '" + profile + "'"
            cur.execute(query)
            data = cur.fetchall()
            file_to_run += data[0][0]
            file_to_run += "\n"
            file_to_run += data[0][1]
            file_to_run += "\n"
            file_to_run += data[0][2]
            file_to_run += "\n"          
            file_to_run += "return(pawnMoveForward(" + str(src) + ", True));"
            test, prints, errors = haleMain.runInterpreter(file_to_run)
            return {'srcminuseight':test}
    except:
        return("cannot fetch data", 430)

@app.route('/task2', methods=['POST'])
def get_list_for_fallen():
    json = request.get_json()
    profile = json['username']
    file_to_run = ""
    try:
        with sqlite3.connect("APIData.db") as con:
            cur = con.cursor()
            query = "SELECT addFallen FROM TASK2 WHERE username = '" + profile + "'"
            cur.execute(query)
            data = cur.fetchall()
            file_to_run += data[0][0]
            file_to_run += "\n"
            file_to_run += "return(addFallen([1,2,3,5,6,7], 9));"
            test, prints, errors = haleMain.runInterpreter(file_to_run)
            return {'finallist':test}
    except:
        return("cannot fetch data", 430)

@app.route('/profile', methods=['POST'])
def get_profile():
    json = request.get_json()
    profile = json['username']
    with sqlite3.connect("APIData.db") as con:
        cur = con.cursor()
        query = "SELECT spaceForward, equalPos, pawnMoveForward FROM TASK1 WHERE username = '" + profile + "'"
        cur.execute(query)
        data = cur.fetchall()
        print("here")
        print(data)
        return {'spaceForward':data[0][0], 'equalPos':data[0][1], 'pawnMoveForward':data[0][2]}

@app.route('/getname', methods=['POST'])
def get_name():
    json = request.get_json()
    profile = json['username']
    with sqlite3.connect("APIData.db") as con:
        cur = con.cursor()
        query = "SELECT fName, sName FROM USERS WHERE username = '" + profile + "'"
        cur.execute(query)
        data = cur.fetchall()
        print(data)
        name = data[0][0] + ' ' + data[0][1]
        print(name)
        return jsonify(name)

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
    task1 = ["spaceForward", "equalPos", "pieceAt", "pawnMoveForward"]
    task2 = ["addFallen"]
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
        for code in array_of_code:
            if(code):
                found = False
                for function in task2:
                    if (not found) and code.startswith('def ' + function):
                        found = True
                        with sqlite3.connect("APIData.db") as con:
                            cur = con.cursor()
                            query = "UPDATE TASK2 SET "+ function + " = '" + code + "' WHERE Username = '"+ username +"';"
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

        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        print(hashed_password)
        # print(hashed_password)
        succesful_login = False

        #logic to determine if the user is in the database,
        try:
            with sqlite3.connect("APIData.db") as con:
                cur = con.cursor()
                query = "SELECT Username, Password FROM USERS WHERE username = '" + username + "'"
                cur.execute(query)
                data = cur.fetchall()
                if data[0][1] == hashed_password:
                    succesful_login = True
                    #DO THIS RETURN HOST ID 
                    returnDict = dict()
                    returnDict["token"] = 'token1234'
                    returnDict["username"] = username
                    return jsonify(returnDict)
        except:
            return ("Email address does not exist", 401)
        
        if(not succesful_login):
            return ("Incorrect password",400)
    except:
        #Likely error is that the request did not have the fields we wanted from it
        return ("Cannot retrieve data, please check credentials", 400)


@app.route('/hostSignUp', methods=["POST"])
def hostsignup():
    info = request.get_json()
    if info == None:
        return ("No login information was provided",441)

    #Dont actually know what to do if parsing fails. info will be an error
    # try:
    username = info["email"]
    password = info["password"]
    fname = info["firstname"]
    sname = info["surname"]

    hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
    print(hashed_password)
    # print(hashed_password)

    if check_password(password) == False:
        return ("Password must be between 6-20 characters. It must contain at least one upper and lower case character as well as a digit", 450)

    
    if(len(fname) < 1 or len(sname) < 1):
        return ("Missing first name",442)

    try:#logic to determine if the user is in the database,
        with sqlite3.connect("APIData.db") as con:
            cur = con.cursor()
            query = "SELECT Username, Password FROM USERS WHERE username = '" + username + "'"
            cur.execute(query)
            data = cur.fetchall()
            if len(data) > 0:
                return ("Account under that email already exists", 443)
            query = "INSERT INTO USERS VALUES ('" + username + "', '" + hashed_password + "', '" + fname + "', '" + sname +"');"
            print(query)
            cur.execute(query)
            query = "INSERT INTO TASK1 (Username) VALUES ('" + username +"');"
            cur.execute(query)
            query = "INSERT INTO TASK2 (Username) VALUES ('" + username +"');"
            cur.execute(query)
            returnDict = dict()
            returnDict["token"] = 'token1234'
            returnDict["username"] = username
            return jsonify(returnDict)       
    except:
        return ("Cannot retrieve data, please check credentials", 400)
    

def check_password(password):
    if len(password) >= 6 and len(password) <= 20 and any(char.isdigit() for char in password) \
        and any(char.isupper() for char in password) and any(char.islower() for char in password):
        return True
    else:
        return False

@app.route('/usercreate', methods=["POST"])
def usercreate():
    info = request.get_json()
    if info == None:
        return "No login information was provided"