import React, { useState, useRef } from 'react';
import About from './components/About.jsx'; 
import News from './components/News.jsx';
import '../src/App.css';
import home from '../src/images/home.png';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import logo from '../src/images/logo.png';
import Footer from './components/Footer.jsx';
import Profile from './components/Profile.jsx'
import Chat from './components/Chat.jsx';
import CommunityHighlight from './components/CommunityHighlight';

function App() {
  const [view, setView] = useState('Home');
  const aboutRef = useRef(null);
  const [profileData, setProfileData] = useState(null);
 
  const changeView = (newView ,userId) => {
    if (newView === 'About') {
      // Scroll to the About section
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }  else if (newView === 'Profile') {
      setProfileData(userId);
    }else {
      setView(newView);
    }
  };
  const communityHighlights = [
    {
      title: "Member Spotlight : Jesser Gafsi",
      description: "Meet our outstanding community member, Jesser Gafsi, who recently completed a challenging coding React js project.",
      imageSrc: "https://res.cloudinary.com/ali22/image/upload/v1697643740/koss/fkouieiqatlc0iqeop1c.jpg"
    },
    {
      title: "Member Spotlight : Iyes Cherni",
      description: "Meet our outstanding community member,Iyes Cherni, who recently completed a challenging coding Paython project.",
      imageSrc: "https://res.cloudinary.com/ali22/image/upload/v1697649807/koss/b6i8ewqnknolurcpzjae.jpg"
    },
    {
      title: "Member Spotlight : Ghada Aasidi",
      description: "Meet our outstanding community member,Ghada Aasidi, who recently completed a challenging coding next js project.",
      imageSrc: "     https://res.cloudinary.com/ali22/image/upload/v1697643533/koss/zj8hwj6cnwen5cyxisny.jpg "
    },
    {
      title: "Member Spotlight : Baha Mahjouby",
      description: "Meet our outstanding community member,bahaMahjouby, who recently completed a challenging coding React js project.",
      imageSrc: " https://res.cloudinary.com/ali22/image/upload/v1697654326/koss/cqzky0u6bsjiwoe4paci.jpg"
    },
    {
      title: "Member Spotlight : Hiba Jaleli",
      description: "Meet our outstanding community member,Hiba Jaleli, who recently completed a challenging coding Javascript js project.",
      imageSrc: "https://res.cloudinary.com/ali22/image/upload/v1697652909/koss/hjysckkvszagjtrhonos.jpg"
    },

    {
      title: "Member Spotlight : Khalil Cherni",
      description: "Meet our outstanding community member,Khalil Cherni, who recently completed a challenging coding Node js project.",
      imageSrc: " https://res.cloudinary.com/ali22/image/upload/v1697643555/koss/a5xm9hniopm4lp8cg2i1.jpg"
    },
    
  ];
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
      {view === 'Profile' && <Profile userId={profileData} changeView={changeView} />}
      {view === 'Chat' && <Chat username="User1" />}



    <Footer/>

    </div>
  );
}

export default App;



