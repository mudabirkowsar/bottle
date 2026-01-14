import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './OrderNow.css'

function OrderNow() {
    const [order, setOrder] = useState({
        size: '500ml',
        quantity: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        note: '',
    })

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (order.quantity < 100) {
            alert("Quantity should be greater than 100")
            return
        }
        console.log('Order Submitted:', order)
        alert('✅ Order placed successfully!')
    }

    return (
        <>
            <Navbar />

            {/* Header */}
            <section className="order-header">
                <h1>Place Your Order</h1>
                <p>Pure • Safe • Custom Drinking Water</p>
            </section>

            {/* Order Form */}
            <section className="order-container">
                <form className="order-form" onSubmit={handleSubmit}>
                    <h2>Order Details</h2>

                    {/* Bottle Size */}
                    <div className="form-group">
                        <label>Bottle Size</label>
                        <select name="size" value={order.size} onChange={handleChange}>
                            <option value="200ml">200 ml</option>
                            <option value="500ml">500 ml</option>
                            <option value="1L">1 L</option>
                            <option value="2L">2 L</option>
                            <option value="20L">20 L (Can)</option>
                        </select>
                    </div>

                    {/* Quantity */}
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Enter quantity"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <h2>Customer Details</h2>

                    {/* Name */}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="10-digit mobile number"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>Email (optional)</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label>Delivery Address</label>
                        <textarea
                            name="address"
                            placeholder="Complete delivery address"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    {/* Notes */}
                    <div className="form-group">
                        <label>Additional Notes</label>
                        <textarea
                            name="notes"
                            placeholder="Any special instructions?"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="order-btnn">
                        Confirm Order
                    </button>
                </form>
            </section>

            <Footer />
        </>
    )
}

export default OrderNow
