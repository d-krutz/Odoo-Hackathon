// src/pages/EditProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/PageLayout.css";

const EditProfilePage = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch current user details
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsername(data.name);
          setLoading(false);
        } else {
          alert("Failed to load profile");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Network error");
        navigate("/");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: username }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Profile updated!");
        navigate("/");
      } else {
        alert("❌ Failed to update: " + (data.message || data.error));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error");
    }
  };

  if (loading) return <p className="page-container">Loading profile...</p>;

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>Edit Profile</h2>
        <input
          type="text"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="action-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
