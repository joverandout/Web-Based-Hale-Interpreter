import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [SetFunctionOutput, setNewFunctionOutput] = useState(0);


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
    });
  }, []);


  function buttonpress(){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'return("hello2");' })
  }

  fetch('/write', requestOptions)
      .then(response => response.json());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={buttonpress}>
          Click me!
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {FunctionOutput}.</p>
      </header>
      <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div id="navbarMenuHeroA" class="navbar-menu">
                        <div class="navbar-end">
                            <a href="{{ url_for('main.index') }}" class="navbar-item">
                                Home
                            </a>
                            <a href="{{ url_for('main.profile') }}" class="navbar-item">
                                Profile
                            </a>
                            <a href="{{ url_for('auth.login') }}" class="navbar-item">
                                Login
                            </a>
                            <a href="{{ url_for('auth.signup') }}" class="navbar-item">
                                Sign Up
                            </a>
                            <a href="{{ url_for('auth.logout') }}" class="navbar-item">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <div class="hero-body">
            <div class="container has-text-centered">
               
            </div>
        </div>
    </div>
  );
}

export default App;

