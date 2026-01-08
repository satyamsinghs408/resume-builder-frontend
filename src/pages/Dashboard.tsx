import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import { Resume } from '../types';

const Dashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const { user } = useAuth();
  const { endpoints } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        if (!user) return;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get<Resume[]>(endpoints.resumes, config);
        setResumes(data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
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

  const handleEdit = (resume: Resume) => {
    navigate('/editor', { state: { resumeToEdit: resume } });
  };


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">My Resumes</h2>
        
        {resumes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500 text-lg mb-4">You haven't saved any resumes yet.</p>
            <button 
              onClick={() => navigate('/editor')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Create New
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col justify-between h-56">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 truncate">{resume.firstName} {resume.lastName}</h3>
                  <p className="text-gray-500 text-sm mt-1">{resume.email}</p>
                  <span className="inline-block mt-3 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded">
                    {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>

                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => handleEdit(resume)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => resume._id && deleteResume(resume._id)}
                    className="px-4 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded text-sm font-medium transition"
                  >

                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;