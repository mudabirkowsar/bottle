import React from "react";
import "./UserQueries.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

function UserQueries() {
    const queries = [
        {
            id: "QRY-2103",
            subject: "Delivery Delay",
            message: "My water can delivery is delayed since yesterday. Please check.",
            date: "14 Jan 2026",
            status: "Resolved",
        },
        {
            id: "QRY-2089",
            subject: "Payment Issue",
            message: "Amount deducted but order not placed.",
            date: "10 Jan 2026",
            status: "Open",
        },
        {
            id: "QRY-2055",
            subject: "Quality Concern",
            message: "Water quality doesn’t feel the same as before.",
            date: "02 Jan 2026",
            status: "In Progress",
        },
    ];

    return (
        <>
            <Navbar />
            {/* Header */}
            <div className="order-header">
                <h1>My Queries</h1>
                <p>View all your submitted support queries</p>
            </div>

            {/* Queries Container */}
            <div className="order-container">
                <div className="order-form queries-wrapper">
                    {queries.map((query) => (
                        <div className="query-card" key={query.id}>
                            <div className="query-header">
                                <div>
                                    <h3>{query.subject}</h3>
                                    <span className="query-id">{query.id}</span>
                                </div>
                                <span
                                    className={`query-status ${query.status
                                        .toLowerCase()
                                        .replace(" ", "-")}`}
                                >
                                    {query.status}
                                </span>
                            </div>

                            <p className="query-message">{query.message}</p>

                            <div className="query-footer">
                                <span className="query-date">{query.date}</span>
                                <button className="order-btnn small">View Reply</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserQueries;
