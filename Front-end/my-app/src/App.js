import React, { useState, useRef } from 'react';
import About from './components/About.jsx';
import News from './components/News.jsx';
import '../src/App.css';
import home from '../src/images/home.png';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import logo from '../src/images/logo.png';
import Footer from './components/Footer.jsx';
import Profile from './components/Profile.jsx';
import Chat from './components/Chat.jsx';

function App() {
  const [view, setView] = useState('Home');
  const aboutRef = useRef(null);

  const changeView = (newView) => {
    if (newView === 'About') {
      // Scroll to the About section
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView(newView);
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
        <h2 className="Login" onClick={() => changeView('Login')}> Login</h2>
        <h2 className="Profile" onClick={() => changeView('Profile')}> Profile</h2>
        <img src={logo} alt="logo" />
      </nav>

      <hr></hr>

      {view === 'Home' && (
        <>
          <div className='Home'>
            <img src={home} alt="Home" />
            <div className="home-content">
              <h2>Explore Exciting Features</h2>
              <p>
                Discover a wide range of courses, stay updated with the latest coding trends, and connect with other developers in our vibrant community.
              </p>
              <button onClick={() => changeView('CodesNews')}>Start Exploring</button>
            </div>
          </div>
          <About ref={aboutRef} />
        </>
      )}

      {view === 'CodesNews' && <News view={view} />}
      {view === 'Login' && <Login changeView={changeView}/>}
      {view === 'SignIn' && <SignIn changeView={changeView} />}
      {view === 'Profile' && <Profile  />}
      {view === 'Chat' && <Chat username="User1" />}

      <Footer />
    </div>
  );
}

export default App;
