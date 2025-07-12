import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/MyListingPage.css";

const MyListingPage = () => {
  const [listings, setListings] = useState([]);

  // Simulated fetch — replace with real API call
  useEffect(() => {
    const dummyListings = [
      {
        id: "1",
        name: "Blue Denim Jacket",
        image: "https://via.placeholder.com/150",
        category: "Premium Wear",
        status: "Active",
      },
      {
        id: "2",
        name: "White T-Shirt",
        image: "https://via.placeholder.com/150",
        category: "Everyday Wear",
        status: "Swapped",
      },
    ];
    setListings(dummyListings);
  }, []);

  const handleDelete = (id) => {
    // Simulate delete action
    setListings(listings.filter((item) => item.id !== id));
  };

  return (
    <div className="listings-page-container">
      <div className="listings-card">
        <h2>📸 My Listings</h2>
        {listings.length === 0 ? (
          <p className="empty-msg">You haven’t listed any items yet.</p>
        ) : (
          <div className="listing-grid">
            {listings.map((item) => (
              <div key={item.id} className="listing-item">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p className="category">{item.category}</p>
                <p className="status">
                  Status: <strong>{item.status}</strong>
                </p>
                <div className="listing-actions">
                  <Link to={`/edit-listing/${item.id}`} className="edit-btn">✏️ Edit</Link>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingPage;
