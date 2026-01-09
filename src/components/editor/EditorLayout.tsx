import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, FileText, Briefcase, GraduationCap, Download } from 'lucide-react';

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
  
  const steps = [
      { id: 1, icon: FileText, label: "Details" },
      { id: 2, icon: Briefcase, label: "Experience" },
      { id: 3, icon: GraduationCap, label: "Education" },
      { id: 4, icon: Download, label: "Finalize" },
  ];

  return (
    <div className="flex flex-col h-full bg-linear-to-br from-gray-50 to-blue-50/30 font-sans text-gray-800">
      
      {/* Top Navigation Bar */}
      <div className="h-20 border-b border-gray-200/60 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between z-20 sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                 <FileText size={20} className="stroke-[2.5]" />
             </div>
             <div>
                 <h1 className="font-bold text-xl tracking-tight text-gray-900">Resume<span className="text-blue-600">Builder</span></h1>
                 <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Professional Edition</p>
             </div>
          </div>

          <div className="flex items-center gap-1">
               {steps.map((step, idx) => {
                   const isActive = step.id === currentStep;
                   const isCompleted = step.id < currentStep;
                   const Icon = step.icon;

                   return (
                       <div key={idx} className="flex items-center">
                           <div className={`
                               flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300
                               ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 
                                 isCompleted ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}
                           `}>
                               {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
                               <span className={`text-sm font-bold ${!isActive && 'hidden md:block'}`}>{step.label}</span>
                           </div>
                           {idx < steps.length - 1 && (
                               <div className={`w-8 h-0.5 mx-2 rounded-full transition-colors ${isCompleted ? 'bg-blue-200' : 'bg-gray-100'}`}></div>
                           )}
                       </div>
                   );
               })}
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto py-12 px-6">
           <motion.div
               key={currentStep}
               initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
               transition={{ duration: 0.4, ease: "easeOut" }}
           >
               <div className="mb-8">
                   <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{title}</h2>
                   <p className="text-gray-500 text-lg">Make it stand out.</p>
               </div>

               <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 ring-4 ring-gray-50">
                    {children}
               </div>
           </motion.div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="h-24 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex items-center justify-between px-10 z-20 sticky bottom-0">
         <button 
             onClick={onBack}
             disabled={!onBack || currentStep === 1}
             className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-600 transition-all
                hover:bg-gray-100 hover:text-gray-900 active:scale-95
                disabled:opacity-0 disabled:pointer-events-none
             `}
         >
             <ChevronLeft size={20} />
             Back
         </button>

         <button 
             onClick={onNext}
             disabled={isSubmitting}
             className="
                group relative flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold 
                shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 hover:-translate-y-1 active:scale-95 transition-all
                disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden
             "
         >
             <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             
             <span className="relative z-10">{isSubmitting ? 'Saving...' : (currentStep === totalSteps ? 'Finish & Download' : 'Next Step')}</span>
             {!isSubmitting && <ChevronRight size={20} className="relative z-10" />}
         </button>
      </div>

    </div>
  );
};

export default EditorLayout;
