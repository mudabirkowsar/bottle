import React from 'react'
import Navbar from '../components/navbar/Navbar'
import LandingPage from '../components/landingPage/LandingPage'
import CustomBottlePage from '../components/customBottle/CustomBottlePage'
import PricingPage from '../components/pricingPage/PricingPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <CustomBottlePage />
      <PricingPage />
    </>
  )
}

export default HomePage