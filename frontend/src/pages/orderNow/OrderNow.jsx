import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './OrderNow.css'
import { placeOrder } from '../../services/orderAPI'

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

    const [status, setStatus] = useState({ type: '', msg: '' })
    const [showModal, setShowModal] = useState(false)

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setStatus({ type: '', msg: '' })

        if (Number(order.quantity) < 100) {
            setStatus({ type: 'error', msg: 'Quantity should be greater than 100' })
            return
        }
        setShowModal(true)
    }

    const confirmAndPlaceOrder = async () => {
        setShowModal(false)

        try {
            await placeOrder(order)

            setStatus({
                type: 'success',
                msg: 'Order placed successfully! We will contact you shortly.',
            })

            setOrder({
                size: '500ml',
                quantity: '',
                name: '',
                phone: '',
                email: '',
                address: '',
                note: '',
            })

            setTimeout(() => setStatus({ type: '', msg: '' }), 5000)
        } catch (error) {
            const errorMsg =
                error.response && error.response.data
                    ? error.response.data.message
                    : 'Something went wrong. Please try again.'

            setStatus({ type: 'error', msg: errorMsg })
        }
    }

    return (
        <div className="on-wrapper">
            <Navbar />

            {/* HEADER */}
            <section className="on-header">
                <h1>Place Your Order</h1>
                <p>Pure • Safe • Custom Drinking Water</p>
            </section>

            {/* FORM */}
            <section className="on-container">
                <form className="on-form" onSubmit={handleFormSubmit}>
                    <h2>Order Details</h2>

                    {status.msg && (
                        <div className={`on-status ${status.type}`}>
                            {status.msg}
                        </div>
                    )}

                    <div className="on-group">
                        <label>Bottle Size</label>
                        <select
                            className="on-select"
                            name="size"
                            value={order.size}
                            onChange={handleChange}
                        >
                            <option value="200ml">200 ml</option>
                            <option value="500ml">500 ml</option>
                            <option value="1L">1 L</option>
                            <option value="2L">2 L</option>
                            <option value="20L">20 L (Can)</option>
                        </select>
                    </div>

                    <div className="on-group">
                        <label>Quantity</label>
                        <input
                            className="on-input"
                            type="number"
                            name="quantity"
                            placeholder="Enter quantity"
                            value={order.quantity}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <h2>Customer Details</h2>

                    <div className="on-group">
                        <label>Full Name</label>
                        <input
                            className="on-input"
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            value={order.name}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="on-group">
                        <label>Phone Number</label>
                        <input
                            className="on-input"
                            type="tel"
                            name="phone"
                            placeholder="10-digit mobile number"
                            value={order.phone}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="on-group">
                        <label>Email (optional)</label>
                        <input
                            className="on-input"
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            value={order.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="on-group">
                        <label>Delivery Address</label>
                        <textarea
                            className="on-textarea"
                            name="address"
                            placeholder="Complete delivery address"
                            value={order.address}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="on-group">
                        <label>Additional Notes</label>
                        <textarea
                            className="on-textarea"
                            name="note"
                            placeholder="Any special instructions?"
                            value={order.note}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="on-submit">
                        Confirm Order
                    </button>
                </form>
            </section>

            {/* MODAL */}
            {showModal && (
                <div className="on-modal-overlay">
                    <div className="on-modal">
                        <h3>Confirm Order</h3>
                        <p>Please review your order details:</p>

                        <div className="on-modal-summary">
                            <p><strong>Size:</strong> {order.size}</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                        </div>

                        <div className="on-modal-actions">
                            <button
                                type="button"
                                className="on-cancel"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="on-confirm"
                                onClick={confirmAndPlaceOrder}
                            >
                                Yes, Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default OrderNow
