import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserType.css';
import logo from '../logo.png';

const UserType = () => {
    const navigate = useNavigate();

    return (
        <div className="user-type-container">
            <img src={logo} alt="Logo" className="user-type-logo" />
            <h2>Select Your Role</h2>
            <div className="user-type-buttons">
                <button onClick={() => navigate('/admin')}>Admin</button>
                <button onClick={() => navigate('/victim')}>Victim</button>
                <button onClick={() => navigate('/counsellor')}>Counsellor</button>
            </div>
        </div>
    );
};

export default UserType;
