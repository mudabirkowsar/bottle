import React from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  return (
    <section className="landing">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1>
            Pure Water <br />
            <span>Healthy Life</span>
          </h1>

          <p>
            Experience crystal clear, mineral-rich drinking water delivered
            fresh to your home and business.
          </p>

          <div className="landing-buttons">
            <button className="primary-btn" onClick={() => navigate("/ordernow")}>Order Now</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingPage
