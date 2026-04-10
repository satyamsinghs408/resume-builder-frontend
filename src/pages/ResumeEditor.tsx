import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { downloadResumePDF } from '../utils/pdfGenerator';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
import { generateId } from '../utils/generateId';
import { Sparkles, Layout, ChevronDown, Check } from 'lucide-react';

// Redux Imports
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
    setResumeData,  
} from '../store/slices/resumeSlice';
import { 
    setTotalSteps, 
    nextStep, 
    prevStep,
    resetEditor,
    toggleMobilePreview
} from '../store/slices/editorSlice';

const ResumeEditor = () => {
  const dispatch = useAppDispatch();
  const resumeData = useAppSelector((state: any) => state.resume);
  const { currentStep, totalSteps, showMobilePreview } = useAppSelector((state: any) => state.editor);
  
  const { user } = useAuth();
  const { endpoints } = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 1. Template & UI States
  const [template, setTemplate] = useState<'classic' | 'modern' | 'minimalist' | 'executive' | 'creative'>('classic'); 
  const [theme, setTheme] = useState<ThemeConfig>({
    primaryColor: '#4F46E5', // Updated default base text theme to Indigo
    secondaryColor: '#ffffff',
    fontFamily: 'Roboto'
  });
  const [isTemplateSwitcherOpen, setIsTemplateSwitcherOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 2. Initialize Template from URL or Storage
  useEffect(() => {
    const templateParam = searchParams.get('template');
    const validTemplates = ['classic', 'modern', 'minimalist', 'executive', 'creative'];
    
    if (templateParam && validTemplates.includes(templateParam)) {
        setTemplate(templateParam as any);
        console.log(`Initialized editor with ${templateParam} template from URL`);
    } else {
        const storedTemplate = localStorage.getItem('lastSelectedTemplate');
        if (storedTemplate && validTemplates.includes(storedTemplate)) {
            setTemplate(storedTemplate as any);
        }
    }
  }, [searchParams]);

  // Update storage when template changes
  useEffect(() => {
    localStorage.setItem('lastSelectedTemplate', template);
  }, [template]);

  // 2. Draft Restoration Logic
  useEffect(() => {
    const draft = localStorage.getItem('guestResumeDraft');
    if (draft && !isEditing) {
        try {
            const parsedDraft = JSON.parse(draft);
            dispatch(setResumeData(parsedDraft));
            localStorage.removeItem('guestResumeDraft');
            console.log('Restored resume draft from guest session');
        } catch (e) {
            console.error('Failed to parse resume draft', e);
        }
    }
  }, [dispatch, isEditing]);

  useEffect(() => {
    if (location.state && location.state.resumeToEdit) {
      const rawData = location.state.resumeToEdit;
      
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

  const saveResume = async () => {
    if (!user) {
      // Save draft to localStorage before redirecting
      localStorage.setItem('guestResumeDraft', JSON.stringify(resumeData));
      navigate('/login?redirect=/editor');
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

      const payload = {
        ...resumeData,
        ...resumeData.personalInfo,
      };
      
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

  useEffect(() => {
    dispatch(setTotalSteps(8));
    return () => { dispatch(resetEditor()); };
  }, [dispatch]);

  const onNextClick = () => {
      if (currentStep === 7) { 
          downloadResumePDF(resumeData, template, theme);
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
          case 0: return "Import & Personal Info";
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

  const handleUploadSuccess = (data: any) => {
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

    const cleanedData = { ...mappedData };
    const ensureId = (item: any) => ({ ...item, id: item.id || generateId() });

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

    if (cleanedData.projects) {
        cleanedData.projects = cleanedData.projects.map(ensureId);
    }

    if (cleanedData.certifications) {
        cleanedData.certifications = cleanedData.certifications.map(ensureId);
    }

    if (cleanedData.languages) {
        cleanedData.languages = cleanedData.languages.map(ensureId);
    }
    
    cleanedData.lastImportTimestamp = Date.now();
    dispatch(setResumeData(cleanedData));
    
    const imported: string[] = [];
    if (cleanedData.personalInfo.firstName || cleanedData.personalInfo.lastName) imported.push('Name');
    if (cleanedData.personalInfo.email) imported.push('Email');
    if (cleanedData.experience && cleanedData.experience.length > 0) imported.push(`${cleanedData.experience.length} Experience(s)`);
    if (cleanedData.skills && cleanedData.skills.length > 0) imported.push(`${cleanedData.skills.length} Skill(s)`);
    if (cleanedData.projects && cleanedData.projects.length > 0) imported.push(`${cleanedData.projects.length} Project(s)`);
    
    alert(`Resume parsed successfully! Imported: ${imported.join(', ')}. Please review the details.`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 overflow-hidden font-sans pt-14 md:pt-16">
      
      {/* LEFT: Editor Wizard */}
      <div className="w-full lg:w-1/2 h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] z-10 overflow-hidden bg-transparent">
        <EditorLayout
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
            title={getStepTitle()}
            onNext={onNextClick}
            onBack={onBackClick}
            isSubmitting={isSaving}
        >
            {currentStep === 0 && (
                <div className="animate-fadeIn">
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                    <div className="flex items-center gap-3 my-4 md:my-5">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Or enter manually</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>
                    <PersonalForm />
                </div>
            )}
            {currentStep === 1 && <ExperienceForm />}
            {currentStep === 2 && <EducationForm />}
            {currentStep === 3 && <SkillsForm />}
            {currentStep === 4 && <ProjectsForm />}
            {currentStep === 5 && <CertificationsForm />}
            {currentStep === 6 && <LanguagesForm />}
            
            {/* Step 8 (Finalize UI) */}
            {currentStep === 7 && (
                <div className="animate-fadeIn space-y-8 md:space-y-10 pt-2 pb-6">
                    
                    <div className="space-y-4">
                         <h3 className="font-extrabold text-slate-900 text-lg md:text-xl tracking-tight">1. Select Template</h3>
                         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                              {/* Classic */}
                              <button 
                                  onClick={() => setTemplate('classic')}
                                  className={`p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${template === 'classic' ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/10 shadow-sm' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-white rounded-lg overflow-hidden relative border border-slate-200 shadow-sm">
                                      <div className="absolute top-2 left-2 right-2 h-1 bg-slate-300 rounded-sm"></div>
                                      <div className="absolute top-4 left-2 right-2 h-px bg-slate-200"></div>
                                  </div>
                                  <span className={`font-bold text-sm ${template==='classic'?'text-indigo-700':'text-slate-600'}`}>Classic</span>
                              </button>

                              {/* Modern */}
                              <button 
                                  onClick={() => setTemplate('modern')}
                                  className={`p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${template === 'modern' ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/10 shadow-sm' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-slate-800 rounded-lg overflow-hidden relative border border-slate-700 shadow-sm shadow-slate-900/50">
                                       <div className="absolute top-0 left-0 w-full h-8 bg-slate-700"></div>
                                  </div>
                                  <span className={`font-bold text-sm ${template==='modern'?'text-indigo-700':'text-slate-600'}`}>Modern</span>
                              </button>

                              {/* Minimalist */}
                              <button 
                                  onClick={() => setTemplate('minimalist')}
                                  className={`p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${template === 'minimalist' ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/10 shadow-sm' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-white rounded-lg overflow-hidden relative border border-slate-200 shadow-sm p-2 flex flex-col gap-1.5">
                                      <div className="w-1/2 h-1 bg-slate-900 rounded-sm mb-1"></div>
                                      <div className="w-full h-px bg-slate-100"></div>
                                  </div>
                                  <span className={`font-bold text-sm ${template==='minimalist'?'text-indigo-700':'text-slate-600'}`}>Minimal</span>
                              </button>

                              {/* Executive */}
                              <button 
                                  onClick={() => setTemplate('executive')}
                                  className={`p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${template === 'executive' ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/10 shadow-sm' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-slate-50 rounded-lg overflow-hidden relative border border-slate-300 shadow-sm border-t-4 border-t-slate-800">
                                      <div className="w-full text-[4px] text-center mt-1 font-bold text-slate-800">NAME</div>
                                  </div>
                                  <span className={`font-bold text-sm ${template==='executive'?'text-indigo-700':'text-slate-600'}`}>Executive</span>
                              </button>

                              {/* Creative */}
                              <button 
                                  onClick={() => setTemplate('creative')}
                                  className={`p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${template === 'creative' ? 'border-cyan-500 bg-cyan-50 ring-4 ring-cyan-500/20 shadow-sm' : 'border-slate-200 hover:border-cyan-300 hover:bg-slate-50'}`}
                              >
                                  <div className="w-full aspect-[0.724] bg-indigo-50 rounded-lg overflow-hidden relative border border-indigo-100 shadow-sm">
                                      <div className="absolute top-0 left-0 w-full h-1/3 bg-cyan-500"></div>
                                      <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/30 backdrop-blur-sm"></div>
                                  </div>
                                  <span className={`font-bold text-sm ${template==='creative'?'text-cyan-700':'text-slate-600'}`}>Creative</span>
                              </button>
                         </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-extrabold text-slate-900 text-lg md:text-xl tracking-tight">2. Customize Accent Color</h3>
                        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200/60 ring-4 ring-white shadow-xs">
                             <ColorPicker 
                                label="Primary Color" 
                                color={theme.primaryColor} 
                                onChange={(c) => setTheme({ ...theme, primaryColor: c })} 
                             />
                        </div>
                    </div>

                    <div className="bg-linear-to-r from-indigo-50 to-cyan-50 p-6 md:p-8 rounded-3xl space-y-4 border border-indigo-100/50 mt-8 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                         
                         <h3 className="font-extrabold text-slate-900 text-lg md:text-xl tracking-tight">Ready to Export?</h3>
                         <button 
                             onClick={() => downloadResumePDF(resumeData, template, theme)} 
                             className="w-full bg-linear-to-r from-indigo-600 to-cyan-500 text-white py-4 md:py-5 text-sm md:text-base rounded-2xl font-bold shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.35)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-3 relative z-10"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                             </svg>
                             Download Final PDF
                         </button>
                         <p className="text-center text-xs md:text-sm text-indigo-900/60 font-medium">
                             Or click "Finish & Download" below to save your resume to the dashboard.
                         </p>
                    </div>
                </div>
            )}
        </EditorLayout>
      </div>

      {/* Mobile Preview FAB (Explicitly Draggable) */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{ left: -2000, right: 200, top: -2000, bottom: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ touchAction: "none" }}
        onClick={() => {
            dispatch(toggleMobilePreview());
        }}
        className="lg:hidden fixed bottom-28 right-6 z-100 bg-indigo-600 text-white p-4 rounded-full shadow-[0_8px_30px_rgba(79,70,229,0.4)] border border-indigo-400 cursor-grab active:cursor-grabbing hover:bg-cyan-500 transition-colors duration-300"
        aria-label="Preview Resume"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </motion.div>

      {/* Mobile Live Preview Modal */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-100 lg:hidden flex flex-col bg-slate-900/90 backdrop-blur-2xl overflow-hidden pointer-events-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-5 bg-slate-900 border-b border-slate-800 shadow-xl relative z-20">
            <div className="text-white font-bold tracking-tight flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shadow-[0_0_10px_rgba(6,182,212,0.8)] rounded-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              Live Preview
            </div>
            <button 
              onClick={() => dispatch(toggleMobilePreview())}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Scrollable Scaled Canvas Area */}
          <div className="flex-1 overflow-y-auto w-full flex justify-center pt-10 pb-32 relative">
             <div className="absolute top-0 right-0 w-full h-full bg-cyan-600/5 blur-[80px] rounded-full pointer-events-none" />
             <div className="relative transform scale-[0.35] sm:scale-[0.45] origin-top transition-transform duration-300 ease-out z-10">
                {/* Paper Glow Effect */}
                <div className="absolute -inset-10 bg-indigo-500/15 rounded-3xl blur-2xl opacity-70 pointer-events-none" />
                
                <div className="relative w-[260mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden pointer-events-none rounded-sm">
                    <PageBreakLines />
                    {template === 'classic' && <ClassicTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'modern' && <ModernTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'minimalist' && <MinimalistTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'executive' && <ExecutiveTemplate resumeData={resumeData} theme={theme} />}
                    {template === 'creative' && <CreativeTemplate resumeData={resumeData} theme={theme} />}
                </div>
             </div>
          </div>
        </div>
      )}


      {/* RIGHT: Live Preview - Dark themed SaaS panel */}
      <div className="hidden lg:flex flex-col w-1/2 h-[calc(100vh-64px)] relative bg-slate-900 border-l border-slate-800 overflow-hidden shadow-2xl shadow-slate-900 z-20 transition-all">
        
        {/* Fixed Header/Toolbar within Preview Area */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-5 bg-slate-900/60 backdrop-blur-2xl border-b border-slate-800/80">
             <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-white shadow-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-cyan-500/5 backdrop-blur-sm pointer-events-none"></div>
                <span className="relative flex h-2 w-2 z-10 shadow-[0_0_10px_rgba(6,182,212,0.8)] rounded-full">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="z-10 tracking-widest uppercase">Live Preview</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsTemplateSwitcherOpen(!isTemplateSwitcherOpen)}
                className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 hover:bg-slate-800 hover:text-white px-4 py-2 rounded-xl border border-slate-700/50 shadow-sm transition-all active:scale-95 group"
              >
                 <Layout className="w-3 h-3 text-indigo-400 group-hover:text-cyan-400" />
                 <span className="tracking-widest uppercase opacity-70">Template:</span>
                 <span className="font-bold text-white tracking-widest uppercase">{template}</span>
                 <ChevronDown className={`w-3 h-3 transition-transform ${isTemplateSwitcherOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTemplateSwitcherOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-60 animate-fadeIn">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest p-2 mb-1 border-b border-slate-800">
                        Choose Style
                    </div>
                    {['classic', 'modern', 'minimalist', 'executive', 'creative'].map((t) => (
                        <button
                            key={t}
                            onClick={() => {
                                setTemplate(t as any);
                                setIsTemplateSwitcherOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                template === t 
                                    ? 'bg-indigo-600 text-white shadow-lg' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <span className="capitalize">{t}</span>
                            {template === t && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
              )}
            </div>
        </div>

        {/* Scrollable Canvas Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-950 w-full h-full flex justify-center pt-24 pb-24 relative">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-lighten" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-lighten" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.02] pointer-events-none" />

             {/* The scaled A4 Paper */}
             <div className="relative transform scale-[0.45] xl:scale-[0.55] 2xl:scale-[0.65] origin-top transition-transform duration-300 ease-out z-10">
                {/* Paper Glow Effect */}
                <div className="absolute -inset-10 bg-indigo-500/15 rounded-[40px] blur-[50px] opacity-70 pointer-events-none" />
                <div className="absolute -inset-2 bg-white/20 rounded-lg blur-[5px] opacity-30 pointer-events-none" />
                
                <div className="relative w-[260mm] min-h-[297mm] bg-white shadow-2xl overflow-hidden rounded-sm ring-1 ring-slate-800/10">
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
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2.5 bg-slate-800/80 backdrop-blur-xl shadow-2xl shadow-indigo-900/30 text-white px-5 py-3.5 rounded-2xl text-xs font-bold tracking-widest uppercase border border-slate-700 hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300 cursor-default ring-4 ring-indigo-500/10">
           <Sparkles className="w-4 h-4 text-cyan-400" />
           <span className="opacity-90">Auto-sync active</span>
        </div>
      </div>

    </div>
  );
};

export default ResumeEditor;
