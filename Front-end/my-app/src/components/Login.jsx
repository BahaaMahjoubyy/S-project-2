import React from 'react'
import './Login.css'
const Login = () => {
      return (
            <form className='big-div'>
                  <label>
                        <p>Email</p>
                        <input type="text" name="email" placeholder="Enter Email" />
                  </label>
                  <label>
                        <p>Password</p>
                        <input type="password" name="password" placeholder="*********" />
                  </label>
                  <button type='submit' className='login-button'  >Log In</button>
                  <button className='change-view-login'>Dont Have An Account? Sign In Here</button>
            </form>
      )
}

export default Login