import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CounsellorDashboard.css';
import API from '../utils/api';
import logo from '../logo.png';

const CounsellorDashboard = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await API.get('/counsellors/cases');
                setCases(res.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch cases. Ensure you are authorized.');
            }
        };
        fetchCases();
    }, []);

    const handleChat = (caseId) => {
        navigate(`/chat/${caseId}`);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="counsellor-dashboard-container">
            <header>
                <img src={logo} alt="Logo" className="counsellor-logo" />
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <main>
                <h1>Welcome, Counsellor</h1>
                <div className="cases-section">
                    <h2>Assigned Cases</h2>
                    {cases.length === 0 ? (
                        <p>No cases assigned yet.</p>
                    ) : (
                        <ul className="case-list">
                            {cases.map((caseItem) => (
                                <li key={caseItem._id}>
                                    <p><strong>Case ID:</strong> {caseItem._id}</p>
                                    <p><strong>Victim:</strong> {caseItem.victim.user.firstName} {caseItem.victim.user.lastName}</p>
                                    <p><strong>Problem:</strong> {caseItem.victim.problemType}</p>
                                    <button onClick={() => handleChat(caseItem._id)}>Chat</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CounsellorDashboard;
