import React, { useState } from 'react';
import "./Signin.css";

const SignIn = (props) => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token here
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } else {
        // Handle error response
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
