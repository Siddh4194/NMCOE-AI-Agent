import React, { useEffect, useRef, useState, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Bottom = (props) => {
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const setChildren = props.setChildren;
  const children = props.children;
  const [prevuserMsg, setPrwvUserMsg] = useState('');
  const [voiceState, setVoiceState] = useState(true);
  // Inside your component function
const [isVoiceButtonDown, setIsVoiceButtonDown] = useState(false);

  const handleSubmit = useCallback((message) => {
    setLoading(true);
    setPrwvUserMsg(message);
    setUserMsg('');
    props.botResponse({
      role: 'user',
      data: message,
    });

    var loadingElement = (
      <div key={children.length + 1} className="loading">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    );
    setChildren([...children, <div key={message} className="user-message">{message}</div>, loadingElement]);

    setTimeout(() => {
      fetch('http://localhost:3001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setChildren((prevChildren) => prevChildren.slice(0, -2));
          props.botResponse({
            role: 'bot',
            data: data,
          });
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          setChildren((prevChildren) => prevChildren.slice(0, -3));
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  }, [props.botResponse, children, setChildren]);

  const handleRegenerateClick = () => {
    setError(null);
    handleSubmit(prevuserMsg); // Pass the last entered message to handleSubmit
  };

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(userMsg);
      }
    }; 

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown);

      return () => {
        inputElement.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [inputRef, handleSubmit, userMsg]);




  // speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  
  useEffect(()=>{
    setUserMsg(transcript);
    if(!listening && userMsg){
      handleSubmit(userMsg);
    }
  },[transcript,listening])


  if (!browserSupportsSpeechRecognition) {
    return setVoiceState(false);
  }




  return (
  <div className={`bottom ${loading ? 'disabled' : ''}`}>
    <div className={`ask-body ${loading ? 'disabled' : ''}`}>
      {error ? (
        <>
          <button
          onClick={()=>{
            SpeechRecognition.startListening();
            setIsVoiceButtonDown(true)
          }}
            className={`regenerate-button ${isVoiceButtonDown ? 'held-down' : ''}`}
          >
            {voiceState ? (
              <span className="material-symbols-outlined">mic</span>
            ) : (
              <span className="material-symbols-outlined">mic_off</span>
            )}
          </button>
          <input
            ref={inputRef}
            className="in"
            type="text"
            name="usermsg"
            autoFocus
            autoComplete="off"
            placeholder="Please try again."
            value={userMsg}
            onChange={(event) => setUserMsg(event.target.value)}
            disabled={true}
          />

          <button onClick={handleRegenerateClick} className="regenerate-button">
            <span className="material-symbols-outlined" style={{ color: 'red' }}>
              refresh
            </span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={()=>{
              SpeechRecognition.startListening();
              setIsVoiceButtonDown(true)
            }}
            className={`regenerate-button ${isVoiceButtonDown ? 'held-down' : ''}`}
            style={{ color: 'white' }}
          >
            {voiceState ? (
              <span className="material-symbols-outlined">mic</span>
            ) : (
              <span className="material-symbols-outlined">mic_off</span>
            )}
          </button>
          <input
            ref={inputRef}
            className="in"
            type="text"
            name="usermsg"
            autoFocus
            autoComplete="off"
            placeholder="Ask About Admission"
            value={userMsg}
            onChange={(event) => setUserMsg(event.target.value)}
            disabled={loading}
          />
          <button
            className="send"
            type="button"
            onClick={() => handleSubmit(userMsg)}
            disabled={loading}
          >
            <span style={{ color: 'white' }} className="material-symbols-outlined">
              send
            </span>
          </button>
        </>
      )}
    </div>
  </div>
);
}

export default Bottom;
