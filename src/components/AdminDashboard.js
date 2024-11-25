import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import API from '../utils/api';
import logo from '../logo.png';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [victims, setVictims] = useState([]);
    const [counsellors, setCounsellors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const victimsRes = await API.get('/admin/victims');
                setVictims(victimsRes.data);
                const counsellorsRes = await API.get('/admin/counsellors');
                setCounsellors(counsellorsRes.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch data. Ensure you are authorized.');
            }
        };
        fetchData();
    }, []);

    const handleViewVictims = () => {
        navigate('/admin/victims', { state: { victims } });
    };

    const handleViewCounsellors = () => {
        navigate('/admin/counsellors', { state: { counsellors } });
    };

    return (
        <div className="admin-dashboard-container">
            <header>
                <img src={logo} alt="Logo" className="admin-logo" />
                <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="logout-button">Logout</button>
            </header>
            <main>
                <h1>Admin Dashboard</h1>
                <div className="dashboard-buttons">
                    <button onClick={handleViewVictims}>View Victims</button>
                    <button onClick={handleViewCounsellors}>View Counsellors</button>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
