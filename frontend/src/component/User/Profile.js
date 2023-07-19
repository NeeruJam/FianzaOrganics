import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if (isAuthenticated === false) {
       navigate("/login");
      }
    }, [isAuthenticated]);
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Helmet>
        <title>{`${user.name}'s Profile`}</title>
        <meta name="description" content="Description for Home Page"/>
      </Helmet>
            <div className="profileContainer">
              <div className="profile">
                <h1>My Profile</h1>
                <img src={"/Profile.png"} alt={user.name} />
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
  
                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default Profile;
