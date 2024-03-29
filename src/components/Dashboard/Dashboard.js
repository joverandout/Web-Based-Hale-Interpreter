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
  

  console.log(UserNameCurr);


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
          <Accordion.Item eventKey="1">
            <Accordion.Header><div class ="accordhead">Task 1 - Pawns</div></Accordion.Header>
            <Accordion.Body>
              <ol type="a">
                <li>Define a function 'spaceForward' which takes as an input, an int representing the space number of a pawn, and returns an int representing the space of the space directly in front of it (that's a decrease of 8).
                </li>
                <br></br><li>Define a function 'equalPos' which takes 2 inputs, the positions of 2 pieces, and returns a boolean if the piece is on that space. This will be used to see if any enemy pieces are at
                  the space directly in front of the pawn.
                </li>
                <br></br><li>Define a function 'pawnMoveForward' which takes a position of the pawn and a bool (false meaning there is not space in front of it, true meaning there is). It returns a list of available spaces the pawn can move.
                  You do not need to consider the 2 space move or the diagonals. Make use of your 'spaceforward' function.</li>
                <br></br>
              </ol>
              Once you have completed and tested all these functions, hit save and see the effects in game. If you have code them correctly the white pawns should be able to move according to chess moves.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header><div class ="accordhead">Task 2 - Fallen Soldiers</div></Accordion.Header>
            <Accordion.Body>
              Brilliant you got pawns working, and learnt some basic Hale at the same time. Now it's time to move onto our next challenge... Fallen Soldiers. Currently our chess game does not record when pieces are taken by the
              opposing player. With the function below you are going to fix that. In this function you will need to work with lists. Remember to make use of the basic list operations, see info if you don't know what those are.
              <br></br>
              <br></br>
              <ol type="a">
                <li>Define a function 'addFallen' which takes as a list and a piece id (an int), It should return the list with the piece id appended to the end.
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header><div class ="accordhead">Task 3 - Queen's Path</div></Accordion.Header>
            <Accordion.Body>
              The Queen is one of the most important pieces in chess, and the most powerful. She can move in any direction and any distance. This makes this challenge quite tricky. It works similarly to the previous challenge, but is
              definitely a step up.
              <br></br>
              <br></br>
              <ol type="a">
                <li>Define a function 'getQueenPath' which a start and end space as well as increment and a current path (originally the empty list). Add all the spaces to that list. Until you get to the end destination. HINT: you
                  will want to make use of recursion here!
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>

        <br></br>  
        
        <div class="chess">
          <Game username={UserNameCurr}/>
        </div>


      </div>
 
    </div>
    <div class="footer2">
          © Joe Moore
        </div>
      </header>
    </div>
    
  );
}
export default Dashboard;