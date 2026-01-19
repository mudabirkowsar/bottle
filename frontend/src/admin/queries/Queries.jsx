import React, { useEffect, useState } from "react";
import "./Queries.css";
import { getAllQueries, updateQueryStatus, deleteQuery } from "../../services/adminAPI";

function Queries() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    /* FETCH QUERIES */
    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const res = await getAllQueries();
                setQueries(res.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchQueries();
    }, []);

    /* UPDATE STATUS (SEND IN BODY) */
    const updateStatus = async (id, status) => {
        try {
            await updateQueryStatus(id, status);

            // Update UI state instantly
            setQueries((prev) =>
                prev.map((q) =>
                    q._id === id ? { ...q, status } : q
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    /* DELETE QUERY */
    const deleteQueryy = async (id) => {
        if (!window.confirm("Delete this query?")) return;

        try {
            await deleteQuery(id)
            setQueries((prev) =>
                prev.filter((q) => q._id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Loading queries...</p>;

    return (
        <div className="queries-admin-page">
            <div className="queries-admin-header">
                <h1>Customer Queries</h1>
                <span className="queries-count">
                    Total: {queries.length}
                </span>
            </div>

            <div className="queries-admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {queries.map((query) => (
                            <tr key={query._id}>
                                <td>{query.name}</td>
                                <td>{query.email}</td>
                                <td>{query.phone}</td>
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
                                                updateStatus(
                                                    query._id,
                                                    "resolved"
                                                )
                                            }
                                        >
                                            Resolve
                                        </button>
                                    )}
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteQueryy(query._id)
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
