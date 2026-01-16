import React, { useState } from "react";
import "./Users.css";

function Users() {
    const [users, setUsers] = useState([
        { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", role: "user" },
        { id: 2, name: "Ayesha Khan", email: "ayesha@gmail.com", role: "admin" },
        { id: 3, name: "Mohit Verma", email: "mohit@gmail.com", role: "user" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user",
    });

    /* OPEN ADD MODAL */
    const openAddModal = () => {
        setEditingUser(null);
        setFormData({ name: "", email: "", role: "user" });
        setShowModal(true);
    };

    /* OPEN EDIT MODAL */
    const openEditModal = (user) => {
        setEditingUser(user);
        setFormData(user);
        setShowModal(true);
    };

    /* HANDLE INPUT */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* SAVE USER */
    const handleSave = () => {
        if (editingUser) {
            setUsers(
                users.map((u) =>
                    u.id === editingUser.id ? { ...u, ...formData } : u
                )
            );
        } else {
            setUsers([
                ...users,
                { ...formData, id: Date.now() },
            ]);
        }
        setShowModal(false);
    };

    /* DELETE USER */
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    return (
        <div className="users-page">
            {/* HEADER */}
            <div className="users-header">
                <h1>Users Management</h1>
                <button className="add-btn" onClick={openAddModal}>
                    + Add User
                </button>
            </div>

            {/* TABLE */}
            <div className="users-table">
                <table>
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
                                <td className={`role ${user.role}`}>
                                    {user.role}
                                </td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => openEditModal(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(user.id)}
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
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editingUser ? "Edit User" : "Add User"}</h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div className="modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="save-btn"
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
