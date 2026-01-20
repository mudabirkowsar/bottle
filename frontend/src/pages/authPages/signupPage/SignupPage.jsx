import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import Footer from '../../../components/footer/Footer';
import Navbar from '../../../components/navbar/Navbar';
import { createUser, verifyOTP } from '../../../services/userAPI'; // ⬅️ add verifyOtp

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔹 NEW STATES FOR OTP
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState("");

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

            setMessage(res?.data?.message || "OTP sent to your email");
            setMessageType("success");

            // 🔹 OPEN OTP MODAL
            setShowOtpModal(true);

        } catch (error) {
            setMessage(error?.response?.data?.message || "Signup failed");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 OTP VERIFY HANDLER
    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            setOtpError("Please enter 6 digit OTP");
            return;
        }

        try {
            setOtpLoading(true);
            setOtpError("");

            const res = await verifyOTP({ email, otp });

            localStorage.setItem("token", res.data.token);

            setShowOtpModal(false);

            navigate("/");

        } catch (error) {
            setOtpError(error?.response?.data?.message || "Invalid OTP");
            console.log(error?.response?.data?.message || "Invalid OTP");
        } finally {
            setOtpLoading(false);
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

            {/* 🔹 OTP MODAL */}
            {showOtpModal && (
                <div className="otp-modal-overlay">
                    <div className="otp-modal">
                        <h2>Email Verification</h2>
                        <p>Enter the 6 digit OTP sent to your email</p>

                        <input
                            type="text"
                            maxLength="6"
                            className="otp-input"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        />

                        {otpError && <p className="otp-error">{otpError}</p>}

                        <button
                            className="otp-btn"
                            onClick={handleVerifyOtp}
                            disabled={otpLoading}
                        >
                            {otpLoading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default SignupPage;
