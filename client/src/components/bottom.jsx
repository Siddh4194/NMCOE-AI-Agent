import React, { useEffect, useRef, useState, useCallback } from 'react';

const Bottom = (props) => {
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const setChildren = props.setChildren;
  const children = props.children;
  const [prevuserMsg, setPrwvUserMsg] = useState('');
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
      fetch('https://chatbot-nmce.vercel.app/predict', {
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

  return (
    <div className={`bottom ${loading ? 'disabled' : ''}`}>
      <div className={`ask-body ${loading ? 'disabled' : ''}`}>
        {error ? (
          <>
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
            
            <button
              onClick={handleRegenerateClick}
              className="regenerate-button"
            >
              <span class="material-symbols-outlined" style={{color:'red'}}>
refresh
</span>
            </button>
            </>
        ) : (
          <>
            <input
              ref={inputRef}
              className="in"
              type="text"
              name="usermsg"
              autoFocus
              autoComplete="off"
              placeholder="Ask Me Anything About Admission"
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
};

export default Bottom;
