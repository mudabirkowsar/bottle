import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './QueryPage.css'
import { submitQuery } from '../../services/queryAPI'

function QueryPage() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    // New state for handling the status message
    const [status, setStatus] = useState({ type: '', msg: '' }) // type: 'success' | 'error' | ''

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' }); // Reset status on new submit

        const formData = {
            name,
            email,
            phone,
            message
        }

        try {
            const res = await submitQuery(formData);

            // Set Success Message
            setStatus({ type: 'success', msg: 'Message sent successfully! We will contact you soon.' });

            // Clear Form
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");

            // Optional: Auto-hide success message after 5 seconds
            setTimeout(() => setStatus({ type: '', msg: '' }), 5000);

        } catch (error) {
            console.error("Query Error:", error);
            const errorMsg = error.response && error.response.data
                ? error.response.data.message
                : "Something went wrong. Please try again later.";

            // Set Error Message
            setStatus({ type: 'error', msg: errorMsg });
        }
    }

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

                    {/* --- NEW STATUS MESSAGE COMPONENT --- */}
                    {status.msg && (
                        <div className={`status-message ${status.type}`}>
                            {status.type === 'success' ? <i className="fas fa-check-circle"></i> : <i className="fas fa-exclamation-circle"></i>}
                            &nbsp; {status.msg}
                        </div>
                    )}
                    {/* ------------------------------------ */}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <i className="fas fa-phone"></i>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="input-group textarea">
                            <i className="fas fa-comment-dots"></i>
                            <textarea
                                placeholder="Your Message"
                                value={message}
                                required
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"></textarea>
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
                            style={{ color: "black" }}
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