import React, { useState } from 'react';
import About from './components/About.jsx'; 
import News from './components/News.jsx';
import '../src/App.css';
import home from '../src/images/home.png';

// import Login from './components/Login.jsx';
// import SignIn from './components/SignIn.jsx';

function App() {
  const [view, setView] = useState('Home');

  const changeView = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <nav className='navbar'>
        <h2 onClick={() => changeView('Home')}>Home</h2>
        <h2 onClick={() => changeView('CodesNews')}>Codes News</h2>
        <h2 onClick={() => changeView('Postes')}>Postes</h2>
        <h2 onClick={() => changeView('Chat')}>Chat</h2>
        <h2 onClick={() => changeView('About')}>About</h2> {/* Update view to 'About' */}
        <h2 className="Login" onClick={() => changeView('Login')}>🔻 Login</h2>
      </nav>

      <hr></hr>

      {view === 'Home' && (
        <>
          <img src={home} alt="Home" />
          <About />
        </>
      )}

      {view === 'CodesNews' && <News view={view} />}
    </div>
  );
}

export default App;



