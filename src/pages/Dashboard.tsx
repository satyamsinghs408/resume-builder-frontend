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
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden pt-16 md:pt-20">
      {/* Subtle Background Fills */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-50/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-slate-100/60 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">
                Welcome back, <span className="text-emerald-600">{user?.name}</span>
              </h1>
              <p className="text-slate-500 text-sm md:text-base">Manage your resumes and create new ones</p>
            </div>
            
            <button 
              onClick={() => navigate('/editor')}
              className="group flex items-center justify-center gap-2 md:gap-2.5 w-full sm:w-auto px-5 py-3 md:px-6 md:py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm md:text-base font-semibold rounded-lg shadow-sm shadow-emerald-500/15 hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300"
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
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10"
        >
          <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-slate-200/60 flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-11 h-11 md:w-12 md:h-12 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">{resumes.length}</p>
              <p className="text-xs md:text-sm text-slate-500">Total Resumes</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-slate-200/60 flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-11 h-11 md:w-12 md:h-12 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
              <LayoutGrid className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">5</p>
              <p className="text-xs md:text-sm text-slate-500">Templates Available</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-slate-200/60 flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow duration-300">
            <div className="w-11 h-11 md:w-12 md:h-12 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">Pro</p>
              <p className="text-xs md:text-sm text-slate-500">Account Status</p>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-slate-900">Your Resumes</h2>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-slate-200/60 h-56 md:h-60 animate-pulse">
                <div className="h-5 bg-slate-100 rounded w-3/4 mb-4" />
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-8" />
                <div className="space-y-2.5">
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 md:py-20 bg-white rounded-xl shadow-sm border border-slate-200/60"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5 md:mb-6">
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">No resumes yet</h3>
            <p className="text-slate-500 text-sm md:text-base mb-6 md:mb-8 max-w-sm mx-auto px-4">
              Start building your professional resume and land your dream job
            </p>
            <button 
              onClick={() => navigate('/editor')}
              className="inline-flex items-center gap-2 px-6 py-3 md:px-7 md:py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm md:text-base font-semibold rounded-lg shadow-sm shadow-emerald-500/15 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Create Your First Resume
            </button>
          </motion.div>
        ) : (
          /* Resume Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {resumes.map((resume, index) => (
              <motion.div 
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Card Header Accent */}
                <div className="h-1 bg-emerald-500" />
                
                <div className="p-4 md:p-5">
                  {/* Name */}
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 truncate group-hover:text-emerald-600 transition-colors duration-200">
                    {resume.personalInfo?.firstName || 'Untitled'} {resume.personalInfo?.lastName || 'Resume'}
                  </h3>
                  
                  {/* Email */}
                  <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm mb-3 md:mb-4">
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                    <span className="truncate">{resume.personalInfo?.email || 'No email provided'}</span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md border border-slate-100">
                      <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md border border-emerald-100 font-medium">
                      <FileText className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      Resume
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:gap-2.5">
                    <button 
                      onClick={() => handleEdit(resume)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-lg font-medium transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => resume._id && deleteResume(resume._id)}
                      className="px-3 md:px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors duration-200 group/btn border border-red-100"
                    >
                      <Trash2 className="w-4 h-4 md:w-4.5 md:h-4.5 group-hover/btn:scale-110 transition-transform" />
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
              className="group border border-dashed border-slate-300 rounded-xl p-5 md:p-6 flex flex-col items-center justify-center min-h-60 md:min-h-64 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 group-hover:bg-emerald-100 rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-colors duration-300">
                <Plus className="w-6 h-6 md:w-7 md:h-7 text-slate-400 group-hover:text-emerald-600 transition-colors duration-300" />
              </div>
              <p className="text-sm md:text-base text-slate-500 group-hover:text-emerald-600 font-medium transition-colors duration-300">
                Create New Resume
              </p>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
