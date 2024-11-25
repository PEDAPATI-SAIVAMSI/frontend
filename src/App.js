import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UserType from './components/UserType';
import AdminDashboard from './components/AdminDashboard';
import VictimDashboard from './components/VictimDashboard';
import CounsellorDashboard from './components/CounsellorDashboard';
import IncidentForm from './components/IncidentForm';
import ProofUpload from './components/ProofUpload';
import SupportSelection from './components/SupportSelection';
import CaseTracking from './components/CaseTracking';
import FeedbackForm from './components/FeedbackForm';
import ChatPage from './components/ChatPage';
import WitnessForm from './pages/WitnessForm';
import './styles/global.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-type" element={<UserType />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/victim" element={<VictimDashboard />} />
                <Route path="/counsellor" element={<CounsellorDashboard />} />
                <Route path="/report-incident" element={<IncidentForm />} />
                <Route path="/upload-proof" element={<ProofUpload />} />
                <Route path="/support-selection" element={<SupportSelection />} />
                <Route path="/case-tracking" element={<CaseTracking />} />
                <Route path="/feedback" element={<FeedbackForm />} />
                <Route path="/chat/:caseId" element={<ChatPage />} />
                <Route path="/witness-form" element={<WitnessForm />} />
            </Routes>
        </Router>
    );
}

export default App;
