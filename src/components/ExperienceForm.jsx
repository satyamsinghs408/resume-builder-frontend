import React from 'react';

const ExperienceForm = ({ experience, handleExperienceChange, addExperience, removeExperience }) => {
  return (
    <div style={{ marginTop: '20px', padding: '10px', background: '#fff', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3>Experience</h3>
      
      {experience.map((exp, index) => (
        <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '5px' }}>
          
          <input 
            name="title" 
            placeholder="Job Title" 
            value={exp.title} 
            onChange={(e) => handleExperienceChange(e, index)} 
            style={inputStyle}
          />
          <input 
            name="company" 
            placeholder="Company" 
            value={exp.company} 
            onChange={(e) => handleExperienceChange(e, index)} 
            style={{...inputStyle, marginTop: '5px'}}
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            value={exp.description} 
            onChange={(e) => handleExperienceChange(e, index)} 
            style={{...inputStyle, marginTop: '5px', height: '60px', resize: 'vertical'}}
          />
          
          {experience.length > 1 && (
            <button type="button" onClick={() => removeExperience(index)} style={removeBtnStyle}>
              Remove Job
            </button>
          )}
        </div>
      ))}
      
      <button type="button" onClick={addExperience} style={addBtnStyle}>
        + Add Job
      </button>
    </div>
  );
};

const inputStyle = { padding: '8px', width: '100%', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' };
const removeBtnStyle = { marginTop: '5px', background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' };
const addBtnStyle = { background: '#333', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '3px' };

export default ExperienceForm;