import React from 'react'
import Navbar from '../components/navbar/Navbar'
import LandingPage from '../components/landingPage/LandingPage'
import CustomBottlePage from '../components/customBottle/CustomBottlePage'
import PricingPage from '../components/pricingPage/PricingPage'
import HowItWorks from '../components/howItWorks/HowItWorks'
import Gallery from '../components/gallery/Gallery'
import Footer from '../components/footer/Footer'

function HomePage() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <CustomBottlePage />
      <PricingPage />
      <Gallery />
      <HowItWorks />
      <Footer />
    </>
  )
}

export default HomePage