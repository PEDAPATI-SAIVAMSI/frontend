import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SupportSelection.css';
import API from '../utils/api';
import logo from '../logo.png';

const SupportSelection = () => {
    const [supportType, setSupportType] = useState('');
    const [counselors, setCounselors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!supportType) {
            alert("Please select a support type.");
            return;
        }

        const token = localStorage.getItem('authToken'); // Ensure you're storing the token correctly
        console.log("JWT Token retrieved:", token);
        if (!token) {
            console.error("No token found. Please login.");
          //  window.location.href = '/login';  // Redirect to login if no token
            return;
        }

        try {

            console.log("Request Payload:", { supportType });

            const response = await API.post('/api/counsellors/fetch-counsellors', { supportType }, {
                headers: { Authorization: `Bearer ${token}` } // Token in header
            });

            console.log('API Response:', response.data);

            // Fetch available counselors based on the selected support type
            const counselorRes = await API.post('/api/counsellors/fetch-counsellors', { supportType });
            const fetchedCounselors = counselorRes.data; // Use the data directly
            setCounselors(fetchedCounselors); // Update state for UI rendering

            if (fetchedCounselors.length === 0) {
                alert('No counselors available for the selected support type.');
                return;
            }

            // Proceed to assign support
            const assignRes = await API.post('/assign-support', { supportType });
            console.log('API Response:', assignRes.data);

            alert(`Support type selected successfully! Counselor assigned: ${assignRes.data.counselor.name}`);

            // Navigate to the dashboard with supportType as a query parameter
            navigate(`/dashboard?supportType=${supportType}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to select support type!');
        }
    };



    const handleAssignSupport = async () => {
        try {
            const res = await API.post('/victims/select-support', { supportType });
            console.log('API Response:', res.data); // Log for debugging
            alert('Support type selected and counselor assigned successfully!');

            // Navigate to the dashboard
            navigate(`/dashboard?supportType=${supportType}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to assign support!');
        }
    };

    return (
        <div className="support-selection-container">
            <img src={logo} alt="Logo" className="support-logo" />
            <form className="support-form" onSubmit={handleSubmit}>
                <h2>Select Type of Support</h2>
                <div className="form-group">
                    <label>Support Type</label>
                    <select
                        name="supportType"
                        value={supportType}
                        onChange={(e) => setSupportType(e.target.value)}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Mental">Mental Support</option>
                        <option value="Physical">Physical Support</option>
                        <option value="Legal">Legal Support</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Proceed</button>
            </form>

            {/* Display counselors dynamically */}
            {counselors.length > 0 && (
                <div className="counselor-list">
                    <h3>Available Counselors</h3>
                    <ul>
                        {counselors.map((counselor) => (
                            <li key={counselor._id}>
                                <strong>{counselor.name}</strong> - {counselor.specialization} ({counselor.typeOfService})
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAssignSupport} className="submit-button">Assign Support</button>
                </div>
            )}

            {counselors.length === 0 && (
                <p className="no-counselor-message">No counselors available for the selected support type.</p>
            )}
        </div>
    );
};

export default SupportSelection;
