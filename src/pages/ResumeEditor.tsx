import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { downloadResumePDF } from '../utils/pdfGenerator';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalForm from '../components/PersonalForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';
import ProjectsForm from '../components/ProjectsForm';
import CertificationsForm from '../components/CertificationsForm';
import LanguagesForm from '../components/LanguagesForm';
import { ResumeData, ThemeConfig } from '../types';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import EditorLayout from '../components/editor/EditorLayout';
import ColorPicker from '../components/ui/ColorPicker';
import FileUpload from '../components/editor/FileUpload';
import PageBreakLines from '../components/preview/PageBreakLines';
import { normalizeDate } from '../utils/dateUtils';

// Redux Imports
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
    setResumeData,  
} from '../store/slices/resumeSlice';
import { 
    setTotalSteps, 
    nextStep, 
    prevStep,
    resetEditor
} from '../store/slices/editorSlice';

const ResumeEditor = () => {
  const dispatch = useAppDispatch();
  const resumeData = useAppSelector((state: any) => state.resume);
  const { currentStep, totalSteps } = useAppSelector((state: any) => state.editor);
  
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimalist' | 'executive' | 'creative'>('classic'); 
  const [theme, setTheme] = useState<ThemeConfig>({
    primaryColor: '#2c3e50',
    secondaryColor: '#ffffff',
    fontFamily: 'Roboto'
  });
  
  const { user } = useAuth();
  const { endpoints } = useApi();
  const location = useLocation();
  const navigate = useNavigate();

  // CHECK: Are we editing an existing resume?
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (location.state && location.state.resumeToEdit) {
      const rawData = location.state.resumeToEdit;
      
      // Backend returns flat structure, Redux expects nested personalInfo
      // We must reconstruct the ResumeData object correctly
      const structuredData: ResumeData = {
          ...rawData,
          personalInfo: {
              firstName: rawData.firstName || rawData.personalInfo?.firstName || '',
              lastName: rawData.lastName || rawData.personalInfo?.lastName || '',
              email: rawData.email || rawData.personalInfo?.email || '',
              phone: rawData.phone || rawData.personalInfo?.phone || '',
              address: rawData.address || rawData.personalInfo?.address || '',
              summary: rawData.summary || rawData.personalInfo?.summary || '',
              socialLinks: {
                  linkedin: rawData.socialLinks?.linkedin || rawData.personalInfo?.socialLinks?.linkedin || '',
                  github: rawData.socialLinks?.github || rawData.personalInfo?.socialLinks?.github || '',
                  portfolio: rawData.socialLinks?.portfolio || rawData.personalInfo?.socialLinks?.portfolio || '',
                  twitter: rawData.socialLinks?.twitter || rawData.personalInfo?.socialLinks?.twitter || '',
              }
          }
      };

      dispatch(setResumeData(structuredData));
      setIsEditing(true);
      setCurrentResumeId(rawData._id || null);
    }
  }, [location, dispatch]);

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

      // Flatten the data for the backend
      // Backend expects firstName, lastName etc at root, but Redux has them in personalInfo
      const payload = {
        ...resumeData,
        ...resumeData.personalInfo, // Spreads firstName, lastName, email, socialLinks etc. to root
      };
      
      // Remove the nested personalInfo object to avoid confusion (optional but clean)
      // @ts-ignore
      delete payload.personalInfo;

      if (isEditing) {
        await axios.put(`${endpoints.resumes}/${currentResumeId}`, payload, config);
        alert('Resume Updated Successfully!');
      } else {
        await axios.post(endpoints.resumes, payload, config);
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

  // Initialize Editor Steps
  useEffect(() => {
    dispatch(setTotalSteps(8));
    return () => { dispatch(resetEditor()); };
  }, [dispatch]);

  // ... (existing code)

  // --- NAVIGATION ---
  
  const onNextClick = () => {
      if (currentStep === 7) { // Last step (0-indexed 7 = Step 8)
          saveResume();
      } else {
          dispatch(nextStep());
      }
  };

  const onBackClick = () => {
      if (currentStep > 0) {
          dispatch(prevStep());
      } else {
          navigate('/dashboard');
      }
  };

  const getStepTitle = () => {
      switch(currentStep) {
          case 0: return "Import & Personal Information";
          case 1: return "Experience";
          case 2: return "Education";
          case 3: return "Skills";
          case 4: return "Projects";
          case 5: return "Certifications";
          case 6: return "Languages";
          case 7: return "Finalize & Download";
          default: return "";
      }
  };

  /* ... handleUploadSuccess ... */
  const handleUploadSuccess = (data: any) => {
    // 1. Map Backend Response (Flat) to Frontend State (Nested)
    const mappedData: ResumeData = {
        personalInfo: {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            summary: data.summary || '',
            socialLinks: {
                linkedin: data.socialLinks?.linkedin || '',
                github: data.socialLinks?.github || '',
                portfolio: data.socialLinks?.portfolio || '',
                twitter: data.socialLinks?.twitter || '',
            }
        },
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        languages: data.languages || [],
    };

    // 2. Normalize Data before Dispatching
    const cleanedData = { ...mappedData };

    // Helper to ensure ID
    const ensureId = (item: any) => ({ ...item, id: item.id || crypto.randomUUID() });

    // 1. Normalize Experience
    if (cleanedData.experience) {
        cleanedData.experience = cleanedData.experience.map(exp => {
            const normStart = normalizeDate(exp.startDate);
            const normEnd = normalizeDate(exp.endDate);
            return {
                ...ensureId(exp),
                startDate: normStart || '',
                endDate: normEnd === 'PRESENT' ? '' : (normEnd || ''),
                current: normEnd === 'PRESENT' || exp.current
            };
        });
    }

    // 2. Normalize Education
    if (cleanedData.education) {
        cleanedData.education = cleanedData.education.map(edu => {
             const normStart = normalizeDate(edu.startDate);
             const normEnd = normalizeDate(edu.endDate);
             return {
                 ...ensureId(edu),
                 startDate: normStart || '',
                 endDate: normEnd === 'PRESENT' ? '' : (normEnd || ''),
                 current: normEnd === 'PRESENT' || edu.current
             };
        });
    }

    // 3. Normalize Projects
    if (cleanedData.projects) {
        cleanedData.projects = cleanedData.projects.map(ensureId);
    }

    // 4. Normalize Certifications
    if (cleanedData.certifications) {
        cleanedData.certifications = cleanedData.certifications.map(ensureId);
    }

    // 5. Normalize Languages
    if (cleanedData.languages) {
        cleanedData.languages = cleanedData.languages.map(ensureId);
    }

    // Dispatch to Redux
    dispatch(setResumeData(cleanedData));
    
    // Build summary logic similar to before
    const imported: string[] = [];
    if (cleanedData.personalInfo.firstName || cleanedData.personalInfo.lastName) imported.push('Name');
    if (cleanedData.personalInfo.email) imported.push('Email');
    if (cleanedData.experience && cleanedData.experience.length > 0) imported.push(`${cleanedData.experience.length} Experience(s)`);
    if (cleanedData.skills && cleanedData.skills.length > 0) imported.push(`${cleanedData.skills.length} Skill(s)`);
    if (cleanedData.projects && cleanedData.projects.length > 0) imported.push(`${cleanedData.projects.length} Project(s)`);
    
    alert(`Resume parsed successfully! Imported: ${imported.join(', ')}. Please review the details.`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 overflow-hidden font-sans pt-14 md:pt-16">
      
      {/* LEFT: Editor Wizard */}
      <div className="w-full lg:w-1/2 h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] z-10 bg-white overflow-hidden">
        <EditorLayout
            currentStep={currentStep + 1} // Convert 0-index to 1-index for UI
            totalSteps={totalSteps}
            title={getStepTitle()}
            onNext={onNextClick}
            onBack={onBackClick}
            isSubmitting={isSaving}
        >
            {currentStep === 0 && (
                <div className="animate-fadeIn">
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                    <div className="flex items-center gap-3 my-6 md:my-8">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider">Or enter manually</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    <PersonalForm />
                </div>
            )}
            {currentStep === 1 && (
                <ExperienceForm />
            )}
            {currentStep === 2 && (
                <EducationForm />
            )}
            {currentStep === 3 && (
                <SkillsForm />
            )}
            {currentStep === 4 && (
                <ProjectsForm />
            )}
            {currentStep === 5 && (
                <CertificationsForm />
            )}
            {currentStep === 6 && (
                <LanguagesForm />
            )}
            {currentStep === 7 && (
                <div className="animate-fadeIn space-y-5 md:space-y-8">
                    {/* ... (Template Selection UI) ... */}
                    <div className="space-y-3 md:space-y-4">
                         <h3 className="font-bold text-gray-800 text-base md:text-lg">1. Choose Template</h3>
                         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                              {/* Classic */}
                              <button 
                                  onClick={() => setTemplate('classic')}
                                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${template === 'classic' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
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
      <div className="hidden lg:flex flex-col w-1/2 h-[calc(100vh-64px)] relative bg-slate-900">
        
        {/* Fixed Header/Toolbar within Preview Area */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-slate-900/50 backdrop-blur-sm">
             <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-white shadow-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Preview
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-4 py-1.5 rounded-full border border-slate-700">
               <span className="opacity-50">Template:</span>
               <span className="font-semibold text-white capitalize">{template}</span>
            </div>
        </div>

        {/* Scrollable Canvas Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black w-full h-full flex justify-center pt-20 pb-20">
            {/* The scaled A4 Paper */}
             <div className="relative transform scale-[0.45] xl:scale-[0.55] 2xl:scale-[0.65] origin-top transition-transform duration-300 ease-out">
                {/* Paper Glow Effect */}
                <div className="absolute -inset-10 bg-blue-500/10 rounded-xl blur-3xl opacity-50 pointer-events-none" />
                
                <div className="relative w-[210mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden">
                    <PageBreakLines />
                    {template === 'classic' && <ClassicTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'modern' && <ModernTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'minimalist' && <MinimalistTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'executive' && <ExecutiveTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'creative' && <CreativeTemplate resumeData={resumeData} theme={theme} />}
                </div>
             </div>
        </div>

        {/* Info Hint - Fixed to bottom right */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-blue-600 shadow-lg shadow-blue-900/40 text-white px-4 py-3 rounded-xl text-sm font-medium border border-blue-400/30 animate-bounce-slow">
           <span>💡</span>
           <span>Preview updates automatically</span>
        </div>
      </div>

    </div>
  );
};

export default ResumeEditor;
