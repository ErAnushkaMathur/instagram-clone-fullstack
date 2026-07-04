import React from "react";
import '../style/form.scss'
import {Link} from 'react-router'
import axios from "axios"
import {useAuth} from "../hooks/useAuth"
import {useState} from "react"

const Login = () => {
  const[username , setUsername] = useState("")
  const[password , setPassword] = useState("")

  const {handleLogin} = useAuth()
  async function handleSubmit(e){
    e.preventDefault()

    handleLogin(username, password)
    .then(res=>{
      console.log(res)
    })
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onInput={(e)=>{
            setUsername(e.target.value)
          }}
          type="text" name="username" placeholder="Enter your username" />
          <input type="password" name="password" placeholder="Enter your password" />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link className="toggleAuthForm" to ="/register">Register</Link> </p>

      </div>
    </main>
  );  
};

export default Login;
