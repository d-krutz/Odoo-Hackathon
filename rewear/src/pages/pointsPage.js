// src/pages/PointsPage.js
import React, { useEffect, useState } from "react";
import "../pages/PageLayout.css";

const PointsPage = () => {
  const [username, setUsername] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please log in to view your points.");

      try {
        const res = await fetch("http://localhost:5000/api/users/me/points", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsername(data.name);
          setTotalPoints(data.points);
          setPointHistory(data.history); // Assuming backend returns `history` array
        } else {
          alert("Failed to load points");
        }
      } catch (err) {
        console.error("Error loading points:", err);
        alert("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>Points Dashboard</h2>

        {loading ? (
          <p>Loading points...</p>
        ) : (
          <>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>👤 Username: {username}</p>
            <div style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
              🏅 Points Balance: {totalPoints} Points
            </div>

            <h4 style={{ marginBottom: "10px" }}>📄 Recent Activity</h4>
            <ul>
              {pointHistory.length > 0 ? (
                pointHistory.map((entry, idx) => (
                  <li key={idx}>
                    {entry.points > 0 ? "➕" : "➖"} {entry.action} —{" "}
                    <strong>{entry.points > 0 ? "+" : ""}{entry.points}</strong>
                  </li>
                ))
              ) : (
                <li>No point transactions yet.</li>
              )}
            </ul>
          </>
        )}

        <hr style={{ margin: "30px 0" }} />

        <h4>🔄 How You Earn Points</h4>
        <ul>
          <li>🧥 <strong>List an Item</strong>: +5 points</li>
          <li>🤝 <strong>Item Swapped</strong>: +15 points</li>
          <li>📦 <strong>Item Redeemed by Another User</strong>: +20 points</li>
          <li>🌟 <strong>High-Quality Listing Bonus</strong>: +5 points</li>
        </ul>

        <h4 style={{ marginTop: "20px" }}>🛍️ Redeeming Items</h4>
        <ul>
          <li>🧢 Tier 1 – Accessories / Light Wear: <strong>10 points</strong></li>
          <li>👕 Tier 2 – Everyday Wear: <strong>20 points</strong></li>
          <li>🧥 Tier 3 – Premium Wear: <strong>30 points</strong></li>
        </ul>

        <h4 style={{ marginTop: "20px" }}>📊 Point Calculation (admin)</h4>
        <p style={{ fontSize: "14px", color: "#777" }}>
          <code>
            points = basePoints × conditionModifier + (highQuality ? 5 : 0)
          </code>
        </p>
        <ul style={{ fontSize: "14px", color: "#555" }}>
          <li>Base Points: Accessories (10), Everyday Wear (20), Premium (30)</li>
          <li>Condition: Like New (1.0), Gently Used (0.9), Worn (0.7)</li>
        </ul>
      </div>
    </div>
  );
};

export default PointsPage;
