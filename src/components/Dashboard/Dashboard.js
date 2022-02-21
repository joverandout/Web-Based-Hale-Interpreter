import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');
  const [result, setResult] = useState([]);

  const [theme, setTheme] = useState("light");
  const editorRef = useRef(null);

  var arr = [];

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
      setResult(Object.keys(data.prints).map((key) => data.prints[key]));
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
            {result.map(value => <p>{value}</p>)}
          </div>
        </div>
      </div>
    </div>
      </header>
    </div>
  );
}
export default Dashboard;