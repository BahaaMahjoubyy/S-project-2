import React, { useState, useRef } from 'react';
import About from './components/About.jsx'; 
import News from './components/News.jsx';
import '../src/App.css';
import home from '../src/images/home.png';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import logo from '../src/images/logo.png';
import Footer from './components/Footer.jsx';
import Posts from './components/Posts.jsx';
import Profile from './components/Profile.jsx'
import CommunityHighlight from './components/CommunityHighlight';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed.jsx';
import communityHighlights from './dummyData.json'
import './css/chat.css'


function App() {
  const [view, setView] = useState('Home');
  const aboutRef = useRef(null);
  const [profileData, setProfileData] = useState(null);
 


  const changeView = (newView, userId) => {
    if (newView === 'About') {
      aboutRef.current && aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (newView === 'Profile') {
      setProfileData(userId);
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
        <h2 className="Login" onClick={() => changeView('Login')}>🔻 Login</h2>
        <img  src={logo} alt="logo"/>
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
            <h2>Community Highlights</h2>
           
            {communityHighlights.map((highlight, index) => (
              <CommunityHighlight key={index} highlight={highlight} />
            ))}
          </div>
        </>
      )}

      {view === 'CodesNews' && < News view={view} />}
      {view === 'Login' && <Login changeView={changeView} />}
      {view === 'SignIn' && <SignIn changeView={changeView} />}
      {view === 'Postes' && <Posts changeView={changeView} />}
      {view === 'Profile' && <Profile userId={profileData} changeView={changeView} />}
      {view === 'Chat' &&  <ChatEngine
      height="100vh"
      projectID="98d2c3a2-6a77-4ce0-98cb-d77186b67640"
      userName="javascriptmastery"
      userSecret="123123"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    /> }



    <Footer/>

    </div>
  );
}

export default App;



