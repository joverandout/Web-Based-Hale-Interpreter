import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import axios from "axios";

import './SignUp.css';

async function SignUpUser(credentials) {
  const responsey = await axios({
    method: "POST",
    url:"/hostSignUp",
    data:{
      email: credentials.username,
      password: credentials.password
     }
    }
  ).then((response)=>{
    return response
    // axios returns API response body in .data
  })
  return({
      token: responsey.data.token,
    });
}

async function loginUser(credentials) {
  return({
      token: ''
    });
}


export default function SignUp({ setToken, setUserNameCurr }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await SignUpUser({
          username,
          password
        });
        setToken(token);
        // if(token == 'token1234'){
          const UserNameCurr = { UserNameCurr: username}
          setUserNameCurr(UserNameCurr)
          console.log(UserNameCurr)
        // }
        console.log(token)
    }

    const login = async e => {
      e.preventDefault();
      const token = await loginUser({
        username,
        password
      });
      setToken(token);
      // if(token == 'token1234'){
        const UserNameCurr = { UserNameCurr: username}
        setUserNameCurr(UserNameCurr)
        console.log(UserNameCurr)
      // }
      console.log(token)
    }

    return(
      
        <div className="SignUp-wrapper">
            <h2 class="title">Hale - A Web Based Interpreter</h2>
            <br></br>
            <br></br>
            <h3>Please Sign Up</h3>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control input-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setUserName(e.target.value)}></input>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <br></br>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control input-lg" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
              </div>
              {/* <div class="form-check">
                <input type="checkbox" class="form-check-input input-lg" id="exampleCheck1"></input>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div> */}
              <br></br>
              <a href="#" onClick={login}>Already have an account? Login here!</a>
              <br></br>
              <br></br>
              <button type="submit" class="btn btn-primary"><div class="btntextSignUppage">Submit</div></button>
            </form>
        </div>



    )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
  }