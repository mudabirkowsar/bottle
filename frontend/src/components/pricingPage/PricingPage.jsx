import React from 'react'
import './PricingPage.css'
import { useNavigate } from 'react-router-dom'

function PricingPage() {
  const navigate = useNavigate();
  return (
    <section className="pricing">
      {/* Header */}
      <div className="pricing-header">
        <h1>Simple & Transparent Pricing</h1>
        <p>
          Choose the perfect bottle size for your business, events, or daily
          needs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-cards">
        <div className="pricing-card">
          <h2>200 ML</h2>
          <p className="price">₹3 / bottle</p>
          <ul>
            <li>✔ Ideal for Events</li>
            <li>✔ Custom Label</li>
            <li>✔ Bulk Orders Available</li>
          </ul>
          <button
            onClick={() => navigate('ordernow')}
          >Order Now</button>
        </div>

        <div className="pricing-card popular">
          <span className="badge">Most Popular</span>
          <h2>500 ML</h2>
          <p className="price">₹5 / bottle</p>
          <ul>
            <li>✔ Restaurants & Cafes</li>
            <li>✔ Premium Quality</li>
            <li>✔ Custom Branding</li>
          </ul>
          <button
            onClick={() => navigate('ordernow')}
          >Order Now</button>
        </div>

        <div className="pricing-card">
          <h2>1 Litre</h2>
          <p className="price">₹10 / bottle</p>
          <ul>
            <li>✔ Offices & Corporates</li>
            <li>✔ Long-lasting Seal</li>
            <li>✔ Mineral Water</li>
          </ul>
          <button
            onClick={() => navigate('ordernow')}
          >Order Now</button>
        </div>

        <div className="pricing-card">
          <h2>2 Litre</h2>
          <p className="price">₹18 / bottle</p>
          <ul>
            <li>✔ Home & Family Use</li>
            <li>✔ Strong Bottle</li>
            <li>✔ Safe & Hygienic</li>
          </ul>
          <button
            onClick={() => navigate('ordernow')}
          >Order Now</button>
        </div>
      </div>
    </section>
  )
}

export default PricingPage
