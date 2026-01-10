import React from 'react'
import './CustomBottlePage.css'

function CustomBottlePage() {
  return (
    <section className="custom">
      {/* Hero Section */}
      <div className="custom-hero">
        <div className="custom-hero-content">
          <h1>
            Custom <span>Branded Bottles</span>
          </h1>
          <p>
            We design and deliver premium custom water bottles for weddings,
            restaurants, cafes, corporate events, and special occasions.
          </p>
          <button className="custom-btn">Get Custom Quote</button>
        </div>
      </div>

      {/* Use Cases */}
      <div className="custom-section">
        <h2>Perfect For Every Occasion</h2>

        <div className="custom-cards">
          <div className="custom-card">
            <h3>💍 Weddings</h3>
            <p>Personalized bottles with couple names & wedding dates.</p>
          </div>

          <div className="custom-card">
            <h3>🍽️ Restaurants & Cafes</h3>
            <p>Elegant branded bottles to enhance your dining experience.</p>
          </div>

          <div className="custom-card">
            <h3>🏢 Corporate Events</h3>
            <p>Professional branding for meetings, seminars & promotions.</p>
          </div>

          <div className="custom-card">
            <h3>🎉 Parties & Events</h3>
            <p>Custom labels for birthdays, launches & special events.</p>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="custom-process">
        <h2>How It Works</h2>

        <div className="process-steps">
          <div className="step">1️⃣ Share Your Design</div>
          <div className="step">2️⃣ Approve Sample</div>
          <div className="step">3️⃣ Production</div>
          <div className="step">4️⃣ Fast Delivery</div>
        </div>
      </div>
    </section>
  )
}

export default CustomBottlePage
