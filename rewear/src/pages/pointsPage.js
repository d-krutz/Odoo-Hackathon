import React from "react";
import "../pages/PageLayout.css";

const PointsPage = () => {
  const username = "SarahK";
  const totalPoints = 45;

  const pointHistory = [
    { type: "gain", action: "Listed item: Blue Jacket", points: 5 },
    { type: "gain", action: "Item redeemed by another user", points: 20 },
    { type: "spend", action: "Redeemed: Green T-shirt", points: -20 },
  ];

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>Points Dashboard</h2>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>👤 Username: {username}</p>
        <div style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
          🏅 Points Balance: {totalPoints} Points
        </div>

        <h4 style={{ marginBottom: "10px" }}>📄 Recent Activity</h4>
        <ul>
          {pointHistory.map((entry, idx) => (
            <li key={idx}>
              {entry.points > 0 ? "➕" : "➖"} {entry.action} —{" "}
              <strong>{entry.points > 0 ? "+" : ""}{entry.points}</strong>
            </li>
          ))}
        </ul>

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
