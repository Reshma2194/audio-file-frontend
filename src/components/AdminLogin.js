import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { baseurl } from '../common';

function AdminLogin() {
  let navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let [usernameRequired, setUsernameRequired] = useState(false);
  let [passwordRequired, setPasswordRequired] = useState(false);
  let [loginFailed, setLoginFailed] = useState(false);

  function login(e){
    e.preventDefault();
    setLoginFailed(false);
    setUsernameRequired(false);
    setPasswordRequired(false);
    if(username.trim() === ""){
      setUsernameRequired(true);
      return;
    }
    if(password === ""){
      setPasswordRequired(true);
      return;
    }
    axios.post(baseurl + "admin/login", {data:{username:username, password:password}}).then((response)=>{
      if(response.data.status === "success"){
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem("usertype", "admin");
        navigate("/admin");
      }
      else{
        setLoginFailed(true);
      }
    }, (err)=>{
      alert("Something went wrong");
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="w-50 mx-auto p-5 mt-5" style={{ border:"solid 1px black" }}>
            <h2 className="text-center">Admin Login</h2>
            {loginFailed && <span className="text-danger"> Invalid credentials</span>}
            <hr />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              {usernameRequired && <span className="text-danger"> Username is required</span>}
              <Form.Control type="text" placeholder="Enter Username" onChange={(e)=>{ setUsername(e.target.value) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              {passwordRequired && <span className="text-danger"> Password is required</span>}
              <Form.Control type="password" placeholder="Enter Password" onChange={(e)=>{ setPassword(e.target.value) }} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>{ login(e); }}>
              Login
            </Button><br />
            <Link to="/">User Login</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
