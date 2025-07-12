// src/pages/ViewItemPage.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../pages/ViewItemPage.css";

const ViewItemPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // for optional /listing/:id route
  const [item, setItem] = useState(state?.item || null);
  const [loading, setLoading] = useState(!state?.item);

  useEffect(() => {
    if (!item && id) {
      // Fetch item by ID if not passed through navigation state
      const fetchItem = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/items/${id}`);
          const data = await res.json();
          if (res.ok) {
            setItem(data);
          } else {
            setItem(null);
          }
        } catch (err) {
          console.error("❌ Error fetching item:", err);
          setItem(null);
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [id, item]);

  if (loading) return <p className="view-item-container">Loading item...</p>;
  if (!item) return <p className="view-item-container">❌ Item not found.</p>;

  return (
    <div className="view-item-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      <div className="view-item-card">
        <img
          src={item.image || "https://via.placeholder.com/150"}
          alt={item.name}
        />
        <h2>{item.name}</h2>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Condition:</strong> {item.condition}</p>
        <p><strong>Status:</strong> {item.isSwapped ? "Swapped" : "Available"}</p>
        <p><strong>Tags:</strong> {item.tags}</p>
      </div>
    </div>
  );
};

export default ViewItemPage;
