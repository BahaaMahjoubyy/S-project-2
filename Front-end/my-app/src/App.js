import React, { useState, useRef } from 'react';
import About from './components/About.jsx';
import News from './components/News.jsx';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import Footer from './components/Footer.jsx';
import Posts from './components/Posts.jsx';
import Profile from './components/Profile.jsx';
import CommunityHighlight from './components/CommunityHighlight';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed.jsx';
import '../src/App.css';
import home from '../src/images/home.png';
import logo from '../src/images/logo.png';
import './css/chat.css';
import communityHighlights from './dummyData.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouseChimney} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {faPeopleArrows} from '@fortawesome/free-solid-svg-icons';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons';



function App() {
  const [view, setView] = useState('Home');
  const aboutRef = useRef(null);
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const changeView = (newView) => {
    if (newView === 'About') {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setView(newView);
    }
  };


  return (
    <div className="App">
     <nav className='navbar'>
  {isLoggedIn ? (
    <>
      <div className='login-div'>
        <img className='login-img' src={currentUser.IMAGE} alt="" />
        <h2 className="Login" onClick={() => changeView('Profile')}> Profile</h2>
        <h2 className="LogOut" onClick={() => {
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
          localStorage.clear();
          changeView('Login');
        }}>
          LogOut
        </h2>
      </div>
    </>
  ) : (
    <div className='login-div'>
      <img className='login-img' src="https://res.cloudinary.com/db2yjlbsw/image/upload/v1707472250/b4rdekuvkytlte4kgnkv.png" alt="" />
      <h2 className="Login" onClick={() => changeView('Login')}> Login</h2>
    </div>
  )}
 <h2 onClick={() => changeView('Home')}>
  <FontAwesomeIcon icon={faHouseChimney} style={{ marginRight: '5px' }} />
  Home
</h2>
<h2 onClick={() => changeView('CodesNews')}>
  <FontAwesomeIcon icon={faBell} style={{ marginRight: '5px' }} />
  Codes News
</h2>
  <h2 onClick={() => changeView('Postes')}><FontAwesomeIcon icon={faNewspaper}  style={{ marginRight: '5px' }} />Postes</h2>
  <h2 onClick={() => changeView('Chat')}><FontAwesomeIcon icon={faPeopleArrows}   style={{ marginRight: '5px' }} />Chat</h2>
  <h2 onClick={() => changeView('About')}><FontAwesomeIcon icon={faAddressCard}   style={{ marginRight: '5px' }} />About</h2>
  
  <img className='logo' src={logo} alt="logo" />
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
          <div className="community-highlights">
            <hr className='hr'></hr>
            <h2>Community Highlights</h2>
            <hr></hr>
            {communityHighlights.map((highlight, index) => (
              <CommunityHighlight key={index} highlight={highlight} />
            ))}
          </div>
        </>
      )}

      {view === 'CodesNews' && <News view={view} />}
      {view === 'Login' && <Login changeView={changeView} />}
      {view === 'SignIn' && <SignIn changeView={changeView} />}
      {view === 'Postes' && <Posts changeView={changeView} />}
      {view === 'Profile' && <Profile />}
      {view === 'Chat' && <ChatEngine
        height="100vh"
        projectID="98d2c3a2-6a77-4ce0-98cb-d77186b67640"
        userName="iyes"
        userSecret="123123"
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
      />}

      <Footer />
    </div>
  );
}

export default App;
