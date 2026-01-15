import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../../services/orderAPI'; // Ensure path is correct

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await getOrders();
            if (res.data && res.data.length > 0) {
                setShowCart(true)
            }
        } catch (error) {
            console.error("Error fetching cart data");
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleNavigate = (path) => {
        setMenuOpen(false)
        navigate(path)
    }

    const openOrder = () => {
        alert("Open Cart")
    }

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo" onClick={() => handleNavigate("/")}>
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
                <li className="nav-item" onClick={() => handleNavigate("/")}>
                    Home
                </li>
                <li className="nav-item" onClick={() => handleNavigate("/aboutus")}>
                    About Business
                </li>
                <li className="nav-item" onClick={() => handleNavigate("/query")}>
                    Query
                </li>

                {/* Cart Icon (Optional Logic) */}
                {/* {showCart && <li onClick={openOrder} className='nav-item'>View Order</li>} */}

                {/* Buttons Container */}
                <div className="nav-buttons">
                    <li onClick={() => handleNavigate("/login")}>
                        <button className="login-btn">Login</button>
                    </li>
                    <li onClick={() => handleNavigate("/ordernow")}>
                        <button className="order-btn">Order Now</button>
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar