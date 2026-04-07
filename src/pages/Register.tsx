import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength indicator
  const getPasswordStrength = () => {
    if (password.length === 0) return { level: 0, text: '', color: '' };
    if (password.length < 6) return { level: 1, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { level: 2, text: 'Medium', color: 'bg-amber-500' };
    return { level: 3, text: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await register(name, email, password);
    setIsLoading(false);
    if (success) {
      navigate('/editor');
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#0F172A]">
      
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-slate-50 relative">
        {/* Light glow background for contrast */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-50 rounded-full blur-[100px] -z-10 opacity-60" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
             <img src="/logo.png" alt="CareerLeaf" className="h-10 w-auto object-contain" />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 lg:p-10 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-400 to-indigo-500 rounded-t-3xl" />
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight mt-1">Create Account</h2>
            <p className="text-slate-500 text-sm mb-8 font-medium">Start building professional resumes today</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">Full Name</label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-cyan-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-slate-900 font-medium text-sm shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-cyan-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-slate-900 font-medium text-sm shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <input 
                    type="password" 
                    placeholder="Create a secure password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-cyan-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all text-slate-900 font-medium text-sm shadow-xs"
                    required
                    minLength={6}
                  />
                </div>
                
                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-3.5 space-y-2">
                    <div className="flex gap-1.5 px-0.5">
                      {[1, 2, 3].map((level) => (
                        <div 
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                            strength.level >= level ? strength.color : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">
                      Strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.text}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 mt-2 bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.35)] active:scale-[0.98] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4.5 h-4.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest px-1">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Login Link */}
            <p className="text-center text-slate-500 text-sm font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-600 font-bold hover:text-cyan-500 hover:underline transition-all">
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 text-xs mt-8 font-medium">
            By creating an account, you agree to our Terms of Service
          </p>
        </motion.div>
      </div>
      
      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0F172A] p-12 items-center justify-center">
        {/* Subtle Glow */}
        <div className="absolute top-1/3 right-1/4 w-100 h-100 bg-cyan-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-75 h-75 bg-indigo-600/10 rounded-full blur-[100px]" />
        
        {/* Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[length:24px_24px] opacity-5 filter invert" />
        
        {/* Content */}
        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-10">
              <img src="/logo.png" alt="CareerLeaf" className="h-10 w-auto object-contain bg-white rounded-lg px-2 py-1 shadow-sm" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Start your journey <br />
              <span className="text-slate-400 font-bold">to your dream job.</span>
            </h2>
            <p className="text-slate-400 text-base mb-10 leading-relaxed font-medium">
              Create stunning, professional resumes that help you stand out from the crowd.
            </p>

            {/* Benefits */}
            <div className="space-y-5">
              {[
                'Free forever — no credit card needed',
                '5+ professional templates unlocked', 
                'Export to premium PDF instantly'
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <CheckCircle className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;