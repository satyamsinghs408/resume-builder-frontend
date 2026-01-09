import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LayoutDashboard, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Don't show navbar on editor page (it has its own header)
  const isEditorPage = location.pathname === '/editor';
  
  if (isEditorPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            Resume<span className="text-blue-400">Builder</span>
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Dashboard Link */}
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {/* User Section */}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-300 hidden sm:block">
                    {user.name}
                  </span>
                </div>

                {/* Logout Button */}
                <button 
                  onClick={logout} 
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-5 py-2.5 text-gray-300 hover:text-white font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;