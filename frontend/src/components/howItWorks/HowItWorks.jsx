import React from 'react'
import './HowItWorks.css'

function HowItWorks() {
  return (
    <section className="how">
      {/* Header */}
      <div className="how-header">
        <h1>How It Works</h1>
        <p>
          From order to delivery — a smooth, hygienic, and transparent process.
        </p>
      </div>

      {/* Steps */}
      <div className="how-steps">
        <div className="how-step">
          <div className="step-icon">📝</div>
          <h3>Place Your Order</h3>
          <p>
            Choose bottle size, quantity, and branding. Place your order online
            or via WhatsApp.
          </p>
        </div>

        <div className="how-step">
          <div className="step-icon">🎨</div>
          <h3>Design & Approval</h3>
          <p>
            We create a custom label design and send it for your approval before
            production.
          </p>
        </div>

        <div className="how-step">
          <div className="step-icon">🏭</div>
          <h3>Production</h3>
          <p>
            Bottles are filled, sealed, and labeled in a hygienic environment.
          </p>
        </div>

        <div className="how-step">
          <div className="step-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>
            Secure packaging and on-time delivery directly to your location.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="how-cta">
        <h2>Ready to Get Started?</h2>
        <p>Order fresh, customized water bottles today.</p>
        <button>Order Now</button>
      </div>
    </section>
  )
}

export default HowItWorks
