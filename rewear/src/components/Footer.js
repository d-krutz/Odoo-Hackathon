// src/components/Footer.js
import React from "react";
import "./Layout.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Rewear. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
