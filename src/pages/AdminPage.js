import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';
import logo from '../logo.png';

const AdminPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { victims, counsellors } = location.state || {};

    return (
        <div className="admin-page-container">
            <header>
                <img src={logo} alt="Logo" className="admin-page-logo" />
                <button onClick={() => navigate('/admin')} className="back-button">Back to Dashboard</button>
            </header>
            <main>
                {victims ? (
                    <>
                        <h2>Victims List</h2>
                        <ul className="admin-list">
                            {victims.map(victim => (
                                <li key={victim._id}>
                                    <p><strong>Name:</strong> {victim.user.firstName} {victim.user.lastName}</p>
                                    <p><strong>Email:</strong> {victim.user.email}</p>
                                    <p><strong>Phone:</strong> {victim.user.phone}</p>
                                    <p><strong>Problem Type:</strong> {victim.problemType}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : counsellors ? (
                    <>
                        <h2>Counsellors List</h2>
                        <ul className="admin-list">
                            {counsellors.map(counsellor => (
                                <li key={counsellor._id}>
                                    <p><strong>Name:</strong> {counsellor.user.firstName} {counsellor.user.lastName}</p>
                                    <p><strong>Email:</strong> {counsellor.user.email}</p>
                                    <p><strong>Phone:</strong> {counsellor.user.phone}</p>
                                    <p><strong>Specialization:</strong> {counsellor.specialization}</p>
                                    <p><strong>Experience:</strong> {counsellor.experience} years</p>
                                    <p><strong>Service Type:</strong> {counsellor.typeOfService}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No data available.</p>
                )}
            </main>
        </div>
    );
};

export default AdminPage;
