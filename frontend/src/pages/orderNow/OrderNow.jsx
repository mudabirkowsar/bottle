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

    // NEW: State to control modal visibility
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    // Step 1: User clicks "Confirm Order" -> Validates form -> Opens Modal
    const handleFormSubmit = (e) => {
        e.preventDefault()
        setStatus({ type: '', msg: '' })

        if (Number(order.quantity) < 100) {
            setStatus({ type: 'error', msg: "Quantity should be greater than 100" })
            return
        }
        setShowModal(true);
    }

    // Step 2: User clicks "Yes, Place Order" in Modal -> API Call happens
    const confirmAndPlaceOrder = async () => {
        setShowModal(false);

        try {
            const res = await placeOrder(order);

            setStatus({ type: 'success', msg: "Order placed successfully! We will contact you shortly." })

            setOrder({
                size: '500ml',
                quantity: '',
                name: '',
                phone: '',
                email: '',
                address: '',
                note: '',
            })

            setTimeout(() => setStatus({ type: '', msg: '' }), 5000);

        } catch (error) {
            console.error("Order Error:", error);
            const errorMsg = error.response && error.response.data
                ? error.response.data.message
                : "Something went wrong. Please try again.";

            setStatus({ type: 'error', msg: errorMsg })
        }
    }

    return (
        <>
            <Navbar />

            <section className="order-header">
                <h1>Place Your Order</h1>
                <p>Pure • Safe • Custom Drinking Water</p>
            </section>

            <section className="order-container">
                {/* Changed onSubmit to handleFormSubmit */}
                <form className="order-form" onSubmit={handleFormSubmit}>
                    <h2>Order Details</h2>

                    {status.msg && (
                        <div className={`status-message ${status.type}`}>
                            {status.type === 'success' ? <i className="fas fa-check-circle"></i> : <i className="fas fa-exclamation-circle"></i>}
                            &nbsp; {status.msg}
                        </div>
                    )}

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

                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Enter quantity"
                            value={order.quantity}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <h2>Customer Details</h2>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            value={order.name}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="10-digit mobile number"
                            value={order.phone}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="example@email.com"
                            value={order.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Delivery Address</label>
                        <textarea
                            name="address"
                            placeholder="Complete delivery address"
                            value={order.address}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Additional Notes</label>
                        <textarea
                            name="note"
                            placeholder="Any special instructions?"
                            value={order.note}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="order-btnn">
                        Confirm Order
                    </button>
                </form>
            </section>

            {/* --- MODAL POPUP --- */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Confirm Order</h3>
                        <p>Please review your order details:</p>

                        <div className="modal-summary">
                            <p><strong>Size:</strong> {order.size}</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-confirm" onClick={confirmAndPlaceOrder}>
                                Yes, Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )
}

export default OrderNow