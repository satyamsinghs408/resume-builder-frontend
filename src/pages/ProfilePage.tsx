import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';
import { 
  User as UserIcon, Mail, Trash2, Key, 
  AlertCircle, CheckCircle, X,
  Clock, ShieldCheck, LogOut
} from 'lucide-react';
import SEO from '../components/SEO';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { apiUrl } = useApi();
  
  const [profile, setProfile] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Helper to get auth headers
  const getAuthHeaders = useCallback(() => {
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
  }, [user?.token]);

  // Fetch Full Profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.token) return;
      try {
        setFetching(true);
        const { data } = await axios.get(`${apiUrl}/api/users/profile`, getAuthHeaders());
        setProfile(data);
      } catch (err: any) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, [apiUrl, user?.token, getAuthHeaders]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await axios.put(
        `${apiUrl}/api/users/profile/password`, 
        { currentPassword, newPassword },
        getAuthHeaders()
      );
      setStatus({ type: 'success', message: 'Password updated successfully. A confirmation email has been sent.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) return;

    setLoading(true);
    try {
      await axios.delete(
        `${apiUrl}/api/users/profile`, 
        { 
          data: { password: deletePassword },
          ...getAuthHeaders()
        }
      );
      logout();
    } catch (err: any) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to delete account' });
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 shadow-sm">
      <SEO 
        title="My Profile | CareerLeaf" 
        description="Manage your CareerLeaf account settings and security."
        path="/profile"
      />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
            <p className="text-slate-500 mt-1">Manage your professional identity and security settings.</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 self-start"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {status && (
          <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="h-24 bg-linear-to-r from-indigo-600 to-cyan-500" />
              <div className="px-6 pb-6 text-center">
                <div className="relative -mt-12 mb-4 inline-block">
                  <div className="w-24 h-24 bg-white rounded-full p-1.5 shadow-xl">
                    <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                      <UserIcon className="w-10 h-10 text-slate-400" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-emerald-500 border-2 border-white w-5 h-5 rounded-full" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{profile?.name || user?.name}</h2>
                <p className="text-slate-500 text-sm mb-6">{profile?.email || user?.email}</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Verified Email</p>
                      <p className="text-xs font-medium text-slate-700 truncate">{profile?.email || user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Member Since</p>
                      <p className="text-xs font-medium text-slate-700">{formatDate(profile?.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-8 h-8 mb-4 text-indigo-200" />
              <h3 className="text-lg font-bold mb-2">Secure Account</h3>
              <p className="text-indigo-100 text-sm">Your account is protected with advanced encryption and secure session management.</p>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Password Management */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Security</h3>
                  <p className="text-sm text-slate-500">Update your password regularly to keep your account safe.</p>
                </div>
              </div>
              
              <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-full">
                    <label className="text-sm font-semibold text-slate-700">Current Password</label>
                    <input 
                      type="password" 
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-hidden text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">New Password</label>
                    <input 
                      type="password" 
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-hidden text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                    <input 
                      type="password" 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-hidden text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
              <div className="p-6 border-b border-red-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Danger Zone</h3>
                    <p className="text-sm text-slate-500">Irreversible actions related to your account.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-md">
                  <h4 className="font-bold text-slate-900 mb-1">Delete Account</h4>
                  <p className="text-sm text-slate-500">Permanently remove your account and all of your content. This action is not reversible and we cannot recover your data.</p>
                </div>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="px-6 py-2.5 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold rounded-xl transition-all shrink-0"
                >
                  Delete Account...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete your account?</h3>
              <p className="text-slate-600 mb-8">
                This will permanently delete your account and all <span className="font-bold text-slate-900 underline decoration-red-500">associated resumes</span>. You will receive a final confirmation email once deleted.
              </p>
              
              <div className="space-y-4">
                <div className="text-left space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm with Password</label>
                  <input 
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter your password to confirm"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-hidden font-medium"
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    disabled={!deletePassword || loading}
                    className="flex-1 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                  >
                    {loading ? 'Deleting...' : 'Delete Forever'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
