import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VictimDashboard.css';
import logo from '../logo.png';

const VictimDashboard = () => {
    const navigate = useNavigate();
    
    const handleReportIncident = () => {
        navigate('/report-incident');
    };

    const handleSupportSelection = () => {
        navigate('/support-selection');
    };

    const handleCaseTracking = () => {
        navigate('/case-tracking');
    };

    const handleFeedback = () => {
        navigate('/feedback');
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="victim-dashboard-container">
            <header>
                <img src={logo} alt="Logo" className="victim-logo" />
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <main>
                <h1>Welcome, Victim</h1>
                <div className="dashboard-buttons">
                    <button onClick={handleReportIncident}>Report Incident</button>
                    <button onClick={handleSupportSelection}>Select Support</button>
                    <button onClick={handleCaseTracking}>Track Case</button>
                    <button onClick={handleFeedback}>Submit Feedback</button>
                </div>
            </main>
        </div>
    );
};

export default VictimDashboard;
