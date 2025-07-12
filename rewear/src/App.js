import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import WishlistPage from "./pages/WishlistPage";
import OrderListPage from "./pages/OrderListPage";
import EditProfilePage from "./pages/EditProfilePage";
import ManageAddressPage from "./pages/ManageAddressPage";
import PointsPage from "./pages/pointsPage";
import MyListingPage from "./pages/MyListingPage";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";
import ViewItemPage from "./pages/ViewItemPage";
import BrowseItemsPage from "./pages/BrowseItemsPage";
import LoginPage from "./pages/LoginPage";        // ✅ added
import SignupPage from "./pages/SignupPage";      // ✅ added

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Routes wrapped in layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/orders" element={<OrderListPage />} />
                <Route path="/edit-profile" element={<EditProfilePage />} />
                <Route path="/manage-address" element={<ManageAddressPage />} />
                <Route path="/points" element={<PointsPage />} />
                <Route path="/my-listings" element={<MyListingPage />} />
                <Route path="/add-item" element={<AddItemPage />} />
                <Route path="/edit-listing/:id" element={<EditItemPage />} />
                <Route path="/listing/:id" element={<ViewItemPage />} />
                <Route path="/browse-items" element={<BrowseItemsPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
