// src/components/templates/ModernTemplate.tsx
import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const ModernTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#2c3e50'; // Dark Blue default
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo;

  return (
    <div className="flex h-full font-sans">
      {/* Sidebar (Left) */}
      <div 
        className="w-1/3 text-white p-6 pt-10"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold border-b border-gray-400/30 pb-2 mb-4">Contact</h2>
          <div className="text-sm space-y-2 text-gray-100">
            <p className="wrap-break-word">{email}</p>
            <p>{phone}</p>
            <p>{address}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold border-b border-gray-400/30 pb-2 mb-4">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="font-bold text-white">{edu.degree}</div>
              <div className="text-sm text-gray-300">{edu.school}</div>
              <div className="text-xs text-gray-400 mt-1">
                {formatDateRange(edu.startDate, edu.endDate, edu.current)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content (Right) */}
      <div className="w-2/3 bg-white p-8 pt-10">
        <h1 
            className="text-5xl font-extrabold text-gray-800 uppercase leading-none mb-2"
        >
          {firstName}
        </h1>
        <h1 
            className="text-5xl font-extrabold uppercase leading-none mb-10"
            style={{ color: primaryColor }}
        >
          {lastName}
        </h1>

        <h3 
            className="text-2xl font-bold text-gray-800 border-b-4 pb-2 mb-6 w-max"
            style={{ borderColor: primaryColor }}
        >
            Experience
        </h3>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-8 relative border-l-2 border-gray-200 pl-4 ml-2">
             <div 
                className="absolute -left-2.25 top-0 w-4 h-4 rounded-full border-2 border-white"
                style={{ backgroundColor: primaryColor }}
             ></div>
            <h4 className="text-xl font-bold text-gray-800">{exp.title}</h4>
            <div className="flex justify-between items-baseline mb-2">
              <span 
                  className="font-semibold text-sm"
                  style={{ color: primaryColor }}
              >
                  {exp.company}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;
