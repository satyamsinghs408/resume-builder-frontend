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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/6">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
            <FileText className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Resume<span className="text-emerald-400">Builder</span>
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-1.5">
          {user ? (
            <>
              {/* Dashboard Link */}
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  location.pathname === '/dashboard'
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/6'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {/* User Section */}
              <div className="flex items-center gap-2.5 ml-3 pl-3 border-l border-white/8">
                {/* User Info */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-slate-300 hidden sm:block font-medium">
                    {user.name}
                  </span>
                </div>

                {/* Logout Button */}
                <button 
                  onClick={logout} 
                  className="flex items-center gap-2 px-3.5 py-2 bg-red-500/10 hover:bg-red-500/15 text-red-400 hover:text-red-300 rounded-lg font-medium text-sm transition-all duration-200"
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
                className="px-4 py-2 text-sm text-slate-300 hover:text-white font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-sm shadow-emerald-500/20 hover:shadow-md hover:shadow-emerald-500/25 transition-all duration-200"
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