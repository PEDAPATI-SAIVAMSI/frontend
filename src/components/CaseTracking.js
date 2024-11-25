import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CaseTracking.css';
import API from '../utils/api';
import logo from '../logo.png';

const CaseTracking = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await API.get('/victims/cases');
                setCases(res.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch cases.');
            }
        };
        fetchCases();
    }, []);

    const handleViewCase = (caseId) => {
        navigate(`/chat/${caseId}`);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="case-tracking-container">
            <header>
                <img src={logo} alt="Logo" className="case-logo" />
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <main>
                <h1>Case Tracking</h1>
                {cases.length === 0 ? (
                    <p>No cases to track.</p>
                ) : (
                    <ul className="case-list">
                        {cases.map((caseItem) => (
                            <li key={caseItem._id}>
                                <p><strong>Case ID:</strong> {caseItem._id}</p>
                                <p><strong>Status:</strong> {caseItem.status}</p>
                                <p><strong>Support Type:</strong> {caseItem.victim.supportType}</p>
                                <button onClick={() => handleViewCase(caseItem._id)}>View Case</button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default CaseTracking;
