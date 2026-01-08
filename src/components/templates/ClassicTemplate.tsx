// src/components/templates/ClassicTemplate.tsx
import React from 'react';
import { TemplateProps } from '../../types';

const ClassicTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#1f2937'; // gray-800 default

  return (
    <div className="font-serif text-gray-800 p-8 h-full">
      {/* Header */}
      <div 
        className="text-center border-b-2 pb-4 mb-6"
        style={{ borderColor: primaryColor }}
      >
        <h1 
            className="text-4xl font-bold uppercase tracking-wider"
            style={{ color: primaryColor }}
        >
            {resumeData.firstName} {resumeData.lastName}
        </h1>
        <div className="flex justify-center gap-4 text-sm mt-2 text-gray-600">
          <span>{resumeData.email}</span>
          <span>|</span>
          <span>{resumeData.phone}</span>
          <span>|</span>
          <span>{resumeData.address}</span>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 
            className="text-lg font-bold uppercase border-b mb-3"
            style={{ color: primaryColor, borderColor: '#d1d5db' }}
        >
            Professional Experience
        </h3>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-lg" style={{ color: primaryColor }}>{exp.title}</h4>
              <span className="text-sm italic text-gray-600">{exp.company}</span>
            </div>
            <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h3 
            className="text-lg font-bold uppercase border-b mb-3"
            style={{ color: primaryColor, borderColor: '#d1d5db' }}
        >
            Education
        </h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div>
              <div className="font-bold" style={{ color: primaryColor }}>{edu.school}</div>
              <div className="text-sm italic">{edu.degree}</div>
            </div>
            <div className="text-sm font-semibold">{edu.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassicTemplate;