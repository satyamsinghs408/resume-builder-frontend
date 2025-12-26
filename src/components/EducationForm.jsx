import React from 'react';

const EducationForm = ({ education, handleEducationChange, addEducation, removeEducation }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Education</h3>
      
      {education.map((edu, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input 
              name="school" 
              placeholder="School / University" 
              value={edu.school} 
              onChange={(e) => handleEducationChange(e, index)} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 md:col-span-3"
            />
            <input 
              name="degree" 
              placeholder="Degree" 
              value={edu.degree} 
              onChange={(e) => handleEducationChange(e, index)} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 md:col-span-2"
            />
            <input 
              name="year" 
              placeholder="Year" 
              value={edu.year} 
              onChange={(e) => handleEducationChange(e, index)} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          
          {education.length > 1 && (
            <button 
              type="button" 
              onClick={() => removeEducation(index)} 
              className="mt-2 text-red-500 text-sm hover:underline"
            >
              Remove Education
            </button>
          )}
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={addEducation} 
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition text-sm"
      >
        + Add Education
      </button>
    </div>
  );
};

export default EducationForm;