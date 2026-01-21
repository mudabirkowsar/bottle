import React, { useEffect, useState } from "react";
import "./UserOrders.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { getUserOrders } from "../../services/userAPI";

function UserOrders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await getUserOrders();
            setOrders(res.data.orders);
        } catch (error) {
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Navbar />

            {/* Header */}
            <div className="order-header">
                <h1>My Orders</h1>
                <p>View details of all orders you have placed</p>
            </div>

            {/* Orders Section */}
            <div className="order-container">
                <div className="order-form orders-wrapper">
                    {orders.length === 0 && (
                        <p style={{ textAlign: "center" }}>No orders found</p>
                    )}

                    {[...orders].reverse().map((order) => (
                        <div className="order-card" key={order._id}>
                            {/* Header */}
                            <div className="order-card-header">
                                <div>
                                    <h3>Order ID</h3>
                                    <span className="order-id">{order._id}</span>
                                </div>

                                <span
                                    className={`order-status ${order.status}`}
                                >
                                    {order.status.replace("_", " ")}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="order-details">
                                <p><strong>Name:</strong> {order.name}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                                <p><strong>Email:</strong> {order.email}</p>
                                <p><strong>Address:</strong> {order.address}</p>

                                <div className="order-meta">
                                    <span><strong>Size:</strong> {order.size}</span>
                                    <span><strong>Quantity:</strong> {order.quantity}</span>
                                </div>

                                {order.note && (
                                    <p className="order-note">
                                        <strong>Note:</strong> {order.note}
                                    </p>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="order-card-footer">
                                <span className="order-date">
                                    Ordered on:{" "}
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default UserOrders;
