import React from "react";
import './NavbarAdmin.css';

function Dashboard() {
    return (
        <div className="admin-dashboard">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <h2 className="logo">Aqua<span>Pure</span></h2>

                <ul className="menu">
                    <li className="active">Dashboard</li>
                    <li>Orders</li>
                    <li>Users</li>
                    <li>Products</li>
                    <li>Queries</li>
                    <li>Settings</li>
                </ul>
            </aside>

        </div>
    );
}

export default Dashboard;
