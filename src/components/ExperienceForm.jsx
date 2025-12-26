import React from 'react';

const ExperienceForm = ({ experience, handleExperienceChange, addExperience, removeExperience }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Experience</h3>
      
      {experience.map((exp, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
          <div className="grid grid-cols-1 gap-3">
            <input 
              name="title" 
              placeholder="Job Title" 
              value={exp.title} 
              onChange={(e) => handleExperienceChange(e, index)} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input 
              name="company" 
              placeholder="Company" 
              value={exp.company} 
              onChange={(e) => handleExperienceChange(e, index)} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <textarea 
              name="description" 
              placeholder="Description" 
              value={exp.description} 
              onChange={(e) => handleExperienceChange(e, index)} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 h-24"
            />
          </div>
          
          {experience.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeExperience(index)} 
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Remove Job
            </button>
          )}
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={addExperience} 
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm"
      >
        + Add Another Job
      </button>
    </div>
  );
};

export default ExperienceForm;