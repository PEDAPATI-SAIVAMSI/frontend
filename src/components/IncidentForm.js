import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/IncidentForm.css';
import API from '../utils/api';
import logo from '../logo.png';

const IncidentForm = () => {
    const [formData, setFormData] = useState({
        problemType: '',
        description: '',
        date: '',
        time: '',
        place: '',
    });
    const [proofs, setProofs] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) => {
        setProofs(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('problemType', formData.problemType);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('time', formData.time);
        data.append('place', formData.place);
        for (let i = 0; i < proofs.length; i++) {
            data.append('proofs', proofs[i]);
        }

        try {
            await API.post('/victims/report-incident', data);
            alert('Incident reported successfully!');
            navigate('/support-selection');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to report incident!');
        }

        
        
    };

    return (
        <div className="incident-form-container">
            <img src={logo} alt="Logo" className="incident-logo" />
            <form className="incident-form" onSubmit={handleSubmit}>
                <h2>Report an Incident</h2>
                <div className="form-group">
                    <label>Type of Problem</label>
                    <select name="problemType" value={formData.problemType} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Online Harassment">Online Harassment</option>
                        <option value="Abuse">Abuse</option>
                        <option value="Harassment">Harassment</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Place</label>
                    <input type="text" name="place" value={formData.place} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Upload Proofs</label>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>
                <button type="submit" className="submit-button">Submit Incident</button>
            </form>
        </div>
    );
};

export default IncidentForm;
