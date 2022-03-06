import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';
import axios from "axios";

import './SignUp.css';

async function SignUpUser(credentials) {
  try{
    const responsey = await axios({
      method: "POST",
      url:"/hostSignUp",
      data:{
        email: credentials.username,
        password: credentials.password,
        firstname: credentials.fname,
        surname: credentials.sname
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
      token: 'signup',
    }, error.response.data]);
  }
}

async function loginUser(credentials) {
  return({
      token: ''
    });
}


export default function SignUp({ setToken, setUserNameCurr }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [fname, setFname] = useState();
    const [sname, setSname] = useState();
    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        if(username == null || username == ''){
          setError("Username must be filled in");
          return;
        }
        if(fname == null || fname == ''){
          setError("First Name must be filled in");
          return;
        }
        if(sname == null || sname == ''){
          setError("Surname must be filled in");
          return;
        }
        if(password == null || password == ''){
          setError("Surname must be filled in");
          return;
        }
        const token = await SignUpUser({
          username,
          password,
          fname,
          sname
        });

        setToken(token[0]);
        setError(token[1]);
        // if(token == 'token1234'){
        const UserNameCurr = { UserNameCurr: username}
        setUserNameCurr(UserNameCurr)
        //console.log(UserNameCurr)
        // }
        console.log(token)
        console.log(token[1])
        console.log(error)
    }

    const login = async e => {
      e.preventDefault();
      const token = await loginUser({
        username,
        password,
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
            <h3 class="signin">Please Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input type="name" class="form-control input-lg" id="exampleInpuFtName1" aria-describedby="emailHelp" placeholder="John" onChange={e => setFname(e.target.value)}></input>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Surname</label>
                <input type="name" class="form-control input-lg" id="exampleInputSName1" aria-describedby="emailHelp" placeholder="Doe" onChange={e => setSname(e.target.value)}></input>
              </div>
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
              <a href="#" onClick={login}>Already have an account? Login here!</a>
            </form>
            <div class="errorMessage">{error}</div>
        </div>
        <div class="footer">
          © Joe Moore
        </div>
    </div>


    )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
  }