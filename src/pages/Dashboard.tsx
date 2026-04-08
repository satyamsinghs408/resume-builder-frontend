import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import { ResumeData } from '../types';
import { motion } from 'framer-motion';
import { Plus, FileText, Edit3, Trash2, Calendar, Mail, LayoutGrid, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { endpoints } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        if (!user) return;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get<any[]>(endpoints.resumes, config);
        
        // Map backend flat structure to frontend nested structure
        const mappedResumes: ResumeData[] = data.map(item => ({
             ...item,
             personalInfo: {
                 firstName: item.firstName || item.personalInfo?.firstName || '',
                 lastName: item.lastName || item.personalInfo?.lastName || '',
                 email: item.email || item.personalInfo?.email || '',
                 phone: item.phone || item.personalInfo?.phone || '',
                 address: item.address || item.personalInfo?.address || '',
                 summary: item.summary || item.personalInfo?.summary || '',
                 socialLinks: item.socialLinks || item.personalInfo?.socialLinks || {}
             }
        }));

        setResumes(mappedResumes);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchResumes();
  }, [user]);

  const deleteResume = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        if (!user) return;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${endpoints.resumes}/${id}`, config);
        setResumes(resumes.filter((resume) => resume._id !== id));
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const handleEdit = (resume: ResumeData) => {
    navigate('/editor', { state: { resumeToEdit: resume } as { resumeToEdit: ResumeData } });
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-16 md:pt-20">
      {/* SaaS Background Orbs & Gradients */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-indigo-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#000000_1px,_transparent_1px)] bg-[length:24px_24px] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">{user?.name}</span>
              </h1>
              <p className="text-slate-500 text-base md:text-lg font-medium">Manage your resumes and create new ones instantly</p>
            </div>
            
            <button 
              onClick={() => navigate('/editor')}
              className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-4 bg-linear-to-r from-indigo-600 to-cyan-500 text-white text-sm md:text-base font-bold rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.35)] active:scale-[0.98] hover:-translate-y-1 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create New Resume
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-14"
        >
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 z-10">
              <FileText className="w-7 h-7 text-indigo-600" />
            </div>
            <div className="z-10">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{resumes.length}</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Total Resumes</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center shrink-0 border border-cyan-100 z-10">
              <LayoutGrid className="w-7 h-7 text-cyan-600" />
            </div>
            <div className="z-10">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">5</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Templates</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0 border border-purple-100 z-10">
              <Sparkles className="w-7 h-7 text-purple-600" />
            </div>
            <div className="z-10">
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Pro</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Account Status</p>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Your Resumes</h2>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-64 animate-pulse relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100" />
                <div className="mt-2 h-6 bg-slate-100 rounded-md w-3/4 mb-5" />
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-8" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded-md w-full" />
                  <div className="h-4 bg-slate-100 rounded-md w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 md:py-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] -z-10 pointer-events-none" />
            
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <FileText className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">No resumes yet</h3>
            <p className="text-slate-500 font-medium text-base mb-10 max-w-md mx-auto px-4">
              Start building your professional SaaS-grade resume and land your dream job faster.
            </p>
            <button 
              onClick={() => navigate('/editor')}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-linear-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.35)] active:scale-[0.98] hover:-translate-y-1 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create Your First Resume
            </button>
          </motion.div>
        ) : (
          /* Resume Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, index) => (
              <motion.div 
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 overflow-hidden hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
              >
                {/* Card Header Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-indigo-500 to-cyan-400" />
                
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {/* Name */}
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-2 truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-cyan-600 transition-all duration-300 mt-1">
                    {resume.personalInfo?.firstName || 'Untitled'} {resume.personalInfo?.lastName || 'Resume'}
                  </h3>
                  
                  {/* Email */}
                  <div className="flex items-center gap-2.5 text-slate-500 text-sm font-medium mb-5">
                    <Mail className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{resume.personalInfo?.email || 'No email provided'}</span>
                  </div>

                  {/* Meta Info Badges */}
                  <div className="flex items-center gap-2.5 mb-8 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 uppercase tracking-widest shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 uppercase tracking-widest shadow-xs">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" />
                      Resume
                    </span>
                  </div>

                  {/* Spacer to push buttons to bottom */}
                  <div className="mt-auto"></div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => handleEdit(resume)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-cyan-500 text-white text-sm rounded-xl font-bold transition-all duration-300 shadow-xs hover:shadow-[0_4px_15px_rgba(6,182,212,0.3)] active:scale-95"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Details
                    </button>
                    <button 
                      onClick={() => resume._id && deleteResume(resume._id)}
                      className="px-4 py-3 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all duration-300 group/btn border border-slate-200 hover:border-red-200 shadow-xs active:scale-95"
                    >
                      <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Create New Card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: resumes.length * 0.05 }}
              onClick={() => navigate('/editor')}
              className="group border-2 border-dashed border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px] bg-slate-50/50 hover:border-cyan-400 hover:bg-cyan-50/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 bg-slate-100 group-hover:bg-cyan-100 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 shadow-xs">
                <Plus className="w-8 h-8 text-slate-400 group-hover:text-cyan-600 transition-colors duration-300" />
              </div>
              <p className="text-base font-extrabold text-slate-500 group-hover:text-cyan-600 transition-colors duration-300">
                Create New Resume
              </p>
              <p className="text-sm font-medium text-slate-400 mt-2 text-center group-hover:text-cyan-500/80">
                Start from scratch
              </p>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
