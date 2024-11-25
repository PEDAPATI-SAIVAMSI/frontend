import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WitnessForm.css';
import API from '../utils/api';
import logo from '../logo.png';

const WitnessForm = () => {
    const [witnesses, setWitnesses] = useState([{ name: '', relation: '' }]);
    const navigate = useNavigate();

    const handleChange = (index, e) => {
        const newWitnesses = [...witnesses];
        newWitnesses[index][e.target.name] = e.target.value;
        setWitnesses(newWitnesses);
    };

    const handleAddWitness = () => {
        setWitnesses([...witnesses, { name: '', relation: '' }]);
    };

    const handleRemoveWitness = (index) => {
        const newWitnesses = witnesses.filter((_, i) => i !== index);
        setWitnesses(newWitnesses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/witnesses/submit', { witnesses });
            console.log('Response:', res.data); // Use the response if needed
            // Implement API call to submit witness details
            alert('Witness details submitted successfully!');
            navigate('/support-selection');
        } catch (err) {
            console.error(err);
            alert('Failed to submit witness details!');
        }
    };

    return (
        <div className="witness-form-container">
            <img src={logo} alt="Logo" className="witness-logo" />
            <form className="witness-form" onSubmit={handleSubmit}>
                <h2>Witness Details</h2>
                {witnesses.map((witness, index) => (
                    <div key={index} className="witness-group">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={witness.name}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Relation</label>
                            <select
                                name="relation"
                                value={witness.relation}
                                onChange={(e) => handleChange(index, e)}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Friend">Friend</option>
                                <option value="Relative">Relative</option>
                                <option value="Colleague">Colleague</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {witnesses.length > 1 && (
                            <button type="button" onClick={() => handleRemoveWitness(index)} className="remove-button">
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddWitness} className="add-button">Add Another Witness</button>
                <button type="submit" className="submit-button">Submit Witness Details</button>
            </form>
        </div>
    );
};

export default WitnessForm;
