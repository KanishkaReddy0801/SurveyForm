import './register.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profession, setProfession] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    async function registerUser(event) {
        event.preventDefault();
    
        // Validation logic
        if (username.trim() === '') {
            alert('Name is required');
            return;
        }
        if (email.trim() === '') {
            alert('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Email is invalid');
            return;
        }
        if (phone.trim() === '') {
            alert('Phone is required');
            return;
        }
        if (isNaN(phone)) {
            alert('Phone must be a number');
            return;
        }
        if (phone.length !== 10) {
            alert('Phone must contain 10 digits');
            return;
        }
        if (profession.trim() === '') {
            alert('Profession is required');
            return;
        }
        if (password.trim() === '') {
            alert('Password is required');
            return;
        }
        if (password !== confirmpassword) {
            alert('Passwords do not match');
            return;
        }

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                phone,
                profession,
                password,
                confirmpassword,
            })
        });
        const data = await response.json();
    
        if (data.status === 'ok') {
            navigate('/');
        }
        console.log(data);
        window.location.href = "/";
    }

    

    return (
        <div className="registercontainer">
            <div className='registersignin'>
                <h1>Welcome Page<br />
                    <span className='second'>One line text</span><br />
                    <span className='third'> Will Be Here</span></h1>
                <p className='signin'>Sign in to continue access pages</p>
                <p className='smallpara'>Already Have An Account</p>
                <Link to={'/'}><button className='signinbtn'>Sign In</button></Link>
            </div>
            <div className='register'>
                <h1>Register</h1>
                <p>Register to continue access pages</p>
                <form method='POST' action='/register' onSubmit={registerUser}>
                <div className='inputs'>
                    <input type='text' placeholder="Name" value={username} onChange={(e) => setUserName(e.target.value)} />
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <div className='rline'>
                        <div className='inline'></div>
                        <div className='rinline'></div>
                    </div>
                    <input type='tel' placeholder='Phone' value={phone} onChange={(e) =>  setPhone(e.target.value) } />
                    <input type='text' placeholder='Profession' value={profession} onChange={(e) => setProfession(e.target.value)} />
                    <br />
                    <div className='rline'>
                        <div className='inline'></div>
                        <div className='rinline'></div>
                    </div>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type='password' placeholder='Confirm Password' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                    <br />
                    <div className='rline'>
                        <div className='inline'></div>
                        <div className='rinline'></div>
                    </div>
                    </div>
                    <div>
                        <input type="checkbox" id="chckbox" />
                        <span className='chcktxt'>I agree to Terms & Condition receiving marketing and promotional materials</span>
                    </div>
                    <input id='btnregister' type='submit' value='Register' />
                </form>
            </div>
        </div>
    );
}

export default Register;