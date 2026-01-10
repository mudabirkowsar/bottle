import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './AboutUs.css'

function AboutUs() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="aboutx-hero">
                <div className="aboutx-hero-inner">
                    <h1>
                        Pure Water. <br />
                        <span>Powerful Branding.</span>
                    </h1>
                    <p>
                        AquaPure blends purity, design, and innovation to deliver premium
                        drinking water experiences.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="aboutx-story">
                <div className="story-text">
                    <h2>Who We Are</h2>
                    <p>
                        AquaPure is not just a water company. We help brands, weddings,
                        restaurants and businesses tell their story through custom bottled
                        water.
                    </p>
                    <p>
                        From minimal designs to luxury branding, we create bottles that leave
                        a lasting impression.
                    </p>
                </div>

                <div className="story-image">
                    <img
                        src="https://images.unsplash.com/photo-1600962815726-457c46a12681"
                        alt="Water Bottles"
                    />
                </div>
            </section>

            {/* Stats */}
            <section className="aboutx-stats">
                <div className="stat-box">
                    <h3>10K+</h3>
                    <p>
                        <i className="fas fa-users"></i> Happy Customers
                    </p>
                </div>

                <div className="stat-box">
                    <h3>500+</h3>
                    <p>
                        <i className="fas fa-glass-whiskey"></i> Events Covered
                    </p>
                </div>

                <div className="stat-box">
                    <h3>50+</h3>
                    <p>
                        <i className="fas fa-building"></i> Corporate Clients
                    </p>
                </div>

                <div className="stat-box">
                    <h3>99%</h3>
                    <p>
                        <i className="fas fa-thumbs-up"></i> Satisfaction Rate
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="aboutx-values">
                <h2>What Drives Us</h2>

                <div className="values-grid">
                    <div className="value-card">
                        <i className="fas fa-tint"></i>
                        <h4>Purity First</h4>
                        <p>Certified purification processes ensuring safe water.</p>
                    </div>

                    <div className="value-card">
                        <i className="fas fa-paint-brush"></i>
                        <h4>Design Focused</h4>
                        <p>Custom branding that elevates your image.</p>
                    </div>

                    <div className="value-card">
                        <i className="fas fa-truck"></i>
                        <h4>Reliable Delivery</h4>
                        <p>On-time delivery across cities.</p>
                    </div>

                    <div className="value-card">
                        <i className="fas fa-leaf"></i>
                        <h4>Sustainability</h4>
                        <p>Eco-friendly packaging & responsible sourcing.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="aboutx-cta">
                <h2>Let’s Build Your Brand Together</h2>
                <button>
                    <i className="fas fa-paper-plane"></i> Request Custom Quote
                </button>
            </section>

            <Footer />
        </>
    )
}

export default AboutUs
