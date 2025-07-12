// src/pages/OrderListPage.js
import React, { useEffect, useState } from "react";
import "../pages/PageLayout.css";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in to view your orders.");

      try {
        const res = await fetch("http://localhost:5000/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          alert("❌ Failed to fetch orders.");
        }
      } catch (err) {
        console.error("❌ Network error:", err);
        alert("Network error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>🛒 Order History</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                {order.product} — <strong>{order.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;
