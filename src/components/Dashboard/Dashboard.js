import React, { useRef, useState, useEffect } from 'react';
import { Chessboard } from "react-chessboard";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Editor from "@monaco-editor/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion'

import './Dashboard.css';
import useToken from '../../useToken';
import useUserNameCurr from '../../useUserNameCurr.js';

import Game from './chess/components/game.js'

function Dashboard() {

  const { UserNameCurr, setUserNameCurr } = useUserNameCurr();
  const { token, setToken } = useToken();

  const [result, setResult] = useState(["Console - use this to test your code with 'RUN' before using 'SAVE' to see it's effects in game"]);

  const [theme, setTheme] = useState("vs-dark");
  const editorRef = useRef(null);


  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `../info`; 
    navigate(path);
  }

  const profile = () =>{ 
    let path = `../profile`; 
    navigate(path);
  }

  function signOut() { 
    setToken('')
    setUserNameCurr('')
    let path = `../`; 
    navigate(path);
    window.location.reload();
  }

  function toggleThemedark() {
    setTheme("vs-dark");
  }
  function toggleThemelight() {
    setTheme("light");
  }

  function buttonpress(){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editorRef.current.getValue() })
    }
  
    fetch('/write', requestOptions)
    .then(res => res.json()).then(data => {
      if(data.errorbool == false){
        setResult(Object.keys(data.prints).map((key) => data.prints[key]));
      }
      else{
        setResult(Object.keys(data.errors).map((key) => data.errors[key]))
      }
    });
  };

  function savebuttonpress(){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editorRef.current.getValue(), username: UserNameCurr })
    }
  
    fetch('/save', requestOptions)
    .then(res => res.json()).then(data => {
      if(data.errorbool == false){
      }
      else{
      }
    });
  };


  return (
    <div className="Dashboard">

      <header className="App-header">
        <nav class="navbar navbar-dark bg-dark pt-3 pb-3">
        <form class="form-inline">
          <h1>Hale - A web based interpreter</h1>
          <button onClick={toggleThemelight} class="btn btn-lg btn-light" type="button">Light Mode</button>
          <button onClick={toggleThemedark} class="btn btn-lg btn-secondary" type="button">Dark Mode</button>
          <button onClick={routeChange} class="btn btn-lg btn-info" type="button">Info</button>
          <button onClick={buttonpress} class="btn btn-lg btn-success float-right" type="button">Run</button>
          <button onClick={savebuttonpress} class="btn btn-lg btn-warning float-right" type="button">Save</button>
        </form>
        <form class="form-inline float-right">
          <h1>‎</h1>
          <button onClick={profile} class="btn btn-lg btn-primary" type="button">Profie</button>
          <button onClick={signOut} class="btn btn-lg btn-danger" type="button">Sign Out</button>
        </form>
      </nav>

    <div class="mycontainer">
        <div class="mynewleft">
          <div class="mymonacocontainer">
          <Editor
            height="100%"
            options={{
              minimap: {
                enabled: false,
              },
            }}
            defaultValue="#Write a Hale Program Here"
            onMount={handleEditorDidMount}
            theme={theme}
          />
          </div>
        </div>
        <div class="mynewright">

        <div class="myfakeMenu">
          <div class="fakeButtons fakeClose"></div>
          <div class="fakeButtons fakeMinimize"></div>
          <div class="fakeButtons fakeZoom"></div>
        </div>
        <div class="myfakeScreen">
          <div>
            {result.map(value => <p class="line4 terminalp">{value.toString()}</p>)}
          </div>
        </div>


        <br></br>


        <div class="accordianny">
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header><div class ="accordhead">Task 1 - pawns</div></Accordion.Header>
            <Accordion.Body>
              <ol type="a">
                <li>Define a function 'spaceForward' which takes as an input, a list containing the x and y coordinate of a piece, returns a list representing the coordinates of the space directly in front of it (that's an increase in the y).
                  Hint: Make use of the 'listhead' and 'listend' functions built into Hale.
                </li>
                <br></br><li>Define a function 'equalPos' which takes 4 inputs, an x and y coordinate of a piece, and an x and y coordinate of a space and returns a boolean if the piece is on that space.</li>
                <br></br><li>Define a function 'pieceAt' which takes an x and y coordinate as well as a list of x,y coordinates (this opposing pieces) and returns a boolean. True if an opposing piece 
                is on the square else false</li>
                <br></br><li>Define a function 'pawnMoveForward' which takes an x and y coordinate of the pawn and returns a list of available spaces the pawn can move. You will need to make use of your
                'pieceAt' function, since a pawn can only move forward if a piece isn't in that space.</li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header><div class ="accordhead">Task 2</div></Accordion.Header>
            <Accordion.Body>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>

        <br></br>  
        
        <div class="chess">
          <Game />
        </div>


      </div>
      
    </div>
      </header>
    </div>
  );
}
export default Dashboard;