import React ,{useState}from 'react'
import News  from './components/News.jsx';
import '../src/App.css'
function App() {

  const [view, setView] = useState('Home');

  const changeView = (newView) => {
    setView(newView);
  };





  return (
    <div className="App">
     <nav className='navbar'>
        {/* <img className='logo' src={logo} alt="Logo" /> */}
        <h2 onClick={() => changeView('Home')}>Home</h2>
        <h2 onClick={() => changeView('CodesNews')}>Codes News</h2>
        <h2 onClick={() => changeView('Postes')}>Postes</h2>
        <h2 onClick={() => changeView('Chat')}>Chat</h2>



      </nav>
      <div>



     
      {view === 'CodesNews' && < News view={view}/> }

        
        
  
      </div>
   
    </div>
   
  );
};

export default App;
