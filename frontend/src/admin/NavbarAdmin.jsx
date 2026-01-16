import React, { useState } from "react";
import "./NavbarAdmin.css";
import DashboardAdmin from "./dashboard/DashboardAdmin";
import Orders from "./orders/Orders";
import Users from "./users/Users";
import Queries from "./queries/Queries";
import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
    const [activePage, setActivePage] = useState("dashboard");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    const renderContent = () => {
        switch (activePage) {
            case "orders":
                return <Orders />;
            case "users":
                return <Users />;
            case "queries":
                return <Queries />;
            case "dashboard":
            default:
                return <DashboardAdmin />;
        }
    };

    /* CONFIRM LOGOUT */
    const confirmLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <div className="admin-dashboard">
                {/* SIDEBAR */}
                <aside className="sidebar">
                    <h2 className="logo">
                        Aqua<span>Pure</span>
                    </h2>

                    <ul className="menu">
                        <li
                            className={activePage === "dashboard" ? "active" : ""}
                            onClick={() => setActivePage("dashboard")}
                        >
                            Dashboard
                        </li>

                        <li
                            className={activePage === "orders" ? "active" : ""}
                            onClick={() => setActivePage("orders")}
                        >
                            Orders
                        </li>

                        <li
                            className={activePage === "users" ? "active" : ""}
                            onClick={() => setActivePage("users")}
                        >
                            Users
                        </li>

                        <li
                            className={activePage === "queries" ? "active" : ""}
                            onClick={() => setActivePage("queries")}
                        >
                            Queries
                        </li>

                        <li
                            className="logout-item"
                            onClick={() => setShowLogoutModal(true)}
                        >
                            Logout
                        </li>
                    </ul>
                </aside>

                {/* RIGHT CONTENT */}
                <main className="admin-main">{renderContent()}</main>
            </div>

            {/* LOGOUT CONFIRM MODAL */}
            {showLogoutModal && (
                <div className="logout-overlay">
                    <div className="logout-modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to logout?</p>

                        <div className="logout-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="confirm-btn"
                                onClick={confirmLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavbarAdmin;
