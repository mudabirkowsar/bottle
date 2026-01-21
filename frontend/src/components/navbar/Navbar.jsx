import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../services/orderAPI';
import { jwtDecode } from "jwt-decode";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
            setUsername(decoded.name)
            setIsLogin(true);
        } catch (error) {
            localStorage.removeItem("token");
            setIsLogin(false);
            setUserRole(null);
        }
    }, []);

    const fetchData = async () => {
        try {
            const res = await getOrders();
            if (res.data && res.data.length > 0) {
                setShowCart(true);
            }
        } catch (error) {
            console.error("Error fetching cart data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleNavigate = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        setShowLogoutConfirm(false);
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo" onClick={() => handleNavigate("/")}>
                    Aqua<span>Pure</span>
                </div>

                <div
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                    <li className="nav-item" onClick={() => handleNavigate("/")}>Home</li>
                    <li className="nav-item" onClick={() => handleNavigate("/aboutus")}>About Business</li>
                    <li className="nav-item" onClick={() => handleNavigate("/query")}>Query</li>

                    <div className="nav-buttons">
                        {!isLogin && (
                            <li onClick={() => handleNavigate("/login")}>
                                <button className="login-btn">Login</button>
                            </li>
                        )}

                        {userRole === "admin" && (
                            <li className="order-btn" onClick={() => handleNavigate("/admin/dashboard")}>
                                Admin Dashboard
                            </li>
                        )}

                        <li onClick={() => handleNavigate("/ordernow")}>
                            <button className="order-btn">Order Now</button>
                        </li>

                        {isLogin && (
                            <li className="user-menu">
                                <div className="user-avatar">
                                    {username?.slice(0, 2).toUpperCase()}
                                </div>

                                <div className="user-dropdown">
                                    <span onClick={() => handleNavigate("/my-orders")}>My Orders</span>
                                    <span onClick={() => handleNavigate("/my-queries")}>My Queries</span>
                                    <span className="logout-text" onClick={() => setShowLogoutConfirm(true)}>
                                        Logout
                                    </span>
                                </div>
                            </li>

                        )}
                    </div>
                </ul>
            </nav>

            {showLogoutConfirm && (
                <div className="logout-overlay">
                    <div className="logout-modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to log out?</p>

                        <div className="logout-actions">
                            <button className="cancel-btn" onClick={() => setShowLogoutConfirm(false)}>
                                Cancel
                            </button>
                            <button className="confirm-btn" onClick={handleLogoutConfirm}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
