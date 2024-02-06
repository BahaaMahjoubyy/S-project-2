import React, { useEffect, useState } from 'react';

const Profile = ({ userId }) => {
      const [profileData, setProfileData] = useState(null);

      useEffect(() => {
            const fetchUserProfile = async () => {
                  try {
                        // Fetch user profile based on the provided userId
                        const response = await fetch(`http://localhost:8080/user/${userId}`, {
                              method: 'GET',
                              headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                              },
                        });

                        if (response.ok) {
                              const userProfile = await response.json();
                              setProfileData(userProfile);
                        } else {
                              // Handle error cases
                              console.error('Error fetching user profile:', response.statusText);
                        }
                  } catch (error) {
                        console.error('Error during profile fetch:', error);
                  }
            };

            fetchUserProfile();
      }, [userId]);

      return (
            <div>
                  <h2>User Profile</h2>
                  {profileData ? (
                        <>
                              <p>Username: {profileData.username}</p>
                              <p>Email: {profileData.email}</p>
                        </>
                  ) : (
                        <p>Loading profile...</p>
                  )}
            </div>
      );
};

export default Profile;
