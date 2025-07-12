import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/BrowseItemsPage.css";

const BrowseItemsPage = () => {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        name: "Vintage Denim Jacket",
        image: "https://via.placeholder.com/300x200",
        category: "Premium Wear",
        condition: "Gently Used",
      },
      {
        id: 2,
        name: "Graphic T-Shirt",
        image: "https://via.placeholder.com/300x200",
        category: "Everyday Wear",
        condition: "Like New",
      },
      {
        id: 3,
        name: "Woolen Scarf",
        image: "https://via.placeholder.com/300x200",
        category: "Accessories",
        condition: "Like New",
      },
    ];
    setItems(dummyData);
  }, []);

  const toggleWishlist = (item) => {
    const exists = wishlist.find((w) => w.id === item.id);
    let updated;
    if (exists) {
      updated = wishlist.filter((w) => w.id !== item.id);
    } else {
      updated = [...wishlist, item];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="browse-container">
      <h2>🛍️ Browse Items</h2>
      <div className="browse-grid">
        {items.map((item) => (
          <div key={item.id} className="browse-card">
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>{item.category}</p>
            <p>Condition: {item.condition}</p>
            <button
              className="wishlist-btn"
              onClick={() => toggleWishlist(item)}
            >
              {isWishlisted(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
            <button
              className="buy-btn"
              onClick={() => navigate(`/listing/${item.id}`, { state: { item } })}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseItemsPage;
