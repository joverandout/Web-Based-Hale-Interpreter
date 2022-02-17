import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import MonacoEditor from 'react-monaco-editor';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';



function Dashboard() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');

  const [theme, setTheme] = useState("light");

  const MyEditorControl = (props) => {
    const [ code, setCode ] = React.useState("Type your code...");

  const handleOnChange = (value) => {
     setCode(value);
  }

  const submitCode = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title:code })
    }

    fetch('/write', requestOptions)
    .then(res => res.json()).then(data => {
      setFunctionOutput(data.time);
      setPrintOutput(data.prints);
    });
  }

  return <>
    <button onClick={submitCode} class="btn btn-lg btn-success float-right" type="button">Run</button>
    <MonacoEditor onChange={handleOnChange} />
  </>;
 }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `../info`; 
    navigate(path);
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "vs-dark" : "light");
  }

  return (
    <div className="Dashboard">

      <header className="App-header">
        <nav class="navbar navbar-dark bg-dark pt-3 pb-3">
        <form class="form-inline">
          <h1>Hale - A web based interpreter</h1>
          <button class="btn btn-lg btn-light" type="button">Light Mode</button>
          <button class="btn btn-lg btn-secondary" type="button">Dark Mode</button>
          <button onClick={routeChange} class="btn btn-lg btn-info" type="button">Info</button>
          <button class="btn btn-lg btn-success float-right" type="button">Run</button>
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
            <MyEditorControl />          
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