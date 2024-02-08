import React from 'react';

const Profile = ({ isLoggedIn, userData }) => {

      
      // const currentUser=JSON.parse(localStorage.user)
  console.log('isLoggedIn:', isLoggedIn);
  console.log('userData:', userData);
//   console.log('userData2:', currentUser);

//   if (!isLoggedIn || userData === null) {
//     return <div>Loading...</div>;
//   }
if (!localStorage.user) {
      return <div>Loading...</div>;
    }
    const currentUser=JSON.parse(localStorage.user)
  return currentUser&&(
    <div>
      <h2>User Profile</h2>
      <br />
      <br />
      
      <p>Email: {currentUser.email}</p>
      <p>Username: {currentUser.username}</p>
      {/* Add other user information as needed */}
    </div>
  );
};

export default Profile;

