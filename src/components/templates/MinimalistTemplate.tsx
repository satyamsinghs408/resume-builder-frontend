import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const MinimalistTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#000000';
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

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
        
        {/* Summary */}
        {resumeData.personalInfo?.summary && (
            <div className="mb-4 text-sm leading-relaxed text-gray-600 max-w-prose">
                {resumeData.personalInfo.summary}
            </div>
        )}

        {/* Skills - Horizontal List */}
        {resumeData.skills && resumeData.skills.length > 0 && (
             <section>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                    {resumeData.skills.map(skill => (
                        <span key={skill} className="border-b border-gray-200 pb-0.5">{skill}</span>
                    ))}
                </div>
             </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
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
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Projects</h2>
              <div className="space-y-6">
                {resumeData.projects.map((proj, index) => (
                  <div key={index} className="grid grid-cols-[1fr_3fr] gap-4">
                    <div className="text-sm text-gray-400 font-medium pt-1">
                       {proj.technologies && <div className="text-xs text-gray-500">{proj.technologies.slice(0,3).join(', ')}</div>}
                       {proj.link && <a href={proj.link} className="text-xs text-blue-500 underline mt-1 block">View Project</a>}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{proj.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-prose">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
        )}

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

        {/* Certifications & Languages */}
        {( (resumeData.certifications && resumeData.certifications.length > 0) || (resumeData.languages && resumeData.languages.length > 0) ) && (
            <section className="grid grid-cols-2 gap-8">
                {resumeData.certifications && resumeData.certifications.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Certifications</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {resumeData.certifications.map((cert, i) => (
                                <li key={i}>
                                    <span className="font-semibold">
                                        {cert.name}
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noreferrer" className="ml-1 text-blue-500 hover:underline text-xs">
                                                [Link]
                                            </a>
                                        )}
                                    </span> <span className="text-gray-400">|</span> {cert.issuer}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 {resumeData.languages && resumeData.languages.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Languages</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {resumeData.languages.map((lang, i) => (
                                <li key={i}>
                                    <span className="font-semibold">{lang.language}</span> <span className="text-gray-400"> - </span> {lang.proficiency}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        )}

      </div>
    </div>
  );
};

export default MinimalistTemplate;
