
import React from 'react';
import '../css/footer.css'; 

function Footer() {
    return (
      
      <footer className="footer-container">
          <hr />
        <div className="footer-content">
          <div className="footer-section">
            <h3>About HackNest</h3>
            <div className='a'>
            <p>Welcome to Developpers Family , the ultimate destination for developers seeking a dynamic learning experience. Dive into meticulously curated courses covering React.js, JavaScript, Python, Node.js, and more.</p>
            </div>
          </div>
          <div className="footer-section">
          <div className='con'>
            <h3>Contact Us</h3>
            <p>
              Email: <a href="mailto:jessergafsi2@gmail.com">info@HackNest.com</a><br />
              Phone: +16 29 263 839 
            </p>
          </div>
        </div>
          <div className="footer-section">
            <h3>Connect with Us</h3>
            <div className="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HackNest. All rights reserved.</p>
        </div>
      </footer>
    );
  }

export default Footer;
