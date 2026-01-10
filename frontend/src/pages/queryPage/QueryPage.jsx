import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './QueryPage.css'

function QueryPage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="query-hero">
                <div className="query-hero-content">
                    <h1>
                        Let’s <span>Talk</span>
                    </h1>
                    <p>
                        Have questions or need custom bottled water?
                        Our team is ready to help.
                    </p>
                </div>
            </section>

            {/* Main */}
            <section className="query-main">
                {/* Form */}
                <div className="query-form">
                    <h2>Send Us a Message</h2>

                    <form>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Your Name" required />
                        </div>

                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email Address" required />
                        </div>

                        <div className="input-group">
                            <i className="fas fa-phone"></i>
                            <input type="tel" placeholder="Phone Number" />
                        </div>

                        <div className="input-group textarea">
                            <i className="fas fa-comment-dots"></i>
                            <textarea placeholder="Your Message" rows="4"></textarea>
                        </div>

                        <button type="submit">
                            <i className="fas fa-paper-plane"></i> Send Query
                        </button>
                    </form>
                </div>

                {/* Info */}
                <div className="query-info">
                    <h2>Contact Information</h2>

                    <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>Jammu & Kashmir, India</p>
                    </div>

                    <div className="info-item">
                        <i className="fas fa-phone-alt"></i>
                        <p>+91 6006287541</p>
                    </div>

                    <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        <p>khandyamudabir@gmail.com</p>
                    </div>

                    <div className="info-highlight">
                        <i className="fab fa-whatsapp"></i>
                        <a
                        style={{color:"black"}}
                            href="https://wa.me/6006287541"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Quick support available on WhatsApp</a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default QueryPage
