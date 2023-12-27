import React, { useEffect, useState } from 'react';
import './auth.css';
import LogIn from './logIn';
import SignUp from './signUp';
export default function AuthMain(props) {
    const [botName, setCollegeName] = useState('');
    const [sublines,setSublines] = useState(false);
    const [autStatus,setAuthStatus] = useState(true);
    const [logSign,setLogSign] = useState(true);
    
    useEffect(() => {
      let text = "Welcome to Aptous4";
      let count = 0;
  
      function animateText() {
        setCollegeName((prevText) => prevText + text[count]);
        count += 1;
        if (count === text.length-1) {
          clearInterval(intervalId);
          setSublines(true);
        }
      }
      const intervalId = setInterval(animateText, 200);
      return () => clearInterval(intervalId);
    }, []);


    const logIn =()=>{
        
    }
    return(
        <div className="authmain container-fluid">
            <div className="row">
            
                <div className="authMain-content ">
                    {
                        autStatus ?
                        (
                        <div className='animate' >
                                <h1><span>{botName}</span></h1>
                                <div className='main-subpoints' style={{display: sublines ? 'block' : 'none'}}>
                                    <p>Ease through admissions with <span style={{backgroundColor:'transparent',fontWeight:'bold'}}>NMCOE</span>'s Chatbot, crafted by our students for personalized guidance and innovative support.</p>
                                    <p>Our academic excellence speaks volumes, defining our <br/>commitment to outstanding education and continuous innovation.</p>
                                    <p>We believe in personalized guidance. Let our chatbot tailor your admission experience.</p>
                                    <p>Ready to begin? Chat with our knowledgeable bot for personalized assistance on admissions</p>
                                    <button onClick={()=> setAuthStatus(false)} className='main_logIn'>LogIn <span className="material-symbols-outlined">east</span></button>
                                </div>
                                <h1 className='CollgeBackgroundName'>NMCOE</h1>
                        </div>
                        )
                        : logSign?
                        (
                            <LogIn setLogSign={setLogSign} setAuth={props.setAuth} logIn={logIn} logSign={logSign}/>
                        ):(
                            <SignUp setAuth={props.setAuth} setLogSign={setLogSign} logIn={logIn} logSign={logSign}/>
                        )
                    }
                </div>
                <div className="logindiv ">

                </div>
            </div>
        </div>
    )
}