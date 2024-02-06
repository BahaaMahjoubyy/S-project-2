// About.jsx
import React from 'react';
import ab from '../images/ab.png';
import ab2 from '../images/ab2.png';


function About() {
  return (
    <div className='about'>
      <img src={ab} alt="About" />
      <div className="ab2">
        <img src={ab2} alt="About 2" />
      </div>
    </div>
  );
}

export default About;

