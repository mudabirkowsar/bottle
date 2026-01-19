import React, { useState } from "react";
import "./Users.css";
import { useEffect } from "react";
import { deleteUser, getAllUsers } from "../../services/adminAPI";

function Users() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Login first");
                return;
            }
            const res = await getAllUsers();
            setUsers(res.data.data)

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);


    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user",
    });

    const openAddModal = () => {
        setEditingUser(null);
        setFormData({ name: "", email: "", role: "user" });
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setFormData(user);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (editingUser) {
            setUsers(
                users.map((u) =>
                    u.id === editingUser.id ? { ...u, ...formData } : u
                )
            );
        } else {
            setUsers([...users, { ...formData, id: Date.now() }]);
        }
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(id);

            setUsers((prevUsers) =>
                prevUsers.filter((u) => u._id !== id)
            );

        } catch (error) {
            console.error("Failed to delete user", error);
            alert("Failed to delete user");
        }
    };


    return (
        <div className="users-page">
            {/* HEADER */}
            <div className="users-header">
                <h1 className="users-title">Users Management</h1>
                <button className="users-add-btn" onClick={openAddModal}>
                    + Add User
                </button>
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
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`users-role users-role-${user.role}`}>
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
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
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
        </div>
    );
}

export default Users;
