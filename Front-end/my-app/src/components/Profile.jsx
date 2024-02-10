import React from 'react';
import '../css/profile.css'


const Profile = ({ isLoggedIn, userData }) => {
  console.log('isLoggedIn-from-profile:', isLoggedIn);
  console.log('userData-from-profile:', userData);

  if (!localStorage.user) {
    return <div>Loading...</div>;
  }

  const currentUser = JSON.parse(localStorage.user);

  return (
    <div>
      <br></br>
      <br></br>

      <section className="custom-section">
        <div className="custom-container py-5">
          <div className="custom-row justify-content-center align-items-center">
            <div className="custom-col-lg-6 mb-4 mb-lg-0">
              <div className="custom-card mb-3" style={{ borderRadius: '.5rem' }}>
                <div className="custom-row g-0">
                  <div className="custom-col-md-4 custom-text-center custom-text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <img src={currentUser.IMAGE}
                      alt="Avatar" className="my-5 custom-avatar" />
                    <h5 className="custom-username">{currentUser.username}</h5>
                    <p className="custom-role">Web Developer</p>
                    <i className="far fa-edit mb-5 custom-edit-icon"></i>
                  </div>
                  <div className="custom-col-md-8">
                    <div className="custom-card-body p-4">
                      <h6 className="custom-heading">Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="custom-row pt-1">
                        <div className="custom-col-6 mb-3">
                          <h6 className="custom-subheading">Email: {currentUser.email}</h6>
                        </div>
                      </div>

                      <h6 className="custom-subheading">Developer community</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="d-flex justify-content-start">
                        <a href="#!" className="me-3"><i className="fab fa-facebook fa-lg"></i></a>
                        <a href="#!" className="me-3"><i className="fab fa-twitter fa-lg"></i></a>
                        <a href="#!" className="me-3"><i className="fab fa-instagram fa-lg"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;


