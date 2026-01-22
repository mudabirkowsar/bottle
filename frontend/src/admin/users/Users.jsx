import React, { useState, useEffect } from "react";
import "./Users.css";
import { deleteUser, getAllUsers, updateUserAdmin } from "../../services/adminAPI";

function Users() {
    const [users, setUsers] = useState([]);    /* ADD / EDIT MODAL STATE */
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user",
    });

    /* DELETE CONFIRM MODAL STATE */
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const openAddModal = () => {
        setEditingUser(null);
        setFormData({ name: "", email: "", role: "user" });
        setShowModal(true);
    };

    const openEditModal = async (user) => {
        setEditingUser(user);
        setFormData(user);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* FETCH USERS */
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Login first");
                return;
            }
            const res = await getAllUsers();
            setUsers(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const handleSave = async () => {
        try {
            const res = await updateUserAdmin(editingUser._id, formData)
            fetchUsers();
            setShowModal(false);
        } catch (error) {
            alert("Something went wrong")
        }
    };

    /* OPEN DELETE CONFIRM MODAL */
    const openDeleteConfirm = (id) => {
        setDeleteUserId(id);
        setShowDeleteConfirm(true);
    };

    /* CONFIRM DELETE */
    const confirmDeleteUser = async () => {
        try {
            await deleteUser(deleteUserId);
            setUsers((prevUsers) =>
                prevUsers.filter((u) => u._id !== deleteUserId)
            );
        } catch (error) {
            console.error("Failed to delete user", error);
            alert("Failed to delete user");
        } finally {
            setShowDeleteConfirm(false);
            setDeleteUserId(null);
        }
    };

    return (
        <div className="users-page">
            {/* HEADER */}
            <div className="users-header">
                <h1 className="users-title">Users Management</h1>
                {/* <button className="users-add-btn" onClick={openAddModal}>
                    + Add User
                </button> */}
                <span className="queries-count">
                    Total: {users.length}
                </span>
            </div>

            {/* TABLE */}
            <div className="users-table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...users].reverse().map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={`users-role users-role-${user.role}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="users-actions">
                                    <button
                                        className="users-edit-btn"
                                        onClick={() => openEditModal(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="users-delete-btn"
                                        onClick={() =>
                                            openDeleteConfirm(user._id)
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

            {/* ADD / EDIT MODAL */}
            {showModal && (
                <div className="users-modal-overlay">
                    <div className="users-modal">
                        <h2 className="users-modal-title">
                            {editingUser ? "Edit User" : "Add User"}
                        </h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="users-input"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="users-input"
                        />

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="users-select"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div className="users-modal-actions">
                            <button
                                className="users-cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="users-save-btn"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRM MODAL (NEW) */}
            {showDeleteConfirm && (
                <div className="delete-backdrop">
                    <div className="delete-modal">
                        <div className="delete-icon">⚠️</div>
                        <h2>Delete User?</h2>
                        <p>
                            This action cannot be undone. Are you
                            sure you want to proceed?
                        </p>

                        <div className="delete-modal-actions">
                            <button
                                className="btn-secondary"
                                onClick={() =>
                                    setShowDeleteConfirm(false)
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-danger"
                                onClick={confirmDeleteUser}
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

export default Users;
