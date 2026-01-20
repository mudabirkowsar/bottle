import React, { useEffect, useState } from "react";
import "./Orders.css";
import { getALlOrders, updateOrderStatus } from "../../services/adminAPI";

function Orders() {
    const [orders, setOrders] = useState([]);

    /* MODAL STATES */
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeliverModal, setShowDeliverModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    /* LOADING STATE */
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await getALlOrders();
                setOrders(res.data.data);
            } catch (error) {
                console.log("Something went wrong");
            }
        };
        fetchAllOrders();
    }, []);

    /* CONFIRM VIEW */
    const confirmViewed = async () => {
        try {
            setIsSending(true);

            await updateOrderStatus(selectedOrder._id, "viewed");

            setOrders(prev =>
                prev.map(o =>
                    o._id === selectedOrder._id
                        ? { ...o, status: "viewed" }
                        : o
                )
            );
        } catch (err) {
            console.error(err);
        } finally {
            setIsSending(false);
            setShowViewModal(false);
            setSelectedOrder(null);
        }
    };

    /* CONFIRM DELIVERY */
    const confirmDelivered = async () => {
        try {
            setIsSending(true);

            await updateOrderStatus(selectedOrder._id, "delivered");

            setOrders(prev =>
                prev.map(o =>
                    o._id === selectedOrder._id
                        ? { ...o, status: "delivered" }
                        : o
                )
            );
        } catch (err) {
            console.error(err);
        } finally {
            setIsSending(false);
            setShowDeliverModal(false);
            setSelectedOrder(null);
        }
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
                            {[...orders].reverse().map(order => (
                                <tr key={order._id}>
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
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowViewModal(true);
                                                }}
                                            >
                                                Mark Viewed
                                            </button>
                                        )}

                                        {order.status === "viewed" && (
                                            <button
                                                className="deliver-btn"
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowDeliverModal(true);
                                                }}
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

            {/* VIEW MODAL */}
            {showViewModal && (
                <div className="order-backdrop">
                    <div className="order-modal">
                        <h2>Send Email & Mark Viewed</h2>
                        <p>Email will be sent to:</p>
                        <strong>{selectedOrder?.email}</strong>

                        <div className="order-modal-actions">
                            <button
                                className="order-cancel-btn"
                                onClick={() => setShowViewModal(false)}
                                disabled={isSending}
                            >
                                Cancel
                            </button>

                            <button
                                className="order-confirm-btn"
                                onClick={confirmViewed}
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <>
                                        <span className="btn-spinner" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Email"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELIVERY MODAL */}
            {showDeliverModal && (
                <div className="order-backdrop">
                    <div className="order-modal">
                        <h2>Send Email & Mark Delivered</h2>
                        <p>Email will be sent to:</p>
                        <strong>{selectedOrder?.email}</strong>

                        <div className="order-modal-actions">
                            <button
                                className="order-cancel-btn"
                                onClick={() => setShowDeliverModal(false)}
                                disabled={isSending}
                            >
                                Cancel
                            </button>

                            <button
                                className="order-confirm-btn delivered"
                                onClick={confirmDelivered}
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <>
                                        <span className="btn-spinner" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Email"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders;
