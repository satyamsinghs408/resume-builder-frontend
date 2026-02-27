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
    <div className="flex flex-col h-full bg-[#F8FAFC] font-sans text-slate-800">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto py-2 px-6">
           <motion.div
               key={currentStep}
               initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
               transition={{ duration: 0.4, ease: "easeOut" }}
           >
               <div className="mb-2">
                   <h2 className="text-2xl font-extrabold text-slate-900 mb-0.5 tracking-tight">{title}</h2>
                   <p className="text-slate-500 text-base">Make it stand out.</p>
               </div>

               <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200/60 ring-4 ring-slate-50">
                    {children}
               </div>
           </motion.div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="h-18 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 flex items-center justify-between px-8 z-20 sticky bottom-0">
         <button 
             onClick={onBack}
             disabled={!onBack || currentStep === 1}
             className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-slate-600 transition-all duration-200
                hover:bg-slate-100 hover:text-slate-900 active:scale-95
                disabled:opacity-0 disabled:pointer-events-none
             `}
         >
             <ChevronLeft size={18} />
             Back
         </button>

         <button 
             onClick={onNext}
             disabled={isSubmitting}
             className="
                group relative flex items-center gap-2 px-7 py-3 bg-slate-900 text-white rounded-lg font-semibold 
                shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/15 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300
                disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden text-sm
             "
         >
             <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/6 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             
             <span className="relative z-10">{isSubmitting ? 'Saving...' : (currentStep === totalSteps ? 'Finish & Download' : 'Next Step')}</span>
             {!isSubmitting && <ChevronRight size={18} className="relative z-10" />}
         </button>
      </div>

    </div>
  );
};

export default EditorLayout;
