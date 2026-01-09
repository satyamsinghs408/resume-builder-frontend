// src/components/templates/ClassicTemplate.tsx
import React from 'react';
import { TemplateProps } from '../../types';

const ClassicTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#1f2937'; // gray-800 default
  
  const hasName = resumeData.firstName || resumeData.lastName;
  const hasContact = resumeData.email || resumeData.phone || resumeData.address;

  return (
    <div className="font-serif text-gray-800 p-10 h-full">
      {/* Header */}
      <div 
        className="text-center border-b-2 pb-6 mb-8"
        style={{ borderColor: primaryColor }}
      >
        <h1 
            className="text-4xl font-bold uppercase tracking-widest"
            style={{ color: primaryColor }}
        >
            {hasName 
              ? `${resumeData.firstName} ${resumeData.lastName}`.trim()
              : <span className="text-gray-300 italic">Your Name</span>
            }
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-sm mt-4 text-gray-600">
          {resumeData.email ? (
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {resumeData.email}
            </span>
          ) : null}
          {resumeData.phone ? (
            <>
              {resumeData.email && <span className="text-gray-300">•</span>}
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {resumeData.phone}
              </span>
            </>
          ) : null}
          {resumeData.address ? (
            <>
              {(resumeData.email || resumeData.phone) && <span className="text-gray-300">•</span>}
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {resumeData.address}
              </span>
            </>
          ) : null}
          {!hasContact && (
            <span className="text-gray-300 italic">Contact information will appear here</span>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h3 
            className="text-lg font-bold uppercase border-b-2 mb-4 pb-2 tracking-wide"
            style={{ color: primaryColor, borderColor: primaryColor + '30' }}
        >
            Professional Experience
        </h3>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-5">
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-lg" style={{ color: primaryColor }}>
                {exp.title || <span className="text-gray-300 italic text-base">Job Title</span>}
              </h4>
              <span className="text-sm italic text-gray-600">
                {exp.company || <span className="text-gray-300">Company Name</span>}
              </span>
            </div>
            <p className="text-sm mt-2 whitespace-pre-line leading-relaxed text-gray-700">
              {exp.description || <span className="text-gray-300 italic">Job description will appear here...</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div>
        <h3 
            className="text-lg font-bold uppercase border-b-2 mb-4 pb-2 tracking-wide"
            style={{ color: primaryColor, borderColor: primaryColor + '30' }}
        >
            Education
        </h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="flex justify-between items-center mb-3">
            <div>
              <div className="font-bold" style={{ color: primaryColor }}>
                {edu.school || <span className="text-gray-300 italic font-normal">School Name</span>}
              </div>
              <div className="text-sm italic text-gray-600">
                {edu.degree || <span className="text-gray-300">Degree</span>}
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-600">
              {edu.year || <span className="text-gray-300">Year</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassicTemplate;