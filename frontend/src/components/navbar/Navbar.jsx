import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { getOrders } from '../../services/orderAPI';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await getOrders();
            if (res.data.length > 0) {
                setShowCart(true)
            }
        } catch (error) {
            alert("Something went wrong ")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const openNavbar = () => {
        setMenuOpen(false)
        navigate("/")
    }

    const openAbout = () => {
        setMenuOpen(false)
        navigate("/aboutus")
    }

    const openQuery = () => {
        setMenuOpen(false)
        navigate("/query")
    }

    const openOrderNow = () => {
        setMenuOpen(false);
        navigate("/ordernow")
    }

    const openOrder = () => {
        alert("Open")
    }

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo" onClick={() => navigate("/")}>
                Aqua<span>Pure</span>
            </div>

            {/* Hamburger */}
            <div
                className={`hamburger ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Menu */}
            <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                <li onClick={openNavbar}>Home</li>
                <li onClick={openAbout}>About Business</li>
                <li onClick={openQuery}>Query</li>
                {
                    showCart &&
                    <li onClick={openOrder} className='viewOrder'>View Order</li>
                    // <i class="fa-solid fa-cart-arrow-down"></i>
                }
                <li onClick={openOrderNow}>
                    <button className="order-btn">Order Now</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
