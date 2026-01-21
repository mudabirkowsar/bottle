import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import AboutUs from './pages/aboutUsPage/AboutUs'
import QueryPage from './pages/queryPage/QueryPage'
import OrderNow from './pages/orderNow/OrderNow'
import LoginPage from './pages/authPages/loginPage/LoginPage'
import SignupPage from './pages/authPages/signupPage/SignupPage'
import NavbarAdmin from './admin/NavbarAdmin'
import UserOrders from './pages/userOrder/UserOrders'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/query' element={<QueryPage />} />
        <Route path='/ordernow' element={<OrderNow />} />

        <Route path='/my-orders' element={<UserOrders />} />

        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

        <Route path='/admin/dashboard' element={<NavbarAdmin />} />

      </Routes>
    </>
  )
}

export default App
