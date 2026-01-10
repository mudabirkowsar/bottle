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
            <h3>
              <i className="fa-solid fa-heart"></i> Weddings
            </h3>
            <p>Personalized bottles with couple names & wedding dates.</p>
          </div>

          <div className="custom-card">
            <h3>
              <i className="fa-solid fa-utensils"></i> Restaurants & Cafes
            </h3>
            <p>Elegant branded bottles to enhance your dining experience.</p>
          </div>

          <div className="custom-card">
            <h3>
              <i className="fa-solid fa-building"></i> Corporate Events
            </h3>
            <p>Professional branding for meetings, seminars & promotions.</p>
          </div>

          <div className="custom-card">
            <h3>
              <i className="fa-solid fa-champagne-glasses"></i> Parties & Events
            </h3>
            <p>Custom labels for birthdays, launches & special events.</p>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="custom-process">
        <h2>How It Works</h2>

        <div className="process-steps">
          <div className="step">
            <i className="fa-solid fa-pen-nib"></i> Share Your Design
          </div>
          <div className="step">
            <i className="fa-solid fa-circle-check"></i> Approve Sample
          </div>
          <div className="step">
            <i className="fa-solid fa-industry"></i> Production
          </div>
          <div className="step">
            <i className="fa-solid fa-truck-fast"></i> Fast Delivery
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomBottlePage
