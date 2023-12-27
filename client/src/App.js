import './App.css';
import './components/css/chatbot.css';
import Body from './components/body';
import FeedBack from './components/feedback';
import { useEffect, useState } from 'react';
import AuthMain from './components/authProcess/authMain';
import Authcheck from './checkuth';
function App() {
  const [validation,setValidation] = useState(false);
  // console.log(validation);
  const [authStatus,setAuth] = useState(false);
  const [user,setUser] = useState([]);
  const [greet,setGreetings] = useState('');
  const [boss,getBoss] = useState(true);
  // check the authentication

  // useEffect(()=>{
  //   Authcheck(setUser,setAuth);
  // },[authStatus])
  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Check if the current URL is the desired route
    if (currentUrl.endsWith('/auth/success')) {
      console.log('Accessing /auth/success route');
      setAuth(true);
      // Do something here if needed
    }
  }, []);
  // useEffect(() => {
  //   let text = "Weelcome Boss";
  //   let count = 0;

  //   function animateText() {
  //     setGreetings((prevText) => prevText + text[count]);
  //     count += 1;
  //     if (count === text.length-1) {
  //       clearInterval(intervalId);
  //     }
  //   }
  //   const intervalId = setInterval(animateText, 200);
  //   return () => clearInterval(intervalId);
  // }, []);


  return (
    <div className="App">
      {
        authStatus?
          user.email === 'siddh4194@gmail.com' && boss ?
          <div className='greeting'>
            <h1 style={{color:"#678983",fontFamily: 'Cinzel Decorative', fontWeight: '400'}}>{greet}</h1>
            <p>See My Performance</p>
            <button onClick={() => window.open('https://sodd-dash-board-4194.vercel.app/', '_blank')} className='bossButton'>
              {process.env.DATA}
              {/* go to DashBoard */}
            </button>
            <button onClick={() => getBoss(!boss)} className='bossButton'>
              Continue to Bot
            </button>
          </div>
          :
          <>
          <FeedBack state={validation} feedState={setValidation}/>
          <Body feedState={setValidation} state={validation}/>
          </>
        :
        (
        <AuthMain setAuth={setAuth} />
        )
      }
    </div>
  );
}

export default App;
