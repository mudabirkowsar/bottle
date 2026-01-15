import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // API integration here
    };

    return (
        <div>
            <Navbar />
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="brand">
                        <h1>AquaPure</h1>
                        <p>Pure Water. Pure Life.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-meta">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                        <button type="submit" className="auth-btn">
                            Sign In
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>Don’t have an account?</span>
                        <Link to="/signup">Create account</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;
