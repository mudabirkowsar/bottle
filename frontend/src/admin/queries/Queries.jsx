import React, { useState } from "react";
import "./Queries.css";

function Queries() {
    const [queries, setQueries] = useState([
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            message: "What is the delivery time?",
            status: "pending",
        },
        {
            id: 2,
            name: "Ayesha Khan",
            email: "ayesha@gmail.com",
            message: "Do you provide bulk orders?",
            status: "resolved",
        },
        {
            id: 3,
            name: "Mohit Verma",
            email: "mohit@gmail.com",
            message: "How to change delivery address?",
            status: "pending",
        },
    ]);

    /* MARK AS RESOLVED */
    const markResolved = (id) => {
        setQueries(
            queries.map((q) =>
                q.id === id ? { ...q, status: "resolved" } : q
            )
        );
    };

    /* DELETE QUERY */
    const deleteQuery = (id) => {
        if (window.confirm("Delete this query?")) {
            setQueries(queries.filter((q) => q.id !== id));
        }
    };

    return (
        <div className="queries-admin-page">
            {/* HEADER */}
            <div className="queries-admin-header">
                <h1>Customer Queries</h1>
                <span className="queries-count">
                    Total: {queries.length}
                </span>
            </div>

            {/* TABLE */}
            <div className="queries-admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {queries.map((query) => (
                            <tr key={query.id}>
                                <td>{query.name}</td>
                                <td>{query.email}</td>
                                <td className="query-message">
                                    {query.message}
                                </td>
                                <td>
                                    <span
                                        className={`query-status ${query.status}`}
                                    >
                                        {query.status}
                                    </span>
                                </td>
                                <td>
                                    {query.status === "pending" && (
                                        <button
                                            className="resolve-btn"
                                            onClick={() =>
                                                markResolved(query.id)
                                            }
                                        >
                                            Resolve
                                        </button>
                                    )}
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteQuery(query.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Queries;
