import React from 'react';
import { Experience } from '../types';
import { Input, TextArea } from './ui';

interface ExperienceFormProps {
  experience: Experience[];
  handleExperienceChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, handleExperienceChange, addExperience, removeExperience }) => {
  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-8">
        Highlight your career history. Start with your most recent position.
      </p>
      
      {experience.map((exp, index) => (
        <div key={index} className="mb-6 md:mb-10 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-100 relative group transition-all hover:border-blue-200 hover:shadow-sm">
          {/* Header for Job Block */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
              Position {index + 1}
            </span>
            {experience.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeExperience(index)} 
                className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-1"
              >
                <span>Remove</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Input 
                  name="title" 
                  label="Job Title"
                  placeholder="e.g. Senior Software Engineer" 
                  value={exp.title} 
                  onChange={(e) => handleExperienceChange(e, index)} 
                />
                <Input 
                  name="company" 
                  label="Company Name"
                  placeholder="e.g. Google" 
                  value={exp.company} 
                  onChange={(e) => handleExperienceChange(e, index)} 
                />
            </div>
            
            <TextArea 
              name="description" 
              label="Description & Achievements"
              placeholder="• Developed new features...&#10;• Improved performance by 20%..." 
              value={exp.description} 
              onChange={(e) => handleExperienceChange(e, index)} 
            />
          </div>
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={addExperience} 
        className="text-blue-600 font-bold hover:text-blue-800 transition flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add Another Position
      </button>
    </div>
  );
};

export default ExperienceForm;