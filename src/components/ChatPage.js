import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ChatPage.css';
import API from '../utils/api';
import logo from '../logo.png';

const ChatPage = () => {
    const { caseId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const res = await API.get(`/counsellors/cases`);
                const currentCase = res.data.find(c => c._id === caseId);
                if (!currentCase) {
                    alert('Case not found or not authorized.');
                    navigate('/');
                } else {
                    setMessages(currentCase.messages);
                }
            } catch (err) {
                console.error(err);
                alert('Failed to fetch case details.');
            }
        };
        fetchCase();
    }, [caseId, navigate]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        try {
            const res = await API.post(`/counsellors/case/${caseId}/message`, { message: input });
            setMessages(res.data.messages);
            setInput('');
        } catch (err) {
            console.error(err);
            alert('Failed to send message.');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="chat-container">
            <header>
                <img src={logo} alt="Logo" className="chat-logo" />
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <main>
                <h1>Chat with Victim</h1>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === localStorage.getItem('userId') ? 'sent' : 'received'}`}>
                            <p>{msg.message}</p>
                            <span>{new Date(msg.timestamp).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <form className="chat-form" onSubmit={handleSend}>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type your message..." 
                        required 
                    />
                    <button type="submit">Send</button>
                </form>
            </main>
        </div>
    );
};

export default ChatPage;
