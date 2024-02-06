import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import "./Signin.css";
import validation from './SinginValidation';

const SignIn = (props) => {
  const [errors, seterrors] = useState({})
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    seterrors(validation(userData))
    try {
      const response = await axios.post('http://localhost:8080/user/add', userData, {
        headers: {
          'Content-Type': 'application/json',
          // remove the token from the autho header for signin
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = response.data;

      if (response.status === 200) {
        if (data.token) {
          // If the sign-in is successful, save the token to localStorage
          localStorage.setItem('token', data.token);
        }
      } else {
        console.error('Error during Sign In:', data.message);
      }
    } catch (error) {
      console.error('Error during Sign In:', error);
    }
  };

  return (
    <form className='signin-container' onSubmit={handleSignIn}>
      <label>
        <p>Username</p>
        <input
          className='signin-name-input'
          type="text"
          name="username"
          placeholder="Enter username"
          value={userData.username}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <p>Email</p>
        <input
          className='signin-email-input'
          type="text"
          name="email"
          placeholder="Enter Email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <p>Password</p>
        <input
          className='signin-pass-input'
          type="password"
          name="password"
          placeholder="*********"
          value={userData.password}
          onChange={handleInputChange}
        />
      </label>
      <button type='submit' className='signin'>Sign In</button>
      <button onClick={() => props.changeView('Login')} className='change-view-signin'>Have An Account? Log In</button>
    </form>
  )
}

export default SignIn;
