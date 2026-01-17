import React, { useState } from "react";
import "./Orders.css";
import { useEffect } from "react";
import { getALlOrders, updateOrderStatus } from "../../services/adminAPI";
import axios from 'axios';

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    alert("Login first")
                    return
                }
                const res = await getALlOrders();
                setOrders(res.data.data)
            } catch (error) {
                console.log("Something went wrong")
            }
        }
        fetchAllOrders()
    }, [])

    const updateStatus = async (id, newStatus) => {
        setOrders(prev =>
            prev.map(order =>
                order._id === id
                    ? { ...order, status: newStatus }
                    : order
            )
        );

        const res = await updateOrderStatus(id, newStatus);
    };

    const getStatusLabel = (status) => {
        if (status === "not_viewed") return "Not Viewed";
        if (status === "viewed") return "Viewed";
        if (status === "delivered") return "Delivered";
    };

    return (
        <div className="admin-wrapper">
            <main className="admin-main">
                <header className="page-header">
                    <h1>Orders</h1>
                    <p>Manage customer order status</p>
                </header>

                <section className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                {/* <th>Order ID</th> */}
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Size</th>
                                <th>Qty</th>
                                <th>Address</th>
                                <th>Note</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    {/* <td>#{order._id}</td> */}
                                    <td>{order.name}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.size}</td>
                                    <td>{order.quantity}</td>
                                    <td className="address-cell">{order.address}</td>
                                    <td className="note-cell">{order.note}</td>

                                    <td>
                                        <span className={`status-badge ${order.status}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>

                                    <td className="action-buttons">
                                        {order.status === "not_viewed" && (
                                            <button
                                                className="view-btn"
                                                onClick={() => updateStatus(order._id, "viewed")}
                                            >
                                                Mark Viewed
                                            </button>
                                        )}

                                        {order.status === "viewed" && (
                                            <button
                                                className="deliver-btn"
                                                onClick={() => updateStatus(order._id, "delivered")}
                                            >
                                                Mark Delivered
                                            </button>
                                        )}

                                        {order.status === "delivered" && (
                                            <span className="done-text">Completed</span>
                                        )}
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
