import React, { useState } from 'react';

export default function FeedBack(props) {
    const [smileCount, setSmileCount] = useState(-1);
    const [catSubject, setCatSubject] = useState('');
    const [feed, setFeed] = useState('');
    const [submit, setSubmit] = useState(false);
    // submit feed
    const submitFeed = () => {
        fetch('https://chatbot-nmce.vercel.app/feeddata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating:smileCount,
                catagory:catSubject,
                feedText:feed
            }),
            })
            .then(response => response.json())
            .then(data => {
                // console.log('Form submitted successfully:', data);
                setSubmit(true);
                props.feedState(!props.state);
                // Optionally, you can perform additional actions after a successful request
            })
            .catch(error => {
                // console.error('Error submitting form:', error);
                // Handle errors or provide feedback to the user
                setSubmit(false);
            });
    }

    return (
        <div className="feedBack1" style={{ display: props.state ? 'flex' : 'none'}}>
      <h2>Your FeedBack</h2>
      <h5>We would like your feedback to improve our website</h5>
      <div className="feedCount">
        <h5>What is your opinion.</h5>
        <div className="smilies">
          <button id="smile1" onClick={()=>setSmileCount(1)} className={`${smileCount===1?`selectSmile` : 'smile'}`}>☹️</button>
          <button id="smile2" onClick={()=>setSmileCount(2)} className={`${smileCount===2?`selectSmile` : 'smile'}`}>😕</button>
          <button id="smile3" onClick={()=>setSmileCount(3)} className={`${smileCount===3?`selectSmile` : 'smile'}`}>😐</button>
          <button id="smile4" onClick={()=>setSmileCount(4)} className={`${smileCount===4?`selectSmile` : 'smile'}`}>😊</button>
          <button id="smile5" onClick={()=>setSmileCount(5)} className={`${smileCount===5?`selectSmile` : 'smile'}`}>😍</button>
        </div> 
      </div>
      <div className="catagory">
        <h5>Please select your feedback catagory below.</h5>
        <div>
          <button className={`catag ${catSubject === 'Suggestion' ? 'selectCat':''}`} onClick={(event => setCatSubject(event.target.innerText))}>Suggestion</button>
          <button className={`catag ${catSubject === 'Something Is Not Quite Right' ? 'selectCat':''}`} onClick={(event => setCatSubject(event.target.innerText))}>Something Is Not Quite Right</button>
          <button className={`catag ${catSubject === 'Compliment' ? 'selectCat':''}`} onClick={(event => setCatSubject(event.target.innerText))}>Compliment</button>
        </div>  
      </div>
      <div className="feedmsg">
        <h5>Please leave your feedback below.</h5>
        <textarea name="" onChange={event => setFeed(event.target.value)} className="textarea" cols="40" rows="4"></textarea>
        <button onClick={submitFeed}>{`${submit === false ? 'Submit' : 'Submitted!'}`}</button>
      </div>
    </div>
    )
}
