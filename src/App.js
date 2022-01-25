import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');

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
      body: JSON.stringify({ title: name })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`);
  }

  fetch('/write', requestOptions)
      .then(response => response.json());
  };

  return (
    <div className="App">

      <header className="App-header">
      <div class="editor-menu">
        <button class="btn btn-dark">Dark Mode</button>
        <button class="btn btn-light">Light Mode</button>
        <button class="btn btn-run" onClick={buttonpress}>Run</button>
    </div>

    <div class="container">
        <div class="left">
        {/* <textarea value={name} onChange={(e) => setName(e.target.value)}/> */}
        </div>
        <div class="bar"title="Click and Drag"></div>
        <div class="right">
        <p>{FunctionOutput}.</p>
        <br></br>
        <p>{PrintOutputs}[END]</p>
        <p>hell</p>
        </div>
    </div>
      </header>
    </div>
  );
}

export default App;

