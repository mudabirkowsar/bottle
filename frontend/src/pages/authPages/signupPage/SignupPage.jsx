import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import Footer from '../../../components/footer/Footer';
import Navbar from '../../../components/navbar/Navbar';
import { createUser } from '../../../services/userAPI';

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // success | error
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");

        if (!name || !email || !password || !confirmPassword) {
            setMessage("All fields are required");
            setMessageType("error");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setMessageType("error");
            return;
        }

        const formData = { name, email, password };

        try {
            setLoading(true);
            const res = await createUser(formData);

            localStorage.setItem("token", res.data.token);

            setMessage(res?.data?.message || "Account created successfully");
            setMessageType("success");

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (error) {
            setMessage(
                error?.response?.data?.message || "Signup failed"
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="brand">
                        <h1>AquaPure</h1>
                        <p>Create your account</p>
                    </div>

                    {/* MESSAGE BOX */}
                    {message && (
                        <div className={`message-box ${messageType}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>Already have an account?</span>
                        <Link to="/login">Sign in</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default SignupPage;
