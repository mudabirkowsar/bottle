import React, { useState } from 'react'
import './Navbar.css'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo">
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
                <li onClick={() => setMenuOpen(false)}>Home</li>
                <li onClick={() => setMenuOpen(false)}>About Business</li>
                <li onClick={() => setMenuOpen(false)}>Query</li>
                <li>
                    <button className="order-btn">Order Now</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
