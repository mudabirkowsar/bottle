import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import './OrderNow.css'
import { placeOrder } from '../../services/orderAPI'
import { useEffect } from 'react'
import { getCurrentUser } from '../../services/userAPI'

function OrderNow() {

    const [order, setOrder] = useState({
        size: '500ml',
        quantity: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        note: '',
    })

    const [user, setUser] = useState(null);
    const [status, setStatus] = useState({ type: '', msg: '' })
    const [showModal, setShowModal] = useState(false)

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    const fetchUser = async () => {
        try {
            const res = await getCurrentUser();
            const userData = res.data.data;
            setUser(userData);
            setOrder({
                name: userData?.name || '',
                email: userData?.email || '',
                phone: userData?.phone || '',
                address: userData?.address || '',
                city: userData?.city || '',
                state: userData?.state || '',
                pin: userData?.pin || '',
            })
        } catch (error) {
            console.log(error.message)
            setStatus({ type: 'error', msg: "User Not Found" })
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setStatus({ type: '', msg: '' })

        if (Number(order.quantity) < 100) {
            setStatus({ type: 'error', msg: "Quantity should be greater than 100" })
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
                msg: "Order placed successfully! We will contact you shortly."
            })

            setOrder({
                size: '500ml',
                quantity: '',
                name: '',
                phone: '',
                email: '',
                address: '',
                city: '',
                state: '',
                pin: '',
                note: '',
            })

            setTimeout(() => setStatus({ type: '', msg: '' }), 5000)

        } catch (error) {
            setStatus({
                type: 'error',
                msg: "Something went wrong. Please try again."
            })
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
                <form className="order-form" onSubmit={handleFormSubmit}>
                    <h2>Order Details</h2>

                    {status.msg && (
                        <div className={`status-message ${status.type}`}>
                            {status.msg}
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
                            value={order.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <h2>Customer Details</h2>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={order.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={order.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={order.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={order.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={order.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Pin Code</label>
                        <input
                            type="text"
                            name="pin"
                            value={order.pin}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Full Delivery Address</label>
                        <textarea
                            name="address"
                            value={order.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Additional Notes</label>
                        <textarea
                            name="note"
                            value={order.note}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="order-btnn">
                        Confirm Order
                    </button>
                </form>
            </section>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Confirm Order</h3>

                        <div className="modal-summary">
                            <p><strong>Size:</strong> {order.size}</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>City:</strong> {order.city}</p>
                            <p><strong>State:</strong> {order.state}</p>
                            <p><strong>Pin:</strong> {order.pin}</p>
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
