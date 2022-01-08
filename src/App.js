import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [SetFunctionOutput, setNewFunctionOutput] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setFunctionOutput(data.time);
    });
  }, []);


  useEffect(() => {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React POST Request Example' })
      };
      fetch('/write', requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ postId: data.id }));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
    </div>
  );
}

export default App;
