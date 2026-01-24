import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { getAllUsers } from '../../services/adminAPI';

function EditProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Profile Data:', formData);
    };

    return (
        <>
            <Navbar />

            <div className="edit-profile-page">
                {/* LEFT SIDE */}
                <div className="edit-profile-info">
                    <h1>Update Your Profile</h1>
                    <p>
                        Keep your personal information up to date so we can give you
                        a better and more personalized experience.
                    </p>

                    <ul>
                        <li>✔ Secure & Private</li>
                        <li>✔ Used only for account related communication</li>
                        <li>✔ You can update anytime</li>
                    </ul>
                </div>

                {/* RIGHT SIDE */}
                <div className="edit-profile-container">
                    <h2>Edit Profile</h2>

                    <form className="edit-profile-form" onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />

                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );

}

export default EditProfile;
