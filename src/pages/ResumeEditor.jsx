import React, { useState } from 'react';
import axios from 'axios';
import { downloadResumePDF } from '../utils/pdfGenerator';
import PersonalForm from '../components/PersonalForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';

const ResumeEditor = () => {
  // 1. STATE
  const [resumeData, setResumeData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    experience: [{ title: '', company: '', description: '' }],
    education: [{ school: '', degree: '', year: '' }]
  });
  const [template, setTemplate] = useState('classic'); 

  // 2. HANDLERS
  const handleChange = (e) => setResumeData({ ...resumeData, [e.target.name]: e.target.value });

  const handleExperienceChange = (e, index) => {
    const list = [...resumeData.experience];
    list[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, experience: list });
  };
  const addExperience = () => setResumeData({ ...resumeData, experience: [...resumeData.experience, { title: '', company: '', description: '' }] });
  const removeExperience = (i) => {
    const list = [...resumeData.experience];
    list.splice(i, 1);
    setResumeData({ ...resumeData, experience: list });
  };

  const handleEducationChange = (e, index) => {
    const list = [...resumeData.education];
    list[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, education: list });
  };
  const addEducation = () => setResumeData({ ...resumeData, education: [...resumeData.education, { school: '', degree: '', year: '' }] });
  const removeEducation = (i) => {
    const list = [...resumeData.education];
    list.splice(i, 1);
    setResumeData({ ...resumeData, education: list });
  };

  const saveResume = async () => {
    try {
      await axios.post('http://localhost:5000/api/resumes', resumeData);
      alert('Resume saved to Cloud successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save.');
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '20px', background: '#f5f7fa', minHeight: '100vh' }}>
      
      {/* --- LEFT SIDE: THE FORMS --- */}
      <div className="form-section" style={{ flex: 1, height: '90vh', overflowY: 'scroll', paddingRight: '15px' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2 style={{margin: 0}}>Editor</h2>
          <select value={template} onChange={(e) => setTemplate(e.target.value)} style={{padding: '8px', borderRadius: '4px'}}>
            <option value="classic">Classic Template</option>
            <option value="modern">Modern Template</option>
          </select>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); saveResume(); }}>
          
          {/* 1. Personal Component */}
          <PersonalForm resumeData={resumeData} handleChange={handleChange} />

          {/* 2. Experience Component */}
          <ExperienceForm 
            experience={resumeData.experience} 
            handleExperienceChange={handleExperienceChange}
            addExperience={addExperience}
            removeExperience={removeExperience}
          />

          {/* 3. Education Component */}
          <EducationForm 
            education={resumeData.education} 
            handleEducationChange={handleEducationChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />

          <div style={{ marginTop: '20px', paddingBottom: '50px' }}>
            <button type="submit" style={{ padding: '12px 24px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px', fontSize: '16px' }}>
              Save
            </button>
            <button type="button" onClick={() => downloadResumePDF(resumeData, template)} style={{ padding: '12px 24px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
              Download PDF
            </button>
          </div>
        </form>
      </div>

      {/* --- RIGHT SIDE: PREVIEW (UNCHANGED) --- */}
      <div className="preview-section" style={{ flex: 1, paddingLeft: '20px' }}>
        <div style={{ background: 'white', padding: '40px', minHeight: '800px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {template === 'classic' ? (
             <div>
                <h1 style={{textAlign: 'center', fontSize: '28px', marginBottom: '5px'}}>{resumeData.firstName} {resumeData.lastName}</h1>
                <p style={{textAlign: 'center', color: '#555'}}>{resumeData.email} | {resumeData.phone}</p>
                <hr style={{margin: '20px 0'}} />
                {resumeData.experience.map((exp, i) => <div key={i} style={{marginBottom: '15px'}}><h4 style={{margin:0}}>{exp.title}</h4><div style={{fontStyle: 'italic', color: '#666'}}>{exp.company}</div><div style={{marginTop: '5px'}}>{exp.description}</div></div>)}
             </div>
          ) : (
             <div style={{display: 'flex'}}>
                <div style={{width: '30%', borderRight: '2px solid #2c3e50', paddingRight: '15px', textAlign: 'right'}}>
                  <h4 style={{color: '#2c3e50', borderBottom: '1px solid #ccc'}}>Contact</h4>
                  <div style={{fontSize: '13px', marginBottom: '5px'}}>{resumeData.email}</div>
                  <div style={{fontSize: '13px'}}>{resumeData.phone}</div>
                </div>
                <div style={{width: '70%', paddingLeft: '20px'}}>
                  <h1 style={{color: '#2c3e50', margin: '0 0 20px 0', textTransform: 'uppercase'}}>{resumeData.firstName} <br/>{resumeData.lastName}</h1>
                  <h3 style={{color: '#2c3e50', borderBottom: '1px solid #ccc'}}>Experience</h3>
                  {resumeData.experience.map((exp, i) => <div key={i} style={{marginBottom: '15px'}}><h4 style={{margin:0}}>{exp.title}</h4><div style={{fontStyle: 'italic', fontSize: '14px', marginBottom: '5px'}}>{exp.company}</div><p style={{fontSize: '14px'}}>{exp.description}</p></div>)}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;