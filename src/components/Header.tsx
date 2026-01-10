import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEditor } from '../context/EditorContext';
import { FileText, LayoutDashboard, LogOut, User, CheckCircle, Briefcase, GraduationCap, Download, Home, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentStep, totalSteps } = useEditor();
  const location = useLocation();
  const isEditorPage = location.pathname === '/editor';
  const hasEditorSteps = currentStep > 0 && totalSteps > 0;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const steps = [
    { id: 1, icon: FileText, label: "Details" },
    { id: 2, icon: Briefcase, label: "Experience" },
    { id: 3, icon: GraduationCap, label: "Education" },
    { id: 4, icon: Download, label: "Finalize" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-gray-900/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 md:px-6 h-full flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-tr from-blue-600 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
            <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg md:text-xl font-bold text-white">
              Resume<span className="text-blue-400">Builder</span>
            </span>
            {isEditorPage && (
              <p className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider">Professional Edition</p>
            )}
          </div>
        </Link>

        {/* Step Navigation - Desktop only */}
        {isEditorPage && hasEditorSteps && (
          <div className="hidden lg:flex items-center gap-1 ml-4">
            {steps.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300
                    ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                      isCompleted ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500'}
                  `}>
                    {isCompleted ? <CheckCircle size={13} /> : <Icon size={13} />}
                    <span className="text-xs font-bold">{step.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-4 h-0.5 mx-0.5 rounded-full transition-colors ${isCompleted ? 'bg-blue-500/50' : 'bg-gray-700'}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5">
          {user ? (
            <>
              {(isEditorPage || location.pathname === '/dashboard') && (
                <Link 
                  to="/" 
                  className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden lg:block">Home</span>
                </Link>
              )}

              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>

              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
                <div className="w-8 h-8 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-300 hidden xl:block max-w-24 truncate">
                  {user.name}
                </span>

                <button 
                  onClick={logout} 
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl font-medium text-sm transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:block">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm text-gray-300 hover:text-white font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-gray-900/98 backdrop-blur-xl border-b border-white/10 shadow-xl">
          <div className="px-3 py-3 space-y-1">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-3 bg-white/5 rounded-xl mb-2">
                  <div className="w-10 h-10 bg-linear-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">{user.name}</span>
                </div>

                {(isEditorPage || location.pathname === '/dashboard') && (
                  <Link 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                  </Link>
                )}

                <Link 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === '/dashboard'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>

                <button 
                  onClick={() => { logout(); setMobileMenuOpen(false); }} 
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl text-center hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
