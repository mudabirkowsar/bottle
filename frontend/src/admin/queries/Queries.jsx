import React, { useEffect, useState } from "react";
import "./Queries.css";
import {
    getAllQueries,
    updateQueryStatus,
    deleteQuery
} from "../../services/adminAPI";

function Queries() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    /* DELETE MODAL STATE */
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);

    /* RESOLVE MODAL STATE */
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [selectedResolveQuery, setSelectedResolveQuery] = useState(null);

    /* LOADING STATE FOR EMAIL */
    const [isSending, setIsSending] = useState(false);

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

    /* OPEN RESOLVE MODAL */
    const openResolveModal = (query) => {
        setSelectedResolveQuery(query);
        setShowResolveModal(true);
    };

    /* CONFIRM RESOLVE + SEND MAIL */
    const handleResolveConfirm = async () => {
        try {
            setIsSending(true);

            await updateQueryStatus(
                selectedResolveQuery._id,
                "resolved"
            );

            setQueries((prev) =>
                prev.map((q) =>
                    q._id === selectedResolveQuery._id
                        ? { ...q, status: "resolved" }
                        : q
                )
            );
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
            setShowResolveModal(false);
            setSelectedResolveQuery(null);
        }
    };

    /* OPEN DELETE MODAL */
    const openDeleteModal = (id) => {
        setSelectedDeleteId(id);
        setShowDeleteModal(true);
    };

    /* CONFIRM DELETE */
    const handleDeleteConfirm = async () => {
        try {
            await deleteQuery(selectedDeleteId);
            setQueries((prev) =>
                prev.filter((q) => q._id !== selectedDeleteId)
            );
        } catch (error) {
            console.error(error);
        } finally {
            setShowDeleteModal(false);
            setSelectedDeleteId(null);
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
                                                openResolveModal(query)
                                            }
                                        >
                                            Resolve
                                        </button>
                                    )}
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            openDeleteModal(query._id)
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

            {/* RESOLVE MODAL */}
            {showResolveModal && (
                <div className="resolve-backdrop">
                    <div className="resolve-modal">
                        <div className="resolve-icon">📧</div>
                        <h2>Send Email & Resolve</h2>
                        <p>
                            Are you sure you want to resolve this
                            query and send an email to:
                        </p>
                        <strong>
                            {selectedResolveQuery?.email}
                        </strong>

                        <div className="resolve-modal-actions">
                            <button
                                className="resolve-cancel-btn"
                                onClick={() =>
                                    setShowResolveModal(false)
                                }
                                disabled={isSending}
                            >
                                Cancel
                            </button>

                            <button
                                className="resolve-confirm-btn"
                                onClick={handleResolveConfirm}
                                disabled={isSending}
                            >
                                {isSending ? (
                                    <>
                                        <span className="btn-spinner" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Mail & Resolve"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div className="delete-backdrop">
                    <div className="delete-modal">
                        <div className="delete-icon">⚠️</div>
                        <h2>Delete Query?</h2>
                        <p>
                            This action cannot be undone.
                        </p>

                        <div className="delete-modal-actions">
                            <button
                                className="btn-secondary"
                                onClick={() =>
                                    setShowDeleteModal(false)
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-danger"
                                onClick={handleDeleteConfirm}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Queries;
