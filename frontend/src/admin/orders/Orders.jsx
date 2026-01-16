import React from "react";
import NavbarAdmin from "../NavbarAdmin";
import "./Orders.css";

function Orders() {
    return (
        <div className="admin-wrapper">
            {/* SIDEBAR */}
            {/* <NavbarAdmin /> */}

            {/* MAIN CONTENT */}
            <main className="admin-main">
                <header className="page-header">
                    <h1>Orders</h1>
                    <p>Manage all customer orders</p>
                </header>

                <section className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>#AP1021</td>
                                <td>Rahul Sharma</td>
                                <td>9876543210</td>
                                <td>₹450</td>
                                <td className="status success">Delivered</td>
                            </tr>

                            <tr>
                                <td>#AP1022</td>
                                <td>Ayesha Khan</td>
                                <td>9876501234</td>
                                <td>₹300</td>
                                <td className="status pending">Pending</td>
                            </tr>

                            <tr>
                                <td>#AP1023</td>
                                <td>Mohit Verma</td>
                                <td>9123456789</td>
                                <td>₹600</td>
                                <td className="status cancel">Cancelled</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default Orders;
