import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Info.css';

import useToken from '../../useToken';
import useUserNameCurr from '../../useUserNameCurr.js';


function Info() {
  const { UserNameCurr, setUserNameCurr } = useUserNameCurr();
  const { token, setToken } = useToken();
  
  const [FunctionOutput, setFunctionOutput] = useState(0);
  const [PrintOutputs, setPrintOutput] = useState(0);
  const [name, setName] = useState('');
  const editor = document.querySelector(".editor");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  let navigate = useNavigate(); 
  const inforouteChange = () =>{ 
    let path = `../info`; 
    navigate(path);
  }

  const dashboardrouteChange = () =>{ 
    let path = `../dashboard`; 
    navigate(path);
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

  const profile = () =>{ 
    let path = `../profile`; 
    navigate(path);
  }

  function signOut() { 
    setToken('')
    setUserNameCurr('')
    let path = `../`; 
    navigate(path);
    window.location.reload();
  }

  return (
    <div className="Info">

      <header className="App-header">
        <nav class="navbar navbar-dark bg-dark pt-3 pb-3">
        <form class="form-inline">
          <h1>Hale - A web based interpreter</h1>
          <button onClick={dashboardrouteChange} class="btn btn-lg btn-secondary" type="button">Dashboard</button>
        </form>
        <form class="form-inline float-right">
          <h1>‎</h1>
          <button onClick={profile} class="btn btn-lg btn-primary" type="button">Profie</button>
          <button onClick={signOut} class="btn btn-lg btn-danger" type="button">Sign Out</button>
        </form>
      </nav>
      
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <br></br>
        <br></br>
        <h2>Hale</h2>
        <br></br>
        <p>Hale is a purely functional statically typed functional programming language. It was designed by Joe Moore to make learning functional programming easier. For such reason it
          excludes some of the more trickier elements of the paradigm and focuses on the core essentials. Hale supports:
        </p><p>
        <ul>
          <li>Lambda Expressions (or basic functions)</li>
          <li>Primitive Types (integers, bools and strings)</li>
          <li>Function application</li>
          <li>Lists and list operations</li>
          <li>Higher order functions</li>
          <li>Recursion</li>
        </ul>
        </p>
        <h3>Getting started with Hale</h3>
        <p>A simple Hale program looks a little like this:</p>
        <p class="inlineterminalp">def cube ::= λ x : int. x * x * x;</p>
        <p>Although the purpose of this function might be obvious from its name, let's break it down further. We start with the 'def' keyword. This indicates to the compiler and
          the programmer that we are defining a new function rather than calling an existing one, or performing some other operation. This is followed by the function name, in this
          case 'cube'. We then see the '::=' which is common notation in many functional programming languages. This is followed by a lambda. This is just again more symbolic and a
          little nod thrown into the language to pay homage to the functional languages that came before Hale. The lambda is followed by any function parameters, in this instance we
          have one, 'x'. A colon, ':', then means we are getting into the nitty gritty. The type the function should returned is then declared and full stop signifies the beginning
          of the function. The following expression can call other functions, use any of the built in ones, or many other things. The rule of thumb is it has to be an expression. We
          will cover in more detail what this means later. In this case it's an arithmetic operation x is multiplied by itself and then multiplied by x again. Giving the cube of x.
          We finish with a semi-colon, ';'. Let's give that a run. 
        </p>
        <div class="fakeMenu">
          <div class="fakeButtons fakeClose"></div>
          <div class="fakeButtons fakeMinimize"></div>
          <div class="fakeButtons fakeZoom"></div>
        </div>
        <div class="fakeScreen">
          <p class="line4 terminalp">$ def cube ::= λ x : int. x * x * x;</p>
          <p class="line4 terminalp">$ cube(3);</p>
          <p class="line4 terminalp">> 9</p>
          <p class="line4 terminalp">$ cube(5);</p>
          <p class="line4 terminalp">> 125</p>
          <p class="line4 terminalp">$ cube("Aubergine");</p>
          <p class="line4 terminalp">> LOGICAL ERROR: Multiplication can only be applied to type ints. You have applied it to 'Aubergine' which is type 'str'_</p>
        </div>
        <br></br>
        <p>So what we're saying with our function definition is this. We are defining a function called bue, it takes one input called x. We expect it to give us an integer back
          and to get that we are going to multiply x by x by x. Simple right? In case you are slightly confused here is a generic rule of thumb for function definition in Hale:
        </p>
        <p class="inlineterminalp">def [function name] :: = λ [function parameters] : [function type] . [function body]</p>
        <p>Congratulations! You've written your first Hale function. Feel free to return to the exercises or to keep reading if you want to unlock more yummy functional programming
          secrets!
        </p>
      </div>

    {/* <div class="mycontainer">
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
    </div>*/}
      </header>
    </div> 
  );
}

export default Info;