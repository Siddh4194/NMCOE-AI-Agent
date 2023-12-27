import React, { useEffect, useRef, useState, useCallback } from 'react';

const Bottom = (props) => {
  const [userMsg, setUserMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const setChildren = props.setChildren;
  const children = props.children;

  const handleSubmit = useCallback(() => {
    setLoading(true);

    props.botResponse({
      role: 'user',
      data: userMsg,
    });

    var loadingElement = (
      <div key={children.length + 1} className="loading">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    );
    setChildren([...children, <div key={userMsg} className="user-message">{userMsg}</div>, loadingElement]);

    setTimeout(() => {
      fetch('https://chatbot-nmce.vercel.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          input: userMsg,
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
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);

    setUserMsg('');
  }, [props.botResponse, userMsg, children, setChildren]);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
      }
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown);

      return () => {
        inputElement.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [inputRef, handleSubmit]);

  return (
    <div className={`bottom ${loading ? 'disabled' : ''}`}>
      <div className={`ask-body ${loading ? 'disabled' : ''}`}>
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
        <button className="send" type="button" onClick={handleSubmit} disabled={loading}>
          <span style={{ color: 'white' }} className="material-symbols-outlined">
            send
          </span>
        </button>
      </div>
    </div>
  );
};

export default Bottom;
