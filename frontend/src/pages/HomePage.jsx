import React from 'react'
import Navbar from '../components/navbar/Navbar'
import LandingPage from '../components/landingPage/LandingPage'
import CustomBottlePage from '../components/customBottle/CustomBottlePage'

function HomePage() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <CustomBottlePage />
    </>
  )
}

export default HomePage