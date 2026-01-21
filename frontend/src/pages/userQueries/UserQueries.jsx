import React, { useEffect, useState } from "react";
import "./UserQueries.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { getAllQueries } from "../../services/adminAPI";

function UserQueries() {
    const [queries, setQueries] = useState([]);

    const fetchQueries = async () => {
        try {
            const res = await getAllQueries();
            setQueries(res.data.data);
        } catch (error) {
            alert("Something went wrong");
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    return (
        <>
            <Navbar />

            {/* Header */}
            <div className="order-header">
                <h1>User Queries</h1>
                <p>Support requests submitted by users</p>
            </div>

            {/* Queries Section */}
            <div className="order-container">
                <div className="order-form queries-wrapper">

                    {queries.length === 0 && (
                        <p style={{ textAlign: "center" }}>No queries found</p>
                    )}

                    {queries.map((query) => (
                        <div className="query-card" key={query._id}>

                            {/* Header */}
                            <div className="query-header">
                                <div>
                                    <h3>{query.name}</h3>
                                    <span className="query-id">{query._id}</span>
                                </div>

                                <span className={`query-status ${query.status}`}>
                                    {query.status}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="query-details">
                                <p><strong>Phone:</strong> {query.phone}</p>
                                <p><strong>Email:</strong> {query.email}</p>

                                <div className="query-message-box">
                                    <strong>Message:</strong>
                                    <p>{query.message}</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="query-footer">
                                <span className="query-date">
                                    Submitted on:{" "}
                                    {new Date(query.createdAt).toLocaleDateString()}
                                </span>

                                <button className="order-btnn small">
                                    View / Reply
                                </button>
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
