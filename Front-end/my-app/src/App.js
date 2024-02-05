// Import necessary dependencies
import React, { useState } from 'react';
import About from './components/About.jsx'; // Adjust the path as needed
import News from './components/News.jsx';
import '../src/App.css';
import home from '../src/images/home.png';

// Define the App component
function App() {
  // Initialize the view state with 'Home'
  const [view, setView] = useState('Home');

  // Function to change the view
  const changeView = (newView) => {
    setView(newView);
  };

  // Return the JSX structure
  return (
    <div className="App">
      {/* Navbar with menu items */}
      <nav className='navbar'>
        <h2 onClick={() => changeView('Home')}>Home</h2>
        <h2 onClick={() => changeView('CodesNews')}>Codes News</h2>
        <h2 onClick={() => changeView('Postes')}>Postes</h2>
        <h2 onClick={() => changeView('Chat')}>Chat</h2>
      </nav>

      {/* Horizontal line under the navbar */}
      <hr></hr>

      {/* Render the image on the 'Home' view */}
      {view === 'Home' && <img className='home' src={home} alt="Home" />}

      {/* Conditionally render the Homy component based on the view state */}
      {view === 'Home' && <About />}

      {/* Conditionally render the News component based on the view state */}
      {view === 'CodesNews' && <News view={view} />}
    </div>
  );
}

// Export the App component
export default App;


