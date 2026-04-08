import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RealisticTemplatePreview from '../components/landing/RealisticTemplatePreview';

const templates = [
  { id: 'classic', name: 'Classic Professional', desc: 'Standard ATS-friendly format perfect for corporate roles.', bg: 'bg-white', border: 'border-slate-200' },
  { id: 'modern', name: 'Modern Dark', desc: 'Sleek dark-mode header. Stands out in a pile of white pages.', bg: 'bg-slate-800', border: 'border-slate-700' },
  { id: 'minimalist', name: 'Minimalist Clean', desc: 'Lots of whitespace. Focus purely on your content.', bg: 'bg-white', border: 'border-slate-200' },
  { id: 'executive', name: 'Executive Leadership', desc: 'Authoritative typography and strong borders.', bg: 'bg-slate-50', border: 'border-slate-300' },
  { id: 'creative', name: 'Creative Portfolio', desc: 'Bold accent colors. Perfect for design and UI roles.', bg: 'bg-indigo-50', border: 'border-indigo-100' },
];

const TemplatesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">ATS-Friendly Templates</h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl">
            Choose from our collection of professionally designed resume templates. Every template is engineered to pass Applicant Tracking Systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl, i) => (
            <motion.div 
              key={tpl.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-full aspect-[1.0] rounded-2xl mb-6 relative border border-slate-200 shadow-inner overflow-hidden group/preview pointer-events-none bg-slate-100">
                 {/* Container that scrolls on hover */}
                 <div className="w-full h-[650px] transform scale-[0.58] origin-top-left absolute top-0 left-0 transition-transform duration-[2s] ease-in-out group-hover:-translate-y-[2%]" style={{ width: '172%' }}>
                   <RealisticTemplatePreview template={tpl.id as 'classic' | 'modern' | 'minimalist' | 'executive' | 'creative'} />
                 </div>

                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-auto">
                    <Link to="/editor">
                      <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
                        Use Template
                      </button>
                    </Link>
                 </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{tpl.name}</h3>
              <p className="text-slate-500 font-medium text-sm">{tpl.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
