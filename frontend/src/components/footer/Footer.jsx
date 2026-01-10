import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-col">
                    <h2 className="footer-logo">AquaPure</h2>
                    <p>
                        Delivering pure, safe & premium drinking water.
                        Custom branded bottles for every occasion.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>About Business</li>
                        <li>Custom Bottles</li>
                        <li>Pricing</li>
                        <li>Gallery</li>
                    </ul>
                </div>

                {/* Services */}
                <div className="footer-col">
                    <h3>Services</h3>
                    <ul>
                        <li>Wedding Bottles</li>
                        <li>Corporate Branding</li>
                        <li>Restaurant Supply</li>
                        <li>Bulk Orders</li>
                        <li>Fast Delivery</li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <p>📍 Jammu & Kashmir, India</p>
                    <p>📞 +91 6006287541</p>
                    <p>✉️ khandaymudabir@gmail.com</p>

                    <div className="socials">
                        <span><i class="fa-brands fa-whatsapp"></i></span>
                        <span><i class="fa-brands fa-instagram"></i></span>
                        <span>📸</span>
                        <span>🐦</span>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                © {new Date().getFullYear()} AquaPure. All Rights Reserved.
            </div>

            <div className="whatsapp-wrapper">
                <div className="whatsapp-text">Chat with us</div>
                <a
                    href="https://wa.me/6006287541"
                    className="whatsapp-float"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <i class="fa-brands fa-whatsapp abcdef"></i>
                </a>
            </div>

        </footer>
    )
}

export default Footer
