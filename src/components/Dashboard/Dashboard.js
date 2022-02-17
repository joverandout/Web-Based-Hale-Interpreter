import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');

  const myeditor = document.querySelector("Editor");


  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `../info`; 
    navigate(path);
  }


  function buttonpress(){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "return(22);" })
  }

  fetch('/write', requestOptions)
  .then(res => res.json()).then(data => {
    setFunctionOutput(data.time);
    setPrintOutput(data.prints);
  });
  };

  return (
    <div className="Dashboard">

      <header className="App-header">
        <nav class="navbar navbar-dark bg-dark pt-3 pb-3">
        <form class="form-inline">
          <h1>Hale - A web based interpreter</h1>
          <button class="btn btn-lg btn-light" type="button">Light Mode</button>
          <button class="btn btn-lg btn-secondary" type="button">Dark Mode</button>
          <button onClick={routeChange} class="btn btn-lg btn-info" type="button">Info</button>
          <button  onClick={buttonpress} class="btn btn-lg btn-success float-right" type="button">Run</button>
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
              height="90vh"
              theme="vs-dark"
              defaultValue="# write a Hale program in here"
            />
          </div>
        </div>
        <div class="mynewright">
        {/* <div class="mymids">
          <p>{FunctionOutput}.</p>
        </div>
        <div class="mymids">
        <p>{PrintOutputs}</p>
        </div> */}

        <div class="myfakeMenu">
          <div class="fakeButtons fakeClose"></div>
          <div class="fakeButtons fakeMinimize"></div>
          <div class="fakeButtons fakeZoom"></div>
        </div>
        <div class="myfakeScreen">
        <p>{PrintOutputs}</p>
        </div>
        </div>
    </div>
      </header>
    </div>
  );
}

export default Dashboard;