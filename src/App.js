import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Info from './components/Info/Info';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import Profile from './components/Profile/Profile';
import useToken from './useToken';
import useUserNameCurr from './useUserNameCurr';


function App() {
  const { token, setToken } = useToken();
  const { UserNameCurr, setUserNameCurr} = useUserNameCurr();
  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');
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

  console.log("===========")
  console.log(token)
  // console.log(token.tokenelem)
  console.log(UserNameCurr)
  console.log("===========")

  if(!token){
    console.log("no token")
    console.log(token)
    return<Login setToken={setToken} setUserNameCurr = {setUserNameCurr}/>
  }
  
  return (
    <div className="App">
      <div className="wrapper">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/preferences"element={<Preferences />}></Route>
          <Route exact path="/info"element={<Info />}></Route>
          <Route exact path="/profile"element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
    </div> 
  );
}

export default App;