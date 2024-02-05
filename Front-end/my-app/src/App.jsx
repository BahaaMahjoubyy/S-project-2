import React, { useState } from 'react';
import News from './components/News.jsx';
import Login from './components/Login.jsx';
import './App.css';

const App = () => {
  const [view, setView] = useState('News');





  const switchView = (option) => {
    setView(option);
  };





  return (
    <div>
      <div className='navbar'>
        <span className="News" onClick={() => switchView('News')}>
          🔻 News
        </span>
        <span className="Login" onClick={() => switchView('Login')}>
          🔻 Login
        </span>
      </div>







      {view === 'News' && <News />}
      {view === 'Login' && <Login />}
    </div>
  );
};

export default App;
