import React from 'react'
import "./Signin.css"
const SignIn = (props) => {
  return (
    <form className='signin-container' >
      <label>
        <p>Username</p>
        <input className='signin-name-input' type="text" name="username" placeholder="Enter username" />
        {/* <span>{errors.username && <span>{errors.username}</span>}</span> */}
      </label>
      <label>
        <p>Email</p>
        <input className='signin-email-input' type="text" name="email" placeholder="Enter Email" />
        {/* <span>{errors.email && <span>{errors.email}</span>}</span> */}
      </label>
      <label>
        <p>Password</p>
        <input className='signin-pass-input' type="password" name="password" placeholder="*********" />
        {/* <span>{errors.password && <span>{errors.password}</span>}</span> */}
      </label>
      <button type='submit' className='signin'  >Sign In</button>
      <button onClick={() => props.changeView('Login')} className='change-view-signin'>Have An Account? Log In</button>
    </form>
  )
}

export default SignIn