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
        const { data } = await axios.get<ResumeData[]>(endpoints.resumes, config);
        setResumes(data);
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
    <div className="min-h-screen bg-gray-50 relative overflow-hidden pt-16 md:pt-20">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-blue-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-purple-100/50 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{user?.name}</span>
              </h1>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">Manage your resumes and create new ones</p>
            </div>
            
            <button 
              onClick={() => navigate('/editor')}
              className="group flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto px-5 py-3 md:px-6 md:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm md:text-base font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
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
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 mb-8 md:mb-10"
        >
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{resumes.length}</p>
              <p className="text-xs md:text-sm text-gray-500">Total Resumes</p>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
              <LayoutGrid className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">5</p>
              <p className="text-xs md:text-sm text-gray-500">Templates Available</p>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">Pro</p>
              <p className="text-xs md:text-sm text-gray-500">Account Status</p>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your Resumes</h2>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100 h-56 md:h-64 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-8" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 md:py-20 bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5 md:mb-6">
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-md mx-auto px-4">
              Start building your professional resume and land your dream job
            </p>
            <button 
              onClick={() => navigate('/editor')}
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm md:text-base font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Your First Resume
            </button>
          </motion.div>
        ) : (
          /* Resume Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {resumes.map((resume, index) => (
              <motion.div 
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Card Header with Gradient */}
                <div className="h-2 md:h-3 bg-linear-to-r from-blue-500 to-purple-500" />
                
                <div className="p-4 md:p-6">
                  {/* Name */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
                    {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                  </h3>
                  
                  {/* Email */}
                  <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-3 md:mb-4">
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                    <span className="truncate">{resume.personalInfo.email || 'No email'}</span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full">
                      <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-medium">
                      <FileText className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      Resume
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:gap-3">
                    <button 
                      onClick={() => handleEdit(resume)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base rounded-lg md:rounded-xl font-semibold transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => resume._id && deleteResume(resume._id)}
                      className="px-3 md:px-4 py-2.5 md:py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg md:rounded-xl transition-colors group/btn"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:scale-110 transition-transform" />
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
              className="group border-2 border-dashed border-gray-200 rounded-xl md:rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center min-h-60 md:min-h-70 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mb-3 md:mb-4 transition-colors">
                <Plus className="w-7 h-7 md:w-8 md:h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-sm md:text-base text-gray-500 group-hover:text-blue-600 font-semibold transition-colors">
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
