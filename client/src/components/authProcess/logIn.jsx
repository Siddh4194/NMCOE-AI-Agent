import React, { useState } from 'react';

export default function LogIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async() => {
    // Send login request
    try {
      const response = await fetch('https://chatbot-nmce.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username, // Replace with the actual variable for the email
          password: password, // Replace with the actual variable for the password
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.status === true) {
          // console.log('Logged In');
          props.setAuth(true);
        } else {
          // console.log('Login failed:', data.message);
          props.setAuth(false);
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      // console.error('Error during login:', err);
    }
  };
  
  // Usage in your component
  // <button onClick={handleLogin}>LogIn</button>

  return (
    <div className='animate'>
      <h3><span>LogIn To Aptous4</span></h3>
      <div className='login_Input'>
{/*         <input
          type="text"
          placeholder='email'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ border: loginError ? '1px solid red' : '1px solid #678983' }}
        />
        <input
          type="password"
          placeholder='******'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: loginError ? '1px solid red' : '1px solid #678983' }}
        />
        <button onClick={handleLogin}>LogIn</button> */}
        <button className='googleButton' onClick={()=> window.location.href = 'https://chatbot-nmce.vercel.app/auth/google'}><i class="fa-brands fa-google"></i>Log In With Google</button>
    </div> 
{/*       {loginError && <p style={{ color: 'red' }}>Invalid username or password</p>}
      <p style={{ color: '#678983' }}>register</p>
      <h5 onClick={() => { props.setLogSign(!props.logSign) }} style={{ color: '#678983', cursor: 'pointer' }}>SignUp</h5>*/}
      <h1 className='CollgeBackgroundName'>NMCOE</h1> 
    </div>
  );
}
