import React, { useState } from 'react';

const ClickableIcon = ( {thumb,userMessage,botMessage,initialColor, onClick, className }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    fetch(`https://chatbot-nmce.vercel.app/${thumb}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userInput:userMessage,
                botResponce:botMessage
            }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Form submitted successfully:', data);
                // Optionally, you can perform additional actions after a successful request
                setIsClicked(!isClicked);
                if (onClick) {
                  onClick();
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
  };

  const iconStyle = {
    color: isClicked ? 'white' : initialColor,
    // Add other styles as needed
  };

  return (
    <i style={iconStyle} onClick={handleClick} className={className}></i>
  );
};

export default ClickableIcon;