import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
          setSnackbarMessage(data.message);
          setSnackbarOpen(true);
          props.setAuth(false);
        }
      })
      .catch((err) => {
        console.error('Error during registration:', err);
        setSnackbarMessage('Error during registration. Please try again.');
        setSnackbarOpen(true);
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
          setSnackbarMessage(data.message);
          setSnackbarOpen(true);
        }
      })
      .catch((err) => {
        console.error('Error during verification:', err);
        setOtpStatus('Check Internet 🛜');
        setSnackbarMessage('Error during OTP verification. Please try again.');
        setSnackbarOpen(true);
      });
  };

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='animate'>
      {emailverify ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
      {/* Snackbar component */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
