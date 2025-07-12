import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/LandingPage.css";

const featuredItems = [
  {
    id: 1,
    name: "Graphic T-Shirt",
    image: "https://via.placeholder.com/250x180",
    category: "Everyday Wear",
    condition: "Like New",
  },
  {
    id: 2,
    name: "Leather Jacket",
    image: "https://via.placeholder.com/250x180",
    category: "Premium Wear",
    condition: "Gently Used",
  },
  {
    id: 3,
    name: "Wool Scarf",
    image: "https://via.placeholder.com/250x180",
    category: "Accessories",
    condition: "Like New",
  },
  {
    id: 4,
    name: "Denim Jeans",
    image: "https://via.placeholder.com/250x180",
    category: "Everyday Wear",
    condition: "Worn but Usable",
  },
  {
    id: 5,
    name: "Formal Blazer",
    image: "https://via.placeholder.com/250x180",
    category: "Premium Wear",
    condition: "Like New",
  },
  {
    id: 6,
    name: "Sun Hat",
    image: "https://via.placeholder.com/250x180",
    category: "Accessories",
    condition: "Like New",
  },
];

const LandingPage = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

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

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -270, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 270, behavior: "smooth" });
  };

  return (
    <div className="landing-container">
      <section className="hero-section">
        <h1>Welcome to Rewear</h1>
        <p>Swap, Save, and Style – A Sustainable Way to Refresh Your Wardrobe.</p>
        <div className="cta-buttons">
          <Link to="/my-listings" className="cta-btn primary">Start Swapping</Link>
          <Link to="/browse-items" className="cta-btn">Browse Items</Link>
          <Link to="/add-item" className="cta-btn">List an Item</Link>
        </div>
      </section>

      <section className="carousel-section">
        <h2>🌟 Featured Items</h2>
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={scrollLeft}>‹</button>
          <div className="carousel" ref={carouselRef}>
            {featuredItems.map((item) => (
              <div key={item.id} className="carousel-item">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>{item.category}</p>
                <p>{item.condition}</p>
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
          <button className="carousel-arrow right" onClick={scrollRight}>›</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
