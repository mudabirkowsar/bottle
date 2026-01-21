import React from "react";
import "./UserOrders.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

function UserOrders() {
  const orders = [
    {
      id: "ORD-10234",
      date: "12 Jan 2026",
      status: "Delivered",
      total: "₹1,299",
      items: ["20L Water Can x2", "1L Bottle Pack x1"],
    },
    {
      id: "ORD-10218",
      date: "05 Jan 2026",
      status: "Pending",
      total: "₹799",
      items: ["20L Water Can x1"],
    },
    {
      id: "ORD-10192",
      date: "28 Dec 2025",
      status: "Cancelled",
      total: "₹499",
      items: ["1L Bottle Pack x1"],
    },
  ];

  return (
    <>
    <Navbar/>
      {/* Header */}
      <div className="order-header">
        <h1>My Orders</h1>
        <p>Track and manage all your placed orders</p>
      </div>

      {/* Orders Section */}
      <div className="order-container">
        <div className="order-form orders-wrapper">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <h3>{order.id}</h3>
                  <span className="order-date">{order.date}</span>
                </div>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <p key={index}>• {item}</p>
                ))}
              </div>

              <div className="order-card-footer">
                <strong>Total: {order.total}</strong>
                <button className="order-btnn small">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default UserOrders;
