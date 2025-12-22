import React from 'react';

const EducationForm = ({ education, handleEducationChange, addEducation, removeEducation }) => {
  return (
    <div style={{ marginTop: '20px', padding: '10px', background: '#fff', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3>Education</h3>
      
      {education.map((edu, index) => (
        <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '5px' }}>
          <input 
            name="school" 
            placeholder="School / University" 
            value={edu.school} 
            onChange={(e) => handleEducationChange(e, index)} 
            style={inputStyle}
          />
          <input 
            name="degree" 
            placeholder="Degree" 
            value={edu.degree} 
            onChange={(e) => handleEducationChange(e, index)} 
            style={{...inputStyle, marginTop: '5px'}}
          />
          <input 
            name="year" 
            placeholder="Graduation Year" 
            value={edu.year} 
            onChange={(e) => handleEducationChange(e, index)} 
            style={{...inputStyle, marginTop: '5px'}}
          />
          
          {education.length > 1 && (
            <button type="button" onClick={() => removeEducation(index)} style={removeBtnStyle}>
              Remove Education
            </button>
          )}
        </div>
      ))}
      
      <button type="button" onClick={addEducation} style={addBtnStyle}>
        + Add Education
      </button>
    </div>
  );
};

const inputStyle = { padding: '8px', width: '100%', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' };
const removeBtnStyle = { marginTop: '5px', background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', fontSize: '12px' };
const addBtnStyle = { background: '#333', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '3px' };

export default EducationForm;