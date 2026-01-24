import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { getCurrentUser, updateCurrentUser } from '../../services/userAPI';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pin: '',
    });

    const [user, setUser] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const fetchUser = async () => {
        try {
            const res = await getCurrentUser();
            const userData = res.data.data;

            setUser(userData);

            setFormData({
                name: userData?.name || '',
                email: userData?.email || '',
                phone: userData?.phone || '',
                address: userData?.address || '',
                city: userData?.city || '',
                state: userData?.state || '',
                pin: userData?.pin || '',
            });
        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return;

        try {
            await updateCurrentUser(user._id, formData);

            // ✅ Show success message
            setSuccessMsg('Profile updated successfully');

            // ✅ Redirect after delay
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            alert("Something went wrong");
            console.error(error);
        }
    };

    if (!user) {
        return <p style={{ textAlign: "center" }}>Loading profile...</p>;
    }

    return (
        <>
            <Navbar />

            {/* ✅ SUCCESS NOTIFICATION */}
            {successMsg && (
                <div className="success-toast">
                    {successMsg}
                </div>
            )}

            <div className="edit-profile-page">
                <div className="edit-profile-info">
                    <h1>Update Your Profile</h1>
                    <p>Keep your personal information up to date.</p>
                </div>

                <div className="edit-profile-container">
                    <h2>Edit Profile</h2>

                    <form className="edit-profile-form" onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Enter Full Name" value={formData.name} onChange={handleChange} />
                        <input type="email" name="email" value={formData.email} disabled />
                        <input type="text" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} />
                        <textarea name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} />
                        <input type="text" name="city" placeholder="Enter City Name" value={formData.city} onChange={handleChange} />
                        <input type="text" name="state" placeholder="Enter State Name" value={formData.state} onChange={handleChange} />
                        <input type="text" name="pin" placeholder="Enter Pincode" value={formData.pin} onChange={handleChange} />

                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default EditProfile;
