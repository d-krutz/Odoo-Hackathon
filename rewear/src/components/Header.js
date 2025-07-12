// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-logo">
        <Link to="/">Rewear</Link>
      </div>
      <nav className="header-nav">
        
        <Link to="/my-listings">My Listings</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/user">My Account</Link>
      </nav>
    </header>
  );
};

export default Header;
