import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import { loginUser } from '../../../services/userAPI';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success | error
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');

        if (!formData.email || !formData.password) {
            setMessage('All fields are required');
            setMessageType('error');
            return;
        }

        try {
            setLoading(true);
            const res = await loginUser(formData);

            localStorage.setItem('token', res.data.token);

            setMessage('Login successful');
            setMessageType('success');

            setTimeout(() => {
                navigate('/');
            }, 1200);

        } catch (error) {
            setMessage(
                error?.response?.data?.message || 'Invalid email or password'
            );
            setMessageType('error');
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
                        <p>Pure Water. Pure Life.</p>
                    </div>

                    {/* MESSAGE BOX */}
                    {message && (
                        <div className={`message-box ${messageType}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
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
                            />
                        </div>

                        <div className="form-meta">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
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
