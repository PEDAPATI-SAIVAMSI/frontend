import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import API from '../utils/api';
import logo from '../logo.png';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', formData);
            const { token, role, _id } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', _id);

            console.log("JWT Token after login:", res.data.token);
            const response = await API.post('/auth/login', formData);
        
        // Check the API response
        console.log('API Response:', response); // Check the full response
        
        // Ensure the token exists in the response
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token); // Store the JWT token
            console.log('JWT Token stored:', response.data.token); // Log to confirm
        } else {
            console.error('No token found in the response');
        }

            alert('Login successful!');
            // Redirect based on role
            if (res.data.role === 'admin') {
                navigate('/admin');
            } else if (res.data.role === 'victim') {
                navigate('/victim');
            } else if (res.data.role === 'counsellor') {
                navigate('/counsellor');
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Login failed!');
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p>
                    Don't have an account? <span onClick={() => navigate('/register')} className="link">Sign Up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
