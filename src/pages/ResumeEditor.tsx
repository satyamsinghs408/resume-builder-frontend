import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { useEditor } from '../context/EditorContext';
import { downloadResumePDF } from '../utils/pdfGenerator';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalForm from '../components/PersonalForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import { Resume, ThemeConfig } from '../types';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import EditorLayout from '../components/editor/EditorLayout';
import ColorPicker from '../components/ui/ColorPicker';
import FileUpload from '../components/editor/FileUpload';

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<Resume>({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    experience: [{ title: '', company: '', description: '' }],
    education: [{ school: '', degree: '', year: '' }]
  });
  
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimalist' | 'executive' | 'creative'>('classic'); 
  const [theme, setTheme] = useState<ThemeConfig>({
    primaryColor: '#2c3e50',
    secondaryColor: '#ffffff',
    fontFamily: 'Roboto'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 4;

  const { user } = useAuth();
  const { endpoints } = useApi();
  const { setEditorSteps, clearEditorSteps } = useEditor();
  const location = useLocation();
  const navigate = useNavigate();

  // Sync step state with global header
  useEffect(() => {
    setEditorSteps(currentStep, TOTAL_STEPS);
    return () => clearEditorSteps(); // Clear on unmount
  }, [currentStep, setEditorSteps, clearEditorSteps]);

  // CHECK: Are we editing an existing resume?
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
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

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const list = [...resumeData.experience];
    (list[index] as any)[e.target.name] = e.target.value; 
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

  // --- SAVE FUNCTION ---
  const saveResume = async () => {
    if (!user) {
      alert("Please login to save your resume.");
      return;
    }

    setIsSaving(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      };

      if (isEditing) {
        await axios.put(`${endpoints.resumes}/${currentResumeId}`, resumeData, config);
        alert('Resume Updated Successfully!');
      } else {
        await axios.post(endpoints.resumes, resumeData, config);
        alert('Resume Created Successfully!');
      }
      navigate('/dashboard');

    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save.');
    } finally {
      setIsSaving(false);
    }
  };

  // --- NAVIGATION ---
  const handleNext = () => {
      if (currentStep === TOTAL_STEPS) {
          saveResume();
      } else {
          setCurrentStep(curr => curr + 1);
      }
  };

  const handleBack = () => {
      if (currentStep > 1) {
          setCurrentStep(curr => curr - 1);
      } else {
          navigate('/dashboard');
      }
  };

  const getStepTitle = () => {
      switch(currentStep) {
          case 1: return "Import & Personal Information";
          case 2: return "Experience";
          case 3: return "Education";
          case 4: return "Finalize & Download";
          default: return "";
      }
  };

  const handleUploadSuccess = (data: Resume) => {
    // Update ALL fields from parsed PDF - not just contact info!
    setResumeData(prev => ({
        ...prev,
        firstName: data.firstName || prev.firstName,
        lastName: data.lastName || prev.lastName,
        email: data.email || prev.email,
        phone: data.phone || prev.phone,
        address: data.address || prev.address,
        experience: data.experience && data.experience.length > 0 && data.experience[0].title 
          ? data.experience 
          : prev.experience,
        education: data.education && data.education.length > 0 && data.education[0].school 
          ? data.education 
          : prev.education,
    }));

    // Build a summary of what was imported (like major resume builders do)
    const imported: string[] = [];
    if (data.firstName || data.lastName) imported.push('Name');
    if (data.email) imported.push('Email');
    if (data.phone) imported.push('Phone');
    if (data.experience && data.experience.length > 0 && data.experience[0].title) {
      imported.push(`${data.experience.length} Experience(s)`);
    }
    if (data.education && data.education.length > 0 && data.education[0].school) {
      imported.push(`${data.education.length} Education(s)`);
    }

    const summary = imported.length > 0 
      ? `Imported: ${imported.join(', ')}` 
      : 'Could not extract structured data';
    
    alert(`Resume parsed successfully!\n\n${summary}\n\nPlease proceed through each step to review and edit the details.`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 overflow-hidden font-sans pt-14 md:pt-16">
      
      {/* LEFT: Editor Wizard */}
      <div className="w-full lg:w-1/2 h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] z-10 bg-white overflow-hidden">
        <EditorLayout
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            title={getStepTitle()}
            onNext={handleNext}
            onBack={handleBack}
            isSubmitting={isSaving}
        >
            {currentStep === 1 && (
                <div className="animate-fadeIn">
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                    <div className="flex items-center gap-3 my-6 md:my-8">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider">Or enter manually</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    <PersonalForm resumeData={resumeData} handleChange={handleChange} />
                </div>
            )}
            {currentStep === 2 && (
                <ExperienceForm 
                    experience={resumeData.experience} 
                    handleExperienceChange={handleExperienceChange}
                    addExperience={addExperience}
                    removeExperience={removeExperience}
                />
            )}
            {currentStep === 3 && (
                <EducationForm 
                    education={resumeData.education} 
                    handleEducationChange={handleEducationChange}
                    addEducation={addEducation}
                    removeEducation={removeEducation}
                />
            )}
            {currentStep === 4 && (
                <div className="animate-fadeIn space-y-5 md:space-y-8">
                    <div className="space-y-3 md:space-y-4">
                         <h3 className="font-bold text-gray-800 text-base md:text-lg">1. Choose Template</h3>
                         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                              {/* Classic */}
                              <button 
                                  onClick={() => setTemplate('classic')}
                                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${template === 'classic' ? 'border-blue-600 bg-blue-50ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-white rounded overflow-hidden relative border border-gray-200 shadow-sm">
                                      <div className="absolute top-2 left-2 right-2 h-1 bg-gray-300 rounded-sm"></div>
                                      <div className="absolute top-4 left-2 right-2 h-px bg-gray-200"></div>
                                  </div>
                                  <span className="font-bold text-sm text-gray-700">Classic</span>
                              </button>

                              {/* Modern */}
                              <button 
                                  onClick={() => setTemplate('modern')}
                                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${template === 'modern' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-gray-800 rounded overflow-hidden relative border border-gray-700 shadow-sm">
                                       <div className="absolute top-0 left-0 w-full h-8 bg-gray-700"></div>
                                  </div>
                                  <span className="font-bold text-sm text-gray-700">Modern</span>
                              </button>

                              {/* Minimalist */}
                              <button 
                                  onClick={() => setTemplate('minimalist')}
                                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${template === 'minimalist' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-white rounded overflow-hidden relative border border-gray-200 shadow-sm p-2 flex flex-col gap-1">
                                      <div className="w-1/2 h-1 bg-gray-900 rounded-sm mb-1"></div>
                                      <div className="w-full h-px bg-gray-100"></div>
                                  </div>
                                  <span className="font-bold text-sm text-gray-700">Minimalist</span>
                              </button>

                              {/* Executive */}
                              <button 
                                  onClick={() => setTemplate('executive')}
                                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${template === 'executive' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-gray-50 rounded overflow-hidden relative border border-gray-300 shadow-sm border-t-4 border-t-blue-800">
                                      <div className="w-full text-[4px] text-center mt-1 font-bold text-blue-900">NAME</div>
                                  </div>
                                  <span className="font-bold text-sm text-gray-700">Executive</span>
                              </button>

                              {/* Creative */}
                              <button 
                                  onClick={() => setTemplate('creative')}
                                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${template === 'creative' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-pink-50 rounded overflow-hidden relative border border-pink-100 shadow-sm">
                                      <div className="absolute top-0 left-0 w-full h-1/3 bg-pink-500"></div>
                                      <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/20"></div>
                                  </div>
                                  <span className="font-bold text-sm text-gray-700">Creative</span>
                              </button>
                         </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <h3 className="font-bold text-gray-800 text-base md:text-lg">2. Customize Theme</h3>
                        <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100">
                             <ColorPicker 
                                label="Primary Color" 
                                color={theme.primaryColor} 
                                onChange={(c) => setTheme({ ...theme, primaryColor: c })} 
                             />
                        </div>
                    </div>

                    <div className="bg-blue-50/50 p-4 md:p-6 rounded-xl space-y-3 md:space-y-4 border border-blue-100 mt-6 md:mt-8">
                         <h3 className="font-bold text-gray-800 text-sm md:text-base">Ready?</h3>
                         <button 
                             onClick={() => downloadResumePDF(resumeData, template, theme)} 
                             className="w-full bg-blue-600 text-white py-3 md:py-4 text-sm md:text-base rounded-lg font-bold shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all flex justify-center items-center gap-2"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                             Download PDF
                         </button>
                         <p className="text-center text-xs md:text-sm text-gray-400">
                             Click "Finish & Download" below to save your resume to the dashboard.
                         </p>
                    </div>
                </div>
            )}
        </EditorLayout>
      </div>

      {/* RIGHT: Live Preview - Dark themed like NovoResume */}
      <div className="hidden lg:flex flex-col w-1/2 h-[calc(100vh-64px)] items-center justify-center relative overflow-hidden"
           style={{
             background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 50%, #1e1e2e 100%)',
           }}>
        
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }}
        />

        {/* Subtle gradient orbs for visual interest */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Live Preview Badge - Top right */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-semibold border border-white/20">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Preview
        </div>

        {/* The A4 Scaled Paper Container - Properly centered */}
        <div className="relative flex items-center justify-center w-full h-full py-8 px-8">
          <div className="relative transform scale-[0.40] xl:scale-[0.50] 2xl:scale-[0.60] origin-center transition-transform duration-300 ease-out group">
            {/* Paper Glow Effect */}
            <div className="absolute -inset-6 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
            
            {/* A4 Paper */}
            <div className="relative w-[210mm] min-h-[297mm] bg-white rounded-sm shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden">
              {template === 'classic' && <ClassicTemplate resumeData={resumeData} theme={theme} />}
              {template === 'modern' && <ModernTemplate resumeData={resumeData} theme={theme} />}
              {template === 'minimalist' && <MinimalistTemplate resumeData={resumeData} theme={theme} />}
              {template === 'executive' && <ExecutiveTemplate resumeData={resumeData} theme={theme} />}
              {template === 'creative' && <CreativeTemplate resumeData={resumeData} theme={theme} />}
            </div>
          </div>
        </div>

        {/* Template Indicator - Bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-white/70 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <span className="text-white/50">Template:</span>
          <span className="font-semibold text-white capitalize">{template}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;