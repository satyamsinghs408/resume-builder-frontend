import React from 'react';

const PersonalForm = ({ resumeData, handleChange }) => {
  return (
    <div style={{ padding: '10px', background: '#fff', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3>Personal Details</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          name="firstName" 
          placeholder="First Name" 
          value={resumeData.firstName} 
          onChange={handleChange} 
          style={inputStyle} 
        />
        <input 
          name="lastName" 
          placeholder="Last Name" 
          value={resumeData.lastName} 
          onChange={handleChange} 
          style={inputStyle} 
        />
        <input 
          name="email" 
          placeholder="Email" 
          value={resumeData.email} 
          onChange={handleChange} 
          style={inputStyle} 
        />
        <input 
          name="phone" 
          placeholder="Phone" 
          value={resumeData.phone} 
          onChange={handleChange} 
          style={inputStyle} 
        />
        <input 
          name="address" 
          placeholder="Address" 
          value={resumeData.address} 
          onChange={handleChange} 
          style={inputStyle} 
        />
      </div>
    </div>
  );
};

// Simple style object to keep it clean
const inputStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box' // Fixes padding issues
};

export default PersonalForm;