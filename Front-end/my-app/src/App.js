import React, { useState, useRef } from 'react';
import About from './components/About.jsx';
import News from './components/News.jsx';
import '../src/App.css';
import home from '../src/images/home.png';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import Profile from './components/Profile.jsx'
import Footer from './components/Footer.jsx';

function App() {
  const [view, setView] = useState('Home');
  const [profileData, setProfileData] = useState(null);
  const changeView = (newView, userId) => {
    setView(newView);
    if (newView === 'Profile') {
      setProfileData(userId);
    }
  };
  return (
    <div className="App">
      <nav className='navbar'>
        <h2 onClick={() => changeView('Home')}>Home</h2>
        <h2 onClick={() => changeView('CodesNews')}>Codes News</h2>
        <h2 onClick={() => changeView('Postes')}>Postes</h2>
        <h2 onClick={() => changeView('Chat')}>Chat</h2>
        <h2 onClick={() => changeView('About')}>About</h2>
        <h2 className="Login" onClick={() => changeView('Login')}>🔻 Login</h2>
        {/* <img src={logo} alt="logo" /> */}
      </nav>

      <hr></hr>

      {view === 'Home' && (
        <>
          <div className='Home'>
            <img src={home} alt="Home" />
          </div>
          {/* <About ref={aboutRef} /> */}
        </>
      )}

      
      {view === 'CodesNews' && < News view={view} />}
      {view === 'Login' && <Login changeView={changeView} setProfileData={setProfileData} />}

      {view === 'SignIn' && <SignIn changeView={changeView} />}
      {view === 'Profile' && <Profile userId={profileData} />}

      <Footer />

    </div>


  );
}

export default App;




