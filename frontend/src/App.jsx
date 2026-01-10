import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import AboutUs from './pages/aboutUsPage/AboutUs'
import QueryPage from './pages/queryPage/QueryPage'
import OrderNow from './pages/orderNow/OrderNow'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/query' element={<QueryPage />} />
        <Route path='/ordernow' element={<OrderNow/>} />
      </Routes>
    </>
  )
}

export default App
