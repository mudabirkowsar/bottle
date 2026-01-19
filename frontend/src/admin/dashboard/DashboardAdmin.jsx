import React from "react";
import "./DashboardAdmin.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardAdmin() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token){

            navigate("http://localhost:5173/login")
            return
        }
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
                        <p>124</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <h3>Total Users</h3>
                        <p>58</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <h3>Total Revenue</h3>
                        <p>₹48,900</p>
                    </div>

                    <div className="dashboard-stat-card">
                        <h3>Pending Queries</h3>
                        <p>6</p>
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
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#AP1021</td>
                                <td>Rahul Sharma</td>
                                <td>₹450</td>
                                <td>
                                    <span className="dashboard-status dashboard-success">
                                        Delivered
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>#AP1022</td>
                                <td>Ayesha Khan</td>
                                <td>₹300</td>
                                <td>
                                    <span className="dashboard-status dashboard-pending">
                                        Pending
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>#AP1023</td>
                                <td>Mohit Verma</td>
                                <td>₹600</td>
                                <td>
                                    <span className="dashboard-status dashboard-cancel">
                                        Cancelled
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default DashboardAdmin;
