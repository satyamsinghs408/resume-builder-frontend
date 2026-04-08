import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface EditorLayoutProps {
    children: React.ReactNode;
    currentStep: number;
    totalSteps: number;
    title: string;
    onNext?: () => void;
    onBack?: () => void;
    isSubmitting?: boolean;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ 
    children, currentStep, totalSteps, title, onNext, onBack, isSubmitting = false 
}) => {
  
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] font-sans text-slate-800 relative z-0">
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/2 left-0 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[80px] -z-10 pointer-events-none -translate-x-1/2" />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto py-6 px-3 md:py-8 md:px-8">
           <motion.div
               key={currentStep}
               initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
               transition={{ duration: 0.4, ease: "easeOut" }}
           >
               <div className="mb-4">
                   <h2 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{title}</h2>
                   <p className="text-cyan-600/80 font-bold text-sm tracking-widest uppercase">Step {currentStep} of {totalSteps}</p>
               </div>

               <div className="bg-white rounded-3xl p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 ring-4 ring-indigo-50/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-cyan-400 opacity-50" />
                    {children}
               </div>
           </motion.div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="h-20 lg:h-24 bg-white/80 backdrop-blur-3xl border-t border-slate-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] flex items-center justify-between px-6 lg:px-10 z-20 sticky bottom-0">
         <button 
             onClick={onBack}
             disabled={!onBack || currentStep === 1}
             className={`
                flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-500 transition-all duration-300 shadow-xs border border-transparent
                hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-200 active:scale-95
                disabled:opacity-0 disabled:pointer-events-none
             `}
         >
             <ChevronLeft size={20} className="stroke-[2.5]" />
             Back
         </button>

         <button 
             onClick={onNext}
             disabled={isSubmitting}
             className="
                group relative flex items-center gap-3 px-8 py-4 bg-linear-to-r from-indigo-600 to-cyan-500 text-white rounded-xl font-bold 
                shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.35)] active:scale-[0.98] hover:-translate-y-1 transition-all duration-300
                disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden text-base tracking-wide
             "
         >
             <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
             
             <span className="relative z-10">{isSubmitting ? 'Saving...' : (currentStep === totalSteps ? 'Finish & Download' : 'Next Step')}</span>
             {!isSubmitting && <ChevronRight size={20} className="relative z-10 stroke-[2.5]" />}
         </button>
      </div>

    </div>
  );
};

export default EditorLayout;
