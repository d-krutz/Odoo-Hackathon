// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserPage from "./pages/UserPage";
import WishlistPage from "./pages/WishlistPage";
import OrderListPage from "./pages/OrderListPage";
import EditProfilePage from "./pages/EditProfilePage";
import ManageAddressPage from './pages/ManageAddressPage';
import PointsPage from "./pages/pointsPage";
import MyListingPage from "./pages/MyListingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/manage-address" element={<ManageAddressPage />} />
        <Route path="/points" element={<PointsPage/>}/>
        <Route path="/my-listings" element={<MyListingPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
