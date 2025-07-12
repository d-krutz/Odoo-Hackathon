// src/pages/MyListingPage.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/MyListingPage.css";

const MyListingPage = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in first.");

      try {
        const res = await fetch("http://localhost:5000/api/items/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setListings(data);
        } else {
          console.error("❌ Failed to load items");
          alert("Failed to load your listings");
        }
      } catch (err) {
        console.error("❌ Network error:", err);
        alert("Network error");
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setListings((prev) => prev.filter((item) => item._id !== id));
        alert("✅ Listing deleted.");
      } else {
        const data = await res.json();
        alert("❌ Delete failed: " + (data.message || data.error));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error");
    }
  };

  return (
    <div className="listings-page-container">
      <div className="listings-card">
        <div className="listings-header">
          <h2>📸 My Listings</h2>
          <Link to="/add-item" className="add-item-button">+ Add New Item</Link>
        </div>

        {listings.length === 0 ? (
          <p className="empty-msg">You haven’t listed any items yet.</p>
        ) : (
          <div className="listing-grid">
            {listings.map((item) => (
              <div key={item._id} className="listing-item">
                <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} />
                <h4>{item.name}</h4>
                <p className="category">{item.category}</p>
                <p className="status">Status: <strong>{item.isSwapped ? "Swapped" : "Active"}</strong></p>

                <div className="listing-actions">
                  <button className="edit-btn" onClick={() => navigate(`/edit-listing/${item._id}`)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
                </div>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/listing/${item._id}`, { state: { item } })}
                >
                  🔍 View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingPage;
