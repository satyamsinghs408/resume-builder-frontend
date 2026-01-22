import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const ExecutiveTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#1e3a8a'; // Dark blue default
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

  return (
    <div className="font-serif text-gray-800 h-full max-w-[210mm] mx-auto bg-gray-50/30 p-8 border-t-8" style={{ borderColor: primaryColor }}>
      
      {/* Header - Centered, Traditional but bold */}
      <div className="text-center mb-10 border-b-2 border-gray-200 pb-8">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
          {firstName} {lastName}
        </h1>
        <div className="flex justify-center items-center gap-3 text-sm font-semibold text-gray-600">
          <span>{email}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span>{phone}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span>{address}</span>
        </div>
      </div>

      {/* Two Column Layout for Content */}
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        
        {/* Main Column */}
        <div>
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-0.5 flex-1 bg-gray-200"></div>
               <h2 className="text-lg font-bold uppercase tracking-wider text-gray-700">Professional Experience</h2>
               <div className="h-0.5 flex-1 bg-gray-200"></div>
            </div>
            
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6 relative pl-4 border-l-2" style={{ borderColor: primaryColor }}>
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                    <div className="text-xs font-bold text-gray-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                </div>
                <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">{exp.company}</div>
                <p className="text-sm text-gray-700 leading-relaxed text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Side Column */}
        <div className="bg-gray-100/50 p-4 rounded-lg h-fit">
           <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-300 pb-2 mb-4">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="font-bold text-gray-900 text-sm">{edu.school}</div>
                  <div className="text-xs text-gray-600 italic mb-1">{edu.degree}</div>
                  <div className="text-xs font-bold text-gray-400">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </div>
                </div>
              ))}
           </section>

           {/* Skills Placeholder (since we don't have skills state yet, just static for visual) */}
           <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-300 pb-2 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['Leadership', 'Management', 'Strategy'].map(skill => (
                    <span key={skill} className="text-xs font-semibold px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">
                        {skill}
                    </span>
                ))}
              </div>
           </section>
        </div>

      </div>
    </div>
  );
};

export default ExecutiveTemplate;
