import React from 'react';

interface EditorLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  currentStep,
  totalSteps,
  title,
  children,
  onBack,
  onNext,
  isNextDisabled = false,
  isSubmitting = false
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-100 w-full">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>Build Your Resume</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{title}</h2>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </div>

      {/* Footer / Navigation Actions */}
      <div className="px-8 py-5 border-t border-gray-100 bg-white flex justify-between items-center sticky bottom-0 z-10">
        <button
          onClick={onBack}
          disabled={!onBack}
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
            onBack 
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' 
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={isNextDisabled || isSubmitting}
          className={`px-8 py-2.5 rounded-lg font-bold shadow-lg transform transition-all active:scale-95 ${
            isNextDisabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30'
          }`}
        >
          {isSubmitting ? 'Saving...' : currentStep === totalSteps ? 'Finish & Download' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default EditorLayout;
