// frontend/src/components/ProofUpload.js
import React, { useState } from 'react';
import '../styles/ProofUpload.css';  // Import the CSS file for styling

const ProofUpload = () => {
  const [proofFile, setProofFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      setMessage('');
    }
  };

  const handleFileUpload = () => {
    if (!proofFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    // Here, you can implement your file upload logic, e.g., sending the file to a backend API
    setMessage(`File ${proofFile.name} uploaded successfully!`);
  };

  return (
    <div className="proof-upload-container">
      <h2>Upload Proof</h2>
      
      <div className="file-upload-section">
        <label htmlFor="file-input">Choose proof file (Image, Video, Audio, or Text):</label>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
        />
        {proofFile && (
          <div className="file-info">
            <p>File selected: {proofFile.name}</p>
          </div>
        )}
      </div>
      
      <div className="file-type-selection">
        <label>Type of proof:</label>
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Image">Image</option>
          <option value="Video">Video</option>
          <option value="Audio">Audio</option>
          <option value="Text">Text</option>
        </select>
      </div>

      <button className="upload-button" onClick={handleFileUpload}>
        Upload Proof
      </button>

      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default ProofUpload;
