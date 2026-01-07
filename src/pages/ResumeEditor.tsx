import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { downloadResumePDF } from '../utils/pdfGenerator';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalForm from '../components/PersonalForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import { Resume } from '../types';


const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<Resume>({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    experience: [{ title: '', company: '', description: '' }],
    education: [{ school: '', degree: '', year: '' }]
  });
  const [template, setTemplate] = useState<string>('classic'); 
  
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // CHECK: Are we editing an existing resume?
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);

  useEffect(() => {
    // If data was sent from Dashboard, load it!
    if (location.state && location.state.resumeToEdit) {
      const { _id, firstName, lastName, email, phone, address, experience, education } = location.state.resumeToEdit;
      
      setResumeData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        address: address || '',
        experience: experience || [],
        education: education || []
      });
      setIsEditing(true);
      setCurrentResumeId(_id || null);
    }
  }, [location]);

  // --- HANDLERS (Same as before) ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const list = [...resumeData.experience];
    (list[index] as any)[e.target.name] = e.target.value; // Type assertion needed or typed indexing
    setResumeData({ ...resumeData, experience: list });
  };
  const addExperience = () => setResumeData({ ...resumeData, experience: [...resumeData.experience, { title: '', company: '', description: '' }] });
  const removeExperience = (i: number) => {
    const list = [...resumeData.experience];
    list.splice(i, 1);
    setResumeData({ ...resumeData, experience: list });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const list = [...resumeData.education];
    (list[index] as any)[e.target.name] = e.target.value;
    setResumeData({ ...resumeData, education: list });
  };

  const addEducation = () => setResumeData({ ...resumeData, education: [...resumeData.education, { school: '', degree: '', year: '' }] });
  const removeEducation = (i: number) => {
    const list = [...resumeData.education];
    list.splice(i, 1);
    setResumeData({ ...resumeData, education: list });
  };

  // --- SAVE FUNCTION (UPDATED) ---
  const saveResume = async () => {
    if (!user) {
      alert("Please login to save your resume.");
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      };

      if (isEditing) {
        // UPDATE Existing Resume (PUT)
        await axios.put(`http://localhost:5000/api/resumes/${currentResumeId}`, resumeData, config);
        alert('Resume Updated Successfully!');
      } else {
        // CREATE New Resume (POST)
        await axios.post('http://localhost:5000/api/resumes', resumeData, config);
        alert('Resume Created Successfully!');
      }
      
      // Optional: Redirect back to dashboard after save
      navigate('/dashboard');

    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 overflow-hidden">
      
      {/* LEFT: Editor Form */}
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto h-full scrollbar-thin">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Resume' : 'Create New Resume'}
          </h2>
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)} 
            className="p-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none"
          >
            <option value="classic">Classic Template</option>
            <option value="modern">Modern Template</option>
          </select>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); saveResume(); }}>
          <PersonalForm resumeData={resumeData} handleChange={handleChange} />
          
          <ExperienceForm 
            experience={resumeData.experience} 
            handleExperienceChange={handleExperienceChange}
            addExperience={addExperience}
            removeExperience={removeExperience}
          />
          
          <EducationForm 
            education={resumeData.education} 
            handleEducationChange={handleEducationChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />

          <div className="flex gap-4 mt-8 mb-20">
            <button 
              type="submit" 
              className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-bold shadow"
            >
              {isEditing ? 'Update Resume' : 'Save to Cloud'}
            </button>

            <button 
              type="button" 
              onClick={() => downloadResumePDF(resumeData, template)} 
              className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-bold shadow"
            >
              Download PDF
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="hidden lg:flex w-1/2 bg-gray-200 p-8 overflow-y-auto h-full items-center justify-center">
        <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-10 transform scale-90 origin-top">
          {/* TEMPLATE RENDERING LOGIC */}
          {template === 'classic' ? (
             <div className="text-gray-800">
                <h1 className="text-center text-3xl font-bold mb-2 uppercase">{resumeData.firstName} {resumeData.lastName}</h1>
                <p className="text-center text-gray-600 mb-6">{resumeData.email} | {resumeData.phone}</p>
                <hr className="border-t-2 border-gray-300 my-4" />
                
                <h3 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h3>
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <h4 className="font-bold text-lg">{exp.title}</h4>
                    <div className="italic text-gray-600 mb-1">{exp.company}</div>
                    <p className="text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}

                <h3 className="text-xl font-bold uppercase border-b border-gray-300 mb-4 pb-1 mt-6">Education</h3>
                 {resumeData.education.map((edu, i) => (
                  <div key={i} className="mb-2 flex justify-between">
                    <div>
                      <div className="font-bold">{edu.school}</div>
                      <div className="italic text-sm">{edu.degree}</div>
                    </div>
                    <div className="text-sm font-bold">{edu.year}</div>
                  </div>
                ))}
             </div>
          ) : (
             <div className="flex h-full">
                <div className="w-1/3 border-r-2 border-gray-800 pr-6 text-right">
                  <h4 className="font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">CONTACT</h4>
                  <div className="text-sm text-gray-600 mb-1">{resumeData.email}</div>
                  <div className="text-sm text-gray-600">{resumeData.phone}</div>
                  <div className="text-sm text-gray-600">{resumeData.address}</div>

                  <h4 className="font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4 mt-8">EDUCATION</h4>
                   {resumeData.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                      <div className="font-bold text-sm">{edu.school}</div>
                      <div className="text-xs italic">{edu.degree}</div>
                      <div className="text-xs font-bold text-gray-500">{edu.year}</div>
                    </div>
                  ))}
                </div>
                <div className="w-2/3 pl-8">
                  <h1 className="text-4xl font-extrabold text-gray-800 mb-6 uppercase tracking-wider leading-none">
                    {resumeData.firstName} <br/>
                    <span className="text-blue-900">{resumeData.lastName}</span>
                  </h1>
                  
                  <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-900 pb-1 mb-6">EXPERIENCE</h3>
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="mb-6">
                      <h4 className="font-bold text-lg">{exp.title}</h4>
                      <div className="italic text-gray-600 text-sm mb-2">{exp.company}</div>
                      <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;