import React from 'react';
import { Education } from '../types';
import { Input } from './ui';

interface EducationFormProps {
  education: Education[];
  handleEducationChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, handleEducationChange, addEducation, removeEducation }) => {
  return (
    <div className="animate-fadeIn">
      <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-8">
        Add your educational background.
      </p>
      
      {education.map((edu, index) => (
        <div key={index} className="mb-6 md:mb-10 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-100 relative group transition-all hover:border-blue-200 hover:shadow-sm">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">
              School {index + 1}
            </span>
            {education.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeEducation(index)} 
                className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors flex items-center gap-1"
              >
                 <span>Remove</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:col-span-2">
                <Input 
                  name="school" 
                  label="School / University"
                  placeholder="e.g. University of Technology" 
                  value={edu.school} 
                  onChange={(e) => handleEducationChange(e, index)} 
                />
            </div>
            <Input 
              name="degree" 
              label="Degree / Major"
              placeholder="e.g. Bachelor of Science" 
              value={edu.degree} 
              onChange={(e) => handleEducationChange(e, index)} 
            />
            <Input 
              name="year" 
              label="Graduation Year"
              placeholder="e.g. 2024" 
              value={edu.year} 
              onChange={(e) => handleEducationChange(e, index)} 
            />
          </div>
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={addEducation} 
        className="text-blue-600 font-bold hover:text-blue-800 transition flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Add Another School
      </button>
    </div>
  );
};

export default EducationForm;