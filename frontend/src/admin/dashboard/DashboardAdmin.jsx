import React from "react";
import NavbarAdmin from "../NavbarAdmin";
import "./DashboardAdmin.css";

function DashboardAdmin() {
    return (
        <div className="admin-wrapper">
            {/* SIDEBAR IS ALREADY INSIDE NavbarAdmin */}
            <NavbarAdmin />

            {/* MAIN CONTENT */}
            <main className="admin-main">
                {/* HEADER */}
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome back, Admin 👋</p>
                </header>

                {/* STATS */}
                <section className="stats">
                    <div className="stat-card">
                        <h3>Total Orders</h3>
                        <p>124</p>
                    </div>

                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p>58</p>
                    </div>

                    <div className="stat-card">
                        <h3>Total Revenue</h3>
                        <p>₹48,900</p>
                    </div>

                    <div className="stat-card">
                        <h3>Pending Queries</h3>
                        <p>6</p>
                    </div>
                </section>

                {/* RECENT ORDERS */}
                <section className="table-section">
                    <h2>Recent Orders</h2>

                    <table>
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
                                <td className="status success">Delivered</td>
                            </tr>
                            <tr>
                                <td>#AP1022</td>
                                <td>Ayesha Khan</td>
                                <td>₹300</td>
                                <td className="status pending">Pending</td>
                            </tr>
                            <tr>
                                <td>#AP1023</td>
                                <td>Mohit Verma</td>
                                <td>₹600</td>
                                <td className="status cancel">Cancelled</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default DashboardAdmin;
