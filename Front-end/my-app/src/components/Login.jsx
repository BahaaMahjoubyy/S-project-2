import React, { useState } from 'react';
import './Login.css';
import Validation from "./LoginValidation.js"

const Login = (props) => {
      const [loginData, setLoginData] = useState({ email: '', password: '' });
      const [errors, setErrors] = useState({});
      const [isLoggedIn, setLoggedIn] = useState(false);
      const handleInput = (e) => {
            setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      }

      const handleLogin = async (event) => {
            event.preventDefault();

            // Call the validation function and set the errors
            setErrors(Validation(loginData));

            try {
                  const response = await fetch('http://localhost:8080/user/login', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loginData),
                  });

                  const data = await response.json();

                  if (data.token) {
                        localStorage.setItem('token', data.token);
                        setLoggedIn(true); // Update the login status
                  }

            } catch (error) {
                  console.error('Error during Login:', error);
            }
      };

      // Render Home component if logged in
      if (isLoggedIn) {
            return props.changeView('CodesNews')
      }

      return (
            <form className='big-div' onSubmit={handleLogin}>
                  <label>
                        <p>Email</p>
                        <input
                              className='lgoin-email-input'
                              type="text"
                              name="email"
                              placeholder="Enter Email"
                              onChange={handleInput}
                        />
                        <span>{errors.email && <span>{errors.email}</span>}</span>
                  </label>
                  <label>
                        <p>Password</p>
                        <input
                              className='lgoin-pass-input'
                              type="password"
                              name="password"
                              placeholder="*********"
                              onChange={handleInput}
                        />
                        <span>{errors.password && <span>{errors.password}</span>}</span>
                  </label>
                  <button type='submit' className='login-button'>Log In</button>
                  <button onClick={() => props.changeView('SignIn')} className='change-view-login'>Don't Have An Account? Sign In Here</button>
            </form>
      )
}

export default Login;
