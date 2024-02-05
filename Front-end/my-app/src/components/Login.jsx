import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
      const [loginData, setLoginData] = useState({ email: '', password: '' });

      const handleLogin = async (event) => {
            event.preventDefault();
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
                  }

            } catch (error) {
                  console.error('Error during Login:', error);
            }
      };
      return (
            <form className='big-div'>
                  <label>
                        <p>Email</p>
                        <input className='lgoin-email-input' type="text" name="email" placeholder="Enter Email" />
                  </label>
                  <label>
                        <p>Password</p>
                        <input className='lgoin-pass-input' type="password" name="password" placeholder="*********" />
                  </label>
                  <button type='submit' className='login-button'  >Log In</button>
                  <button onClick={() => props.changeView('SignIn')} className='change-view-login'>Dont Have An Account? Sign In Here</button>
            </form>
      )
}

export default Login