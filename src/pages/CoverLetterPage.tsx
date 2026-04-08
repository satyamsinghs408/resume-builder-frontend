import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const CoverLetterPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16 flex items-center justify-center">
      <div className="absolute top-1/2 right-1/4 w-125 h-125 bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 left-1/4 w-100 h-100 bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 relative overflow-hidden"
        >
          {/* Neon Top Border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-cyan-400 opacity-50" />
          
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Sparkles className="w-10 h-10 text-indigo-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">AI Cover Letter Generator</h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-700 font-bold text-sm tracking-widest uppercase mb-8 border border-cyan-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Coming Soon in Q4
          </div>

          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We are currently building an intelligent cover letter generator that pairs perfectly with your CareerLeaf resume. It will automatically match the template design and extract your key skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link to="/editor">
               <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-xl hover:-translate-y-1 transition-all duration-300">
                 Build Your Resume First
               </button>
             </Link>
             <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 border border-slate-200 rounded-xl font-bold shadow-sm hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300">
                 Join Waitlist
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoverLetterPage;
