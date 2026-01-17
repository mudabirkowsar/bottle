import React, { useState } from "react";
import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([
        {
            _id: "AP1021",
            name: "Rahul Sharma",
            phone: "9876543210",
            email: "rahul@gmail.com",
            size: "500ml",
            quantity: "200",
            address: "Delhi, India",
            note: "Deliver in morning",
            viewStatus: "not_viewed",
        },
        {
            _id: "AP1022",
            name: "Ayesha Khan",
            phone: "9876501234",
            email: "ayesha@gmail.com",
            size: "1L",
            quantity: "150",
            address: "Mumbai, India",
            note: "Call before delivery",
            viewStatus: "viewed",
        },
        {
            _id: "AP1023",
            name: "Mohit Verma",
            phone: "9123456789",
            email: "mohit@gmail.com",
            size: "20L",
            quantity: "50",
            address: "Pune, India",
            note: "Office delivery",
            viewStatus: "not_viewed",
        },
    ]);

    // MARK ORDER AS VIEWED
    const markAsViewed = (id) => {
        setOrders(prev =>
            prev.map(order =>
                order._id === id
                    ? { ...order, viewStatus: "viewed" }
                    : order
            )
        );

        // 👉 Later API call
        // axios.put(`/api/orders/${id}/viewed`)
    };

    return (
        <div className="admin-wrapper">
            <main className="admin-main">
                <header className="page-header">
                    <h1>Orders</h1>
                    <p>Manage customer order visibility</p>
                </header>

                <section className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Size</th>
                                <th>Qty</th>
                                <th>Address</th>
                                <th>Note</th>
                                <th>View Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>#{order._id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.size}</td>
                                    <td>{order.quantity}</td>
                                    <td className="address-cell">{order.address}</td>
                                    <td className="note-cell">{order.note}</td>

                                    <td>
                                        <span className={`view-status ${order.viewStatus}`}>
                                            {order.viewStatus === "viewed"
                                                ? "Viewed"
                                                : "Not Viewed"}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            className="view-btn"
                                            disabled={order.viewStatus === "viewed"}
                                            onClick={() => markAsViewed(order._id)}
                                        >
                                            {order.viewStatus === "viewed"
                                                ? "Viewed"
                                                : "Mark as Viewed"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default Orders;
