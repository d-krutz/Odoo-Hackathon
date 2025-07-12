// src/pages/WishlistPage.js
import React, { useEffect, useState } from "react";
import "../pages/PageLayout.css";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // 🔁 Load from localStorage
  const getWishlist = () => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  };

  // 💾 Save to localStorage
  const saveWishlist = (items) => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  };

  // ❌ Remove item
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    saveWishlist(updated);
  };

  // 🛒 Navigate to item page
  const handleBuyNow = (item) => {
    navigate(`/listing/${item.id}`, { state: { item } });
  };

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>💖 My Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul className="wishlist-grid">
            {wishlist.map((item) => (
              <li key={item.id} className="wishlist-item">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>
                  <p>Condition: {item.condition}</p>

                  <div className="wishlist-actions">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="buy-btn"
                    >
                      View Item
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
