import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserPage.css";

const UserPage = () => {
  const username = "Ayush Patel";
  const points = 120;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example logout logic: clear localStorage/session and redirect
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login"); // redirect to login page or homepage
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>{username}</h2>
          <p className="points">{points} Points</p>
        </div>

        <div className="dashboard-buttons-column">
          <Link to="/points" className="dashboard-tile"> View Points</Link>
          <Link to="/my-listings" className="dashboard-tile"> My Listings</Link>
          <Link to="/orders" className="dashboard-tile"> Order History</Link>
          <Link to="/edit-profile" className="dashboard-tile"> Edit Profile</Link>
          <Link to="/manage-address" className="dashboard-tile"> Manage Address</Link>
          <Link to="/wishlist" className="dashboard-tile"> Wishlist</Link>          
          <button className="dashboard-tile logout-tile" onClick={handleLogout}> Logout</button>
        </div>

      </div>
    </div>
  );
};

export default UserPage;
