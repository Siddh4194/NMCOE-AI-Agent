import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './css/chatbot.css';
import Bottom from './bottom';
import Chatbody from './chatBosy';

export default function Body(props) {
  const [apiResponse, setResponse] = useState({
    role: '',
    data: '',
  });

  const [userMsg, setUserMsg] = useState('');
  const [children, setChildren] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    apiResponse.role === 'user' && setUserMsg(apiResponse.data);
  }, [apiResponse]);

  const LogOut = () => {
    fetch('https://chatbot-nmce.vercel.app/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
          console.log('Logged out');
        } else {
          console.log('Error during logout');
          // Show error alert
          setSnackbarMessage('Log Out');
          setSnackbarOpen(true);
        }
      })
      .catch((err) => {
        console.error('Error during logout:', err);
        // Show error alert
        setSnackbarMessage('Error during logout');
        setSnackbarOpen(true);
      });
  };

  const toggleChat = (data) => {};

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <div className="main">
        <div className="nav1">
          <div onClick={() => window.open('https://nmcoe.org.in/')} className="collageName">
            <img src="/mainlogo.jpg" alt="Show" />
            <h3>NMCOE.Peth</h3>
          </div>
          <div className="feedBack">
            <h6 onClick={() => props.feedState(!props.state)}>FeedBack</h6>
            <h6 onClick={LogOut}>LogOut</h6>
          </div>
        </div>
        <Chatbody setChildren={setChildren} children={children} userMessage={userMsg} botResponse={apiResponse} />
        <Bottom setChildren={setChildren} children={children} toggleChat={toggleChat} botResponse={setResponse} />
      </div>

      {/* Snackbar for displaying errors */}
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
    </>
  );
}
