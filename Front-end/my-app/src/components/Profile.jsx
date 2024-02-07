import React from 'react';

const Profile = (props) => {
      console.log('isLoggedIn in Profile.jsx:', props.isLoggedIn);
      return <div>{props.isLoggedIn ? 'Welcome to your profile!' : 'Not logged in.'}</div>;
};

export default Profile;