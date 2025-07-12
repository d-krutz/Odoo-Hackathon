import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/PageLayout.css";

const EditProfilePage = () => {
  const [username, setUsername] = useState("Ayush Patel");
  const navigate = useNavigate();

  const handleSave = () => {
    alert(`Profile updated: ${username}`);
    navigate("/");
  };

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
