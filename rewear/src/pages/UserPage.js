// src/pages/UserPage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserPage.css";

const UserPage = () => {
  const [username, setUsername] = useState("Loading...");
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUsername(data.name);
          setPoints(data.points || 0);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
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
