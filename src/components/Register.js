import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

import API from '../utils/api';
import logo from '../logo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'victim',
        gender: '',
        dateOfBirth: '',
        specialization: '',
        experience: '',
        typeOfService: 'Both',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Registration failed!');
        }
    };

    return (
        <div className="register-container">
            <img src={logo} alt="Logo" className="register-logo" />
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="victim">Victim</option>
                        <option value="counsellor">Counsellor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {formData.role === 'counsellor' && (
                    <>
                        <div className="form-group">
                            <label>Specialization</label>
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Experience (Years)</label>
                            <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Type of Service</label>
                            <select name="typeOfService" value={formData.typeOfService} onChange={handleChange} required>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
                <button type="submit" className="register-button">Register</button>
                <p>
                    Already have an account? <span onClick={() => navigate('/login')} className="link">Login</span>
                </p>
            </form>
        </div>
    );
};

export default Register;
