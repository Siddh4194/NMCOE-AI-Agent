import React, { useState } from 'react';

export default function SignUp(props) {
  const [emailverify, setEmailVerify] = useState(true);
  const [otpStatus, setOtpStatus] = useState('Send OTP');
  const [otpValue, setOtpValue] = useState('');
  const [userSignUp, setSignUp] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUp((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if passwords match
    if (name === 'confirmPassword') {
      setPasswordMatchError(value !== userSignUp.password);
    }
  };

  const SignUp = () => {
    // Check if the password and confirmPassword match
    if (userSignUp.password !== userSignUp.confirmPassword) {
      setPasswordMatchError(true);
      return;
    } else {
      setPasswordMatchError(false);
    }

    // Send signup request
    fetch('https://chatbot-nmce.vercel.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userSignUp.email,
        name: userSignUp.name,
        password: userSignUp.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        if (data.status === true) {
          console.log('Registered');
          props.setAuth(true);
        } else {
          console.log('Registration failed:', data.message);
          props.setAuth(false);
        }
      })
      .catch((err) => {
        console.error('Error during registration:', err);
      });
  };

  const verEmail = (work) => {
    // Send signup request
    fetch(`https://chatbot-nmce.vercel.app/${work}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: userSignUp.email,
        otp: otpValue,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        if (data.status === true) {
          work === 'checkOtp' && setEmailVerify(false);
          setOtpStatus('Sended ✔️');
        } else {
          setOtpStatus('Check Internet 🛜');
        }
      })
      .catch((err) => {
        console.error('Error during verification:', err);
        setOtpStatus('Check Internet 🛜');
      });
  };

  return emailverify ? (
    <div className='animate'>
      <h3>
        <span>Verify The Email</span>
      </h3>
      <div className='login_Input'>
        <input
          type='text'
          name='email'
          value={userSignUp.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <button onClick={() => verEmail('sendemail')}>{otpStatus}</button>
        <input
          type='text'
          value={otpValue}
          onChange={(event) => setOtpValue(event.target.value)}
          placeholder='OTP'
        />
        {passwordMatchError && (
          <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
            OTP do not match.
          </p>
        )}
        <button onClick={() => verEmail('checkOtp')}>Verify Email</button>
      </div>
      <p style={{ color: '#678983' }}>Already have an account?</p>
      <h5
        onClick={() => props.setLogSign(!props.logSign)}
        style={{ color: '#678983', cursor: 'pointer' }}
      >
        LogIn
      </h5>
      <h1 className='CollgeBackgroundName'>NMCOE</h1>
    </div>
  ) : (
    <div className='animate'>
      <h3>
        <span>SignUp To Aptous4</span>
      </h3>
      <div className='login_Input'>
        <input
          type='text'
          name='name'
          value={userSignUp.name}
          onChange={handleChange}
          placeholder='Name'
        />
        <input
          type='text'
          name='email'
          value={userSignUp.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <input
          type='password'
          name='password'
          value={userSignUp.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <input
          type='password'
          name='confirmPassword'
          value={userSignUp.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm Password'
          style={{ border: passwordMatchError ? '1px solid red' : '1px solid #ccc' }}
        />
        {passwordMatchError && (
          <p style={{ color: 'red', fontSize: '14px', margin: '5px 0' }}>
            Passwords do not match.
          </p>
        )}
        <button onClick={SignUp}>SignUp</button>
      </div>
      <p style={{ color: '#678983' }}>Already have an account?</p>
      <h5
        onClick={() => props.setLogSign(!props.logSign)}
        style={{ color: '#678983', cursor: 'pointer' }}
      >
        LogIn
      </h5>
      <h1 className='CollgeBackgroundName'>NMCOE</h1>
    </div>
  );
}
