import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');
  const editor = document.querySelector(".editor");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

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

  return (
    <div className="Dashboard">

      <header className="App-header">
        <nav class="navbar navbar-dark bg-dark pt-3 pb-3">
        <form class="form-inline">
          <h1>Hale - A web based interpreter</h1>
          <button class="btn btn-lg btn-light" type="button">Light Mode</button>
          <button class="btn btn-lg btn-secondary" type="button">Dark Mode</button>
          <button class="btn btn-lg btn-info" type="button">Info</button>
          <button class="btn btn-lg btn-success float-right" type="button">Run</button>
        </form>
        <form class="form-inline float-right">
          <h1>‎</h1>
          <button class="btn btn-lg btn-primary" type="button">Profie</button>
          <button class="btn btn-lg btn-danger" type="button">Sign Out</button>
        </form>
      </nav>
      

    <div class="mycontainer">
        <div class="myleft">
            <div class="myeditor" contenteditable="">
                Write Code here...
            </div>
        </div>
        <div class="mybar"title="Click and Drag"></div>
        <div class="myright">
        <div class="mymids">
          <p>{FunctionOutput}.</p>
        </div>
        <div class="mymids">
        <p>{PrintOutputs}</p>
        </div>
        </div>
    </div>
      </header>
    </div>
  );
}

export default Dashboard;