import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, LogOut, User, Menu, X, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);


  const publicLinks = [
    { name: 'Templates', href: '/templates' },
    { name: 'Resume Examples', href: '/examples' },
    { name: 'Cover Letter', href: '/cover-letter' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  const mobileOnlyLinks = [
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50' 
        : 'bg-white/50 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="CareerLeaf" className="h-10 w-auto object-contain" />
        </Link>

        {/* Main Public Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
            {publicLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all relative ${
                    isActive 
                      ? 'text-indigo-600 bg-indigo-50 font-semibold' 
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600" />
                  )}
                </Link>
              );
            })}
          </nav>

        {/* Right Actions - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/dashboard" 
                className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <Link 
                  to="/profile" 
                  className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center border border-indigo-200 hover:bg-indigo-200 transition-colors shadow-sm"
                  title="My Profile"
                >
                  <User className="w-4 h-4 text-indigo-700" />
                </Link>
                <button 
                  onClick={logout} 
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all group"
                  title="Logout"
                >
                  <LogOut className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-linear-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:-translate-y-1"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Slide-out */}
      <div className={`
        lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl
        transition-all duration-300 ease-in-out origin-top overflow-hidden
        ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
      `}>
        <div className="px-4 py-6 space-y-5">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {[...publicLinks, ...mobileOnlyLinks].map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`} />
                </Link>
              );
            })}
          </nav>

          <hr className="border-slate-100" />

          {/* Mobile User Actions */}
          <div className="flex flex-col gap-3 pt-2">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  Go to Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4.5 h-4.5" />
                  My Profile ({user.name})
                </Link>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }} 
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/login" 
                  className="flex-1 flex items-center justify-center px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="flex-1 flex items-center justify-center px-5 py-3 bg-linear-to-r from-indigo-600 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
