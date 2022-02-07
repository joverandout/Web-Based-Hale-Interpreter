import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';

function App() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');
  const [token, setToken] = useState();
  const editor = document.querySelector(".editor");


  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  // useEffect(() => {
  //     // Simple POST request with a JSON body using fetch
  //     const requestOptions = {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ title: 'return("yo"+"yo");' })
  //     };
  //     fetch('/write', requestOptions)
  //         .then(response => response.json());
  // }, []);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setFunctionOutput(data.time);
      setPrintOutput(data.prints);
    });
  }, []);




  function buttonpress(){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editor.textContent })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`);
  }

  fetch('/write', requestOptions)
      .then(response => response.json());
  };

  if(!token){
    return<Login setToken={setToken} />
  }

  return (
    <div className="App">
      <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/preferences"element={<Preferences />}></Route>
        </Routes>
      </Router>
    </div>
    {/*
      <header className="App-header">
      <div class="editor-menu">
        <button class="btn">Dark Mode</button>
        <button class="btn">Light Mode</button>
        <button class="btn" onClick={buttonpress}>Run</button>
    </div>

    <div class="container">
        <div class="left">
            <div class="editor" contenteditable="">
                Write Code here...
            </div>
        </div>
        <div class="bar"title="Click and Drag"></div>
        <div class="right">
        <div class="mids">
          <p>{FunctionOutput}.</p>
        </div>
        <div class="mids">
        <p>{PrintOutputs}</p>
        </div>
        </div>
    </div>
      </header>*/}
    </div> 
  );
}

export default App;