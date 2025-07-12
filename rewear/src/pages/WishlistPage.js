import React from "react";
import "../pages/PageLayout.css";

const WishlistPage = () => {
  const wishlistItems = ["T-Shirt - One Piece", "Poster - Naruto", "Hoodie - Luffy Gear 5"];

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>My Wishlist</h2>
        <ul>
          {wishlistItems.map((item, index) => (
            <li key={index}> {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishlistPage;
