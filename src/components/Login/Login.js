import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import axios from "axios";

import './Login.css';


async function loginUser(credentials) {
  try{
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
    return([{
        token: responsey.data.token,
      }, null]);
  }
  catch (error){
    return([{
      token: '',
    }, error.response.data]);
  }
}

async function SignUpUser(credentials) {
  return({
      token: 'signup'
    });
}



export default function Login({ setToken, setUserNameCurr }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();


  const handleSubmit = async e => {
      e.preventDefault();
      
      if((username == null || username == '') && (password == null || password == '')){
        setError("No login information was provided");
        return;
      }
      else if(username == null || username == ''){
        setError("Username must be filled in");
        return;
      }
      else if(password == null || password == ''){
        setError("Password must be filled in");
        return;
      }
      const token = await loginUser({
        username,
        password
      });
      console.log(token)
      console.log(token[1])
      setToken(token[0]);
      setError(token[1]);
      // if(token == 'token1234'){
      const UserNameCurr = { UserNameCurr: username}
      setUserNameCurr(UserNameCurr)
      console.log(UserNameCurr)
      // }
      console.log(token)
  }

  const signup = async e => {
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

  return(
    <div>
      <div className="login-wrapper">
          <h2 class="title">Hale - A Web Based Interpreter</h2>
          <h3 class="signin">Please Login</h3>
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
            <button type="submit" class="btn btn-primary"><div class="btntextloginpage">Submit</div></button>
            <br></br>
            <br></br>
            <a href="#" onClick={signup}>Don't have an account? Sign up Here!</a>
          </form>
          <div class="errorMessage">{error}</div>
      </div>
      <div class="footer">
        © Joe Moore
      </div>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }