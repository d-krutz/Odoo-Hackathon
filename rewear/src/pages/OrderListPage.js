import React from "react";
import "../pages/PageLayout.css";

const OrderListPage = () => {
  const orders = [
    { id: 1, product: "Straw Hat Hoodie", status: "Delivered" },
    { id: 2, product: "One Piece Poster", status: "Shipped" },
    { id: 3, product: "Luffy Gear 5 T-shirt", status: "Processing" },
  ];

  return (
    <div className="page-container">
      <div className="page-card">
        <h2>Order History</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
               {order.product} — <strong>{order.status}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderListPage;
