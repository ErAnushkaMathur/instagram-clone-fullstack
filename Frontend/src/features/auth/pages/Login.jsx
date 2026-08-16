import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {

    const { user, loading, handleLogin } = useAuth()

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleLogin(username, password)

        navigate('/')

    }
     const handleDemoLogin = async () => {
    const demoUsername = "recruiter_demo";
    const demoPassword = "Demo@123";

    setUsername(demoUsername);
    setPassword(demoPassword);

    await handleLogin(demoUsername, demoPassword);
    navigate("/");
};

    if (loading) {
        return (<main>
            <h1>Loading.....</h1>
        </main>)
    }


    return (

        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        id='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter password' />
                    <button className='button primary-button' >Login</button>
                    <p>Recruiter? Try the demo account:</p>
                    <button type="button" onClick={handleDemoLogin}>
  Use Demo Account
</button>
                </form>
                <p>Don't have an account ? <Link to={"/register"} >Create One.</Link></p>
            </div>
        </main>
    )
}

export default Login