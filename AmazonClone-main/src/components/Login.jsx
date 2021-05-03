import React,{useState,useContext} from "react";
import {Link,useHistory} from "react-router-dom";
import {UserContext} from "../Providers/stateProvider.js";

import "../login.css";
import axios from "axios";

export default function Login() {
  const history = useHistory();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [user,setUser] = useContext(UserContext);
  async function registerUser() {
    axios.post("http://localhost:8000/register",
    {username: username,password: password})
    .then(function(response){
      // console.log(response);
      if(response.data.success){
        setUser(username);
        console.log(user);
        history.push('/');
      }else{
       console.log("not registered");
      }
    }).catch(function(error){
      history.push('/login');
    })
  //   return fetch("http://localhost:8000/register",
  //   {
  //     method: 'POST',
  //     headers: {
  //    'Content-Type': 'application/json'
  //  },
  //   body: JSON.stringify({username: username,password: password})
  // }).then( (response) =>{
  //     return response.json();
  //   });
  }
  async function loginUser() {
    axios.post("http://localhost:8000/login",
    {username: username,password: password})
    .then(function(response){
      // console.log(response);
      if(response.data.success){
        setUser(username);
        console.log(user);
        history.push('/');
      }
      else{
       console.log("not logged");
      }
    }).catch(function(error){
      history.push('/login');
    })
  }

  async function HandleRegister(e){
    e.preventDefault();
    console.log("clicked");
    await registerUser();
  }

  async function HandleLogin(e){
    e.preventDefault();
    console.log("clicked");
    await loginUser();
  }

  return (
    <div className="login">
      <Link className="imagediv" to='/'>
        <img className="login_logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'  alt=" "/>
      </Link>
      <div className="formcontainer">
      <h3>SignIn</h3>
        <form className="form">
          <p><strong>Username</strong></p>
          <input type="email" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
          <p><strong>Password</strong></p>
          <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
          <input type="hidden" name="action" value="login"></input>
          <button onClick={(e)=>{HandleLogin(e)}}>Login</button>
          <pre>Agree to the terms and condition</pre>
          <button onClick={(e)=>{HandleRegister(e)}}>Create Amazon Account</button>
        </form>
      </div>
     </div>
  );
}
