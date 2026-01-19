import React, { useState } from "react";
import "./DashboardAdmin.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getALlOrders, getAllQueries, getAllUsers } from "../../services/adminAPI";

function DashboardAdmin() {

    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [pendingQueries, setPendingQueries] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("http://localhost:5173/login")
            return
        }
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await getALlOrders();
            setOrders(res.data.data)
        } catch (error) {
            alert("Error in fetching orders ")
        }
    }
    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data.data)
        } catch (error) {
            console.log("Error In fetching users ")
        }
    }
    const fetchPendingQueries = async () => {
        try {
            const res = await getAllQueries();
            setPendingQueries(res.data.pending)
            console.log(res)
        } catch (error) {
            console.log("Error in fetching data")
        }
    }

    useEffect(() => {
        fetchOrders()
        fetchUsers()
        fetchPendingQueries()
    }, [])
    return (
        <div className="dashboard-wrapper">
            <main className="dashboard-main">
                {/* HEADER */}
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome back, Admin 👋</p>
                </header>

                {/* STATS */}
                <section className="dashboard-stats">
                    <div className="dashboard-stat-card">
                        <h3>Total Orders</h3>
                        <p>{orders.length}</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <h3>Total Users</h3>
                        <p>{users.length}</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <h3>Total Revenue</h3>
                        <p>₹48,900</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <h3>Pending Queries</h3>
                        <p>{pendingQueries.length}</p>
                    </div>
                </section>

                {/* RECENT ORDERS */}
                <section className="dashboard-table-section">
                    <h2>Recent Orders</h2>

                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => (
                                    <tr>
                                        <td>#{order._id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.quantity}</td>
                                        <td>
                                            <span className="dashboard-status dashboard-success">
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default DashboardAdmin;
