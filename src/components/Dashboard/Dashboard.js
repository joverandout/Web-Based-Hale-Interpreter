import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion'
import SnakeGame from '../Snake/SnakeGame.js'
import './Dashboard.css';
import useUserNameCurr from '../../useUserNameCurr.js';

function Dashboard() {

  const { UserNameCurr, setUserNameCurr} = useUserNameCurr();

  const [result, setResult] = useState(["Console - use this to test your code with 'RUN' before using 'SAVE' to see it's effects in game"]);

  const [theme, setTheme] = useState("light");
  const editorRef = useRef(null);


  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `../info`; 
    navigate(path);
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
      //console.log(PrintOutputs);
      // console.log(typeof(PrintOutputs));
      // console.log(PrintOutputs.values());
      // var iterator = PrintOutputs.values();

      // for (let letter of iterator) {
      //   arr.push(letter);
      //   console.log(letter);
      // }
      // console.log(arr);

      // setResult(arr);
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
          <button class="btn btn-lg btn-primary" type="button">Profie</button>
          <button class="btn btn-lg btn-danger" type="button">Sign Out</button>
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
            {result.map(value => <p class="line4 terminalp">{value}</p>)}
          </div>
        </div>


        <br></br>


        <div class="accordianny">
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Task 1</Accordion.Header>
            <Accordion.Body>
              Define 4 functions called, 'moveup', 'movedown', 'moveleft', 'moveright', which each take 2 integers the x and y coordinates of the head of the snake and adjust
              it accordingly. Use 'printline' to test your code to make sure it works in the terminal before seeing if it has allowed the snake to move. 
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>

        <br></br>  
        
        <div>
          <SnakeGame />
        </div>


      </div>
      
    </div>
      </header>
    </div>
  );
}
export default Dashboard;