import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeedbackForm.css';
import API from '../utils/api';
import logo from '../logo.png';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/victims/feedback', { feedback });
            alert('Feedback submitted successfully!');
            navigate('/victim');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to submit feedback!');
        }
    };

    return (
        <div className="feedback-container">
            <img src={logo} alt="Logo" className="feedback-logo" />
            <form className="feedback-form" onSubmit={handleSubmit}>
                <h2>Feedback Form</h2>
                <div className="form-group">
                    <label>Your Feedback</label>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="submit-button">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
