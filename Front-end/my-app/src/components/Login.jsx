import React, { useState, useEffect } from 'react';
import './Login.css';
import Validation from './LoginValidation';
import Profile from './Profile.jsx'; // Import the Profile component
import axios from 'axios';

const Login = (props) => {
      const [loginData, setLoginData] = useState({ email: '', password: '' });
      const [errors, setErrors] = useState({});
      const [isLoggedIn, setLoggedIn] = useState(false);
      const [userData, setUserData] = useState([]); // Initialize userData as null
      const { changeView } = props;

      //
      useEffect(() => {
            // This will run whenever isLoggedIn changes
            console.log('isLoggedIn-from-login', isLoggedIn);

            // Additional actions to perform after isLoggedIn changes
            if (isLoggedIn && loginData.email) {
                  // Fetch user data after login
                  fetchUserData(loginData.email);
                  changeView('Home');
                  const storedIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
                  setLoggedIn(storedIsLoggedIn || false);
            }
      }, [isLoggedIn, loginData.email]); // Include loginData.email in the dependency array


      const handleInput = (e) => {
            setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const handleLogin = async (event) => {
            event.preventDefault();
            console.log('Log In button clicked');

            setErrors(Validation(loginData));

            try {
                  const response = await axios.post('http://localhost:8080/user/login', loginData, {
                        headers: {
                              'Content-Type': 'application/json',
                        },
                  });

                  const data = response.data;

                  if (data.token) {
                        localStorage.setItem('token', data.token);
                        console.log('Token:', data.token);
                        setLoggedIn(true);
                        localStorage.setItem("isLoggedIn", JSON.stringify(true)); // Set true directly
                        console.log('isLoggedIn:local-storage', true); // Log true directly
                  }
            } catch (error) {
                  console.error('Error during Login:', error);
            }
      };
      const fetchUserData = async (email) => {
            console.log('Fetching user data for email:', email); // Debug log
            try {
                  const response = await axios.get(`http://localhost:8080/user/${email}`, {
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': localStorage.getItem('token'), // Include the token in the headers
                        },
                  });

                  const userData = response.data;
                  setUserData(userData);
                  localStorage.setItem("user", JSON.stringify(userData));
                  console.log('userData:', userData);


            } catch (error) {
                  console.error('Error fetching user data:', error);
            }
      };
      console.log('userData-from-the-end-of-login', userData);
      // Render the Profile component and pass isLoggedIn as a prop
      return (
            <div className='log'>
                  {isLoggedIn ? (
                        <Profile isLoggedIn={isLoggedIn} userData={userData} />
                  ) : (
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
                              <button type='submit' className='login-button'>
                                    Log In
                              </button>
                              <button onClick={() => changeView('SignIn')} className='change-view-login'>
                                    Don't Have An Account? Sign In Here
                              </button>
                        </form>
                  )}
            </div>
      );
};

export default Login;
