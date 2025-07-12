import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import WishlistPage from "./pages/WishlistPage";
import OrderListPage from "./pages/OrderListPage";
import EditProfilePage from "./pages/EditProfilePage";
import ManageAddressPage from './pages/ManageAddressPage';
import PointsPage from "./pages/pointsPage";
import MyListingPage from "./pages/MyListingPage";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";
import ViewItemPage from "./pages/ViewItemPage";
import BrowseItemsPage from "./pages/BrowseItemsPage";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/manage-address" element={<ManageAddressPage />} />
        <Route path="/points" element={<PointsPage/>}/>
        <Route path="/my-listings" element={<MyListingPage />} />
        <Route path="/add-item" element={<AddItemPage />} />
        <Route path="/edit-listing/:id" element={<EditItemPage />} />
        <Route path="/listing/:id" element={<ViewItemPage />} />
        <Route path="/browse-items" element={<BrowseItemsPage />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
