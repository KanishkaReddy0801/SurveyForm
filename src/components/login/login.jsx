import './login.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState([])

    async function loginUser(event) {
        event.preventDefault();
        if (email.trim() === '') {
            alert('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Email is invalid');
            return;
        }
        if (password.trim() === '') {
            alert('Password is required');
            return;
        }
        const resp = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        const data = await resp.json()

        if (data.token) {
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            window.location.href = '/survey'
        }
        setResponse(data);
        console.log(response.message == "Login Successful");
        console.log(JSON.stringify(response) == "Login Successful");
        console.log(response.token);
    }

    return (
        <div className="logincontainer">
            <div className='loginregister'>
                <h1>Welcome Page<br />
                    <span className='second'>One line text</span><br />
                    <span className='third'> Will Be Here</span></h1>
                <p className='signin'>Sign in to continue access pages</p>
                <p className='smallpara'>Don’t Have An Account?</p>
                <Link to={'/register'}><button className='registerbutton'>Register</button></Link>
            </div>
            <div className='login'>
                <h1>Sign In</h1>
                <p>Sign in to continue access pages</p>
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <div className='line'></div>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <div className='line'></div>
                    <button onClick={loginUser} id='btn'>Sign In</button>
                    <br />
            </div>
        </div>
    );
}

export default Login;