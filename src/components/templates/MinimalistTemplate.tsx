import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const MinimalistTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#000000';
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo;

  return (
    <div className="font-sans text-gray-800 p-10 h-full max-w-[210mm] mx-auto">
      {/* Header - Left Aligned, Clean */}
      <div className="mb-8">
        <h1 className="text-4xl font-light tracking-tight mb-2" style={{ color: primaryColor }}>
          {firstName} <span className="font-bold">{lastName}</span>
        </h1>
        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
          <span>{email}</span>
          <span>{phone}</span>
          <span>{address}</span>
        </div>
      </div>

      {/* Content - Single Column, Very Airy */}
      <div className="space-y-8">
        
        {/* Experience */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-[1fr_3fr] gap-4">
                <div className="text-sm text-gray-400 font-medium pt-1">
                    <div className="mb-1 text-gray-800 font-semibold">{exp.company}</div>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{exp.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-prose">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Education</h2>
          {resumeData.education.map((edu, index) => (
             <div key={index} className="grid grid-cols-[1fr_3fr] gap-4 mb-4">
                <div className="text-sm text-gray-400 font-medium pt-1">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.degree}</p>
                </div>
             </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default MinimalistTemplate;
