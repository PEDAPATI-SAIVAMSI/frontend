import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SupportSelection.css';
import API from '../utils/api';
import logo from '../logo.png';

const SupportSelection = () => {
    const [supportType, setSupportType] = useState('');
    const [counselors, setCounselors] = useState([]);
    const navigate = useNavigate();
    const victimId = '12345'; // You should retrieve this victimId dynamically

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!supportType) {
            alert("Please select a support type.");
            return;
        }
    
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        console.log("JWT Token retrieved:", token);
    
        if (!token) {
            console.error("No token found. Please login.");
            alert("You must be logged in to continue.");
            navigate('/login'); // Redirect to login page
            return;
        }
    
        try {
            console.log("Request Payload for fetching counselors:", { supportType });
    
            // Fetch counselors based on the selected support type
            const counselorRes = await API.post('/counsellors/fetch-counsellors', { supportType }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const fetchedCounselors = counselorRes.data; // Extract counselors from the response
            console.log('Fetched Counselors:', fetchedCounselors);
    
            if (!fetchedCounselors || fetchedCounselors.length === 0) {
                alert('No counselors available for the selected support type.');
                return;
            }
    
            // Update the state with fetched counselors
            setCounselors(fetchedCounselors);
    
            // Proceed to assign support
            console.log("Request Payload for assigning support:", { supportType });
            const assignRes = await API.post(`/counsellors/assign-support/${victimId}`, { supportType }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log('Assign Support API Response:', assignRes.data);
    
            // Success notification and redirection
            alert(`Support type selected successfully! Counselor assigned: ${assignRes.data.counselor.name}`);
            navigate(`/dashboard?supportType=${supportType}`);
        } catch (err) {
            console.error('Error during handleSubmit:', err);
    
            // Display detailed error message if available
            const errorMessage = err.response?.data?.message || 'Failed to select support type! Please try again.';
            alert(errorMessage);
        }
    };
    

    const handleAssignSupport = async () => {
        if (!supportType) {
            alert("Please select a support type.");
            return;
        }
    
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No token found. Please login.");
            alert("You must be logged in to assign support.");
            navigate('/login'); // Redirect to login
            return;
        }
    
        try {
            console.log("Request Payload:", { supportType });
    
            // Here we're passing the victimId as part of the URL in the API request
            const res = await API.post(`/victims/select-support/${victimId}`, { supportType }, {
                headers: { Authorization: `Bearer ${token}` }, // Include token in headers
            });
    
            console.log('API Response:', res.data); // Log API response for debugging
            alert('Support type selected and counselor assigned successfully!');
    
            // Navigate to the dashboard with supportType as a query parameter
            navigate(`/dashboard?supportType=${supportType}`);
        } catch (err) {
            console.error('Error in handleAssignSupport:', err);
    
            // Extract and display a meaningful error message
            const errorMessage = err.response?.data?.message || 'Failed to assign support!';
            alert(errorMessage);
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
