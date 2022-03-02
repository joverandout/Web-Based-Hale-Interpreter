import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import './Login.css';

async function loginUser(credentials) {
  const responsey = await axios({
    method: "POST",
    url:"/hostlogin",
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

export default function Login({ setToken, setUserNameCurr }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
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
      
        <div className="login-wrapper">
            <h1>Hale - A Web Based Interpreter</h1>
            <h2>Please login</h2>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control input-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setUserName(e.target.value)}></input>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control input-lg" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input input-lg" id="exampleCheck1"></input>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }