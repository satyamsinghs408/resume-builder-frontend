import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();


  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition">
          Resume<span className="text-blue-500">Builder</span>
        </Link>
        
        {/* Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition font-medium">
                Dashboard
              </Link>
              <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
                <span className="text-sm text-gray-400">Hi, {user.name}</span>
                <button 
                  onClick={logout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
              <Link 
                to="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;