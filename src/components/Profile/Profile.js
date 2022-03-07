import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import useToken from '../../useToken';
import icon from './icon.png'
import useUserNameCurr from '../../useUserNameCurr';
import './Profile.css';

function Profile() {

  const { UserNameCurr, setUserNameCurr } = useUserNameCurr();
  const { token, setToken } = useToken();

  const [Task1CompletedFunctions, setTask1CompletedFunctions] = useState([]);
  const [Task2CompletedFunctions, setTask2CompletedFunctions] = useState([]);
  const [Task3CompletedFunctions, setTask3CompletedFunctions] = useState([]);
  const [Task4CompletedFunctions, setTask4CompletedFunctions] = useState([]);

  const [name, setName] = useState();
  const editor = document.querySelector(".editor");

  let navigate = useNavigate(); 
  const inforouteChange = () =>{ 
    let path = `../info`; 
    navigate(path);
  }

  const dashboardrouteChange = () =>{ 
    let path = `../dashboard`; 
    navigate(path);
  }

  const routeChange = () =>{ 
    let path = `../info`; 
    navigate(path);
  }

  function signOut() { 
    setToken('')
    setUserNameCurr('')
    let path = `../`; 
    navigate(path);
    window.location.reload();
  }

  useEffect(() => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: UserNameCurr })
    }
  
    fetch('/profile', requestOptions)
    .then(res => res.json()).then(data => {
      console.log(data);
      Task1CompletedFunctions.splice(0,Task1CompletedFunctions.length);
      if(data.spaceForward){
        Task1CompletedFunctions.push(data.spaceForward)
      }
      if(data.equalPos){
        Task1CompletedFunctions.push(data.equalPos)
      }
      if(data.pawnMoveForward){
        Task1CompletedFunctions.push(data.pawnMoveForward)
      }
      console.log(Task1CompletedFunctions)
      Task2CompletedFunctions.splice(0,Task2CompletedFunctions.length);
      if(data.addFallen){
        Task2CompletedFunctions.push(data.addFallen);
      }
    });
  }, []);

  useEffect(() => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: UserNameCurr })
    }
  
    fetch('/getname', requestOptions)
    .then(res => res.json()).then(data => {
      setName(data);
    });
  }, []);


  function buttonpress(){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editor.textContent })
  }

  fetch('/write', requestOptions)
      .then(response => response.json());
  };

  return (
    <div className="Info">

      <header className="App-header">
        <nav class="navbar navbar-dark bg-dark pt-3 pb-3">
        <form class="form-inline">
          <h1>Hale - A web based interpreter</h1>
          <button onClick={dashboardrouteChange} class="btn btn-lg btn-secondary" type="button">Dashboard</button>
          <button onClick={routeChange} class="btn btn-lg btn-info" type="button">Info</button>
        </form>
        <form class="form-inline float-right">
          <h1>‎</h1>
          {/* <button onClick={profile} class="btn btn-lg btn-primary" type="button">Profie</button> */}
          <button onClick={signOut} class="btn btn-lg btn-danger" type="button">Sign Out</button>
        </form>
      </nav>
      
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <br></br>
        <br></br>
        <img className="photo" src={icon}/>   
        <br></br>
        <h3 class="profilename">{name}</h3>
        <p class="profilename">Completed functions: {Task1CompletedFunctions.length + Task2CompletedFunctions.length}</p>
        <br></br>
        <br></br>
        <div class="row">
        <div class="column">
            <h3 class="columnheader">Task 1 Completed functions:</h3>
            {Task1CompletedFunctions.map(value => <p class="code">{value.toString()}</p>)}
        </div>
        <div class="column">
            <h3 class="columnheader">Task 2 Completed functions:</h3>
            {Task2CompletedFunctions.map(value => <p class="code">{value.toString()}</p>)}
        </div>
        </div>
        <br></br>
        <br></br>
        <div class="row">
        <div class="column">
            <h3 class="columnheader">Task 3 Completed functions:</h3>
            {Task3CompletedFunctions.map(value => <p class="code">{value.toString()}</p>)}
        </div>
        <div class="column">
            <h3 class="columnheader">Task 4 Completed functions:</h3>
            {Task4CompletedFunctions.map(value => <p class="code">{value.toString()}</p>)}
        </div>
        </div>
      </div>
      <div class="footer2">
          © Joe Moore
      </div>
      </header>
      
    </div> 
  );
}

export default Profile;