function Authcheck(setUser,setAuth){
    fetch('https://chatbot-nmce.vercel.app/checkAuth', {
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
            // console.log(data.user);
            setUser(data.user);
            setAuth(true);
            return data;
        } else {
            console.log("uN-Autherized");
            setUser('user');
            setAuth(false);
            return data;
        }
      })
      .catch((err) => {
        console.error('Error during registration:', err);
      });
}
export default Authcheck;