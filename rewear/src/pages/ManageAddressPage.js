// src/pages/ManageAddressPage.js
import React, { useEffect, useState } from "react";
import "../pages/PageLayout.css";

const ManageAddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Replace with API call to fetch user's addresses
    setAddresses(["123 Marineford Road, Goa Kingdom"]);
  }, []);

  const handleAddOrUpdate = () => {
    if (!newAddress.trim()) return;

    const updated = [...addresses];
    if (editingIndex !== null) {
      updated[editingIndex] = newAddress;
    } else {
      updated.push(newAddress);
    }

    setAddresses(updated);
    setNewAddress("");
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setNewAddress(addresses[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    setNewAddress("");
    setEditingIndex(null);
  };

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>Manage Address</h2>

        <input
          className="input-field"
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />

        <button
          className="action-button"
          onClick={handleAddOrUpdate}
        >
          {editingIndex !== null ? "Update Address" : "Add Address"}
        </button>

        <ul className="address-list" style={{ marginTop: "20px" }}>
          {addresses.map((address, index) => (
            <li key={index} className="address-item">
              <div>{address}</div>
              <div style={{ marginTop: "8px" }}>
                <button
                  className="action-button edit"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageAddressPage;
