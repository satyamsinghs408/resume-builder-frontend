// src/components/templates/ClassicTemplate.tsx
import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const ClassicTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#1f2937'; // gray-800 default
  
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};
  const hasName = firstName || lastName;
  const hasContact = email || phone || address;

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
              ? `${firstName} ${lastName}`.trim()
              : <span className="text-gray-300 italic">Your Name</span>
            }
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-sm mt-4 text-gray-600">
          {email ? (
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </span>
          ) : null}
          {phone ? (
            <>
              {email && <span className="text-gray-300">•</span>}
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </span>
            </>
          ) : null}
          {address ? (
            <>
              {(email || phone) && <span className="text-gray-300">•</span>}
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {address}
              </span>
            </>
          ) : null}
          {!hasContact && (
            <span className="text-gray-300 italic">Contact information will appear here</span>
          )}
          {resumeData.personalInfo?.socialLinks?.linkedin && (
              <a href={resumeData.personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
              </a>
          )}
          {resumeData.personalInfo?.socialLinks?.github && (
              <a href={resumeData.personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
              </a>
          )}
          {resumeData.personalInfo?.socialLinks?.portfolio && (
               <a href={resumeData.personalInfo.socialLinks.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                  Portfolio
               </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo?.summary && (
        <div className="mb-8 border-b-2 pb-6" style={{ borderColor: primaryColor + '30' }}>
            <h3 
                className="text-lg font-bold uppercase mb-3 tracking-wide"
                style={{ color: primaryColor }}
            >
                Professional Summary
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                {resumeData.personalInfo.summary}
            </p>
        </div>
      )}

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
            <div className="text-xs text-gray-500 mb-1">
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
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
              {formatDateRange(edu.startDate, edu.endDate, edu.current)}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mt-8">
            <h3 
                className="text-lg font-bold uppercase border-b-2 mb-3 pb-2 tracking-wide"
                style={{ color: primaryColor, borderColor: primaryColor + '30' }}
            >
                Skills
            </h3>
            <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700 border border-gray-200">
                        {skill}
                    </span>
                ))}
            </div>
          </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="mt-8">
            <h3 
                className="text-lg font-bold uppercase border-b-2 mb-4 pb-2 tracking-wide"
                style={{ color: primaryColor, borderColor: primaryColor + '30' }}
            >
                Projects
            </h3>
            {resumeData.projects.map((proj, index) => (
                <div key={index} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800">{proj.title || <span className="text-gray-300 italic">Project Title</span>}</h4>
                            {proj.link && (
                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">
                                ↗ Link
                                </a>
                            )}
                        </div>
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                         <div className="text-xs text-blue-600 mb-1 font-medium">
                            {proj.technologies.join(' • ')}
                         </div>
                    )}
                    <p className="text-sm text-gray-700 whitespace-pre-line">{proj.description || <span className="text-gray-300 italic">Project description...</span>}</p>
                </div>
            ))}
          </div>
      )}

       {/* Certifications & Languages Grid */}
       {( (resumeData.certifications && resumeData.certifications.length > 0) || (resumeData.languages && resumeData.languages.length > 0) ) && (
           <div className="flex gap-8 mt-8">
                {/* Certifications */}
                {resumeData.certifications && resumeData.certifications.length > 0 && (
                    <div className="flex-1">
                        <h3 
                            className="text-lg font-bold uppercase border-b-2 mb-4 pb-2 tracking-wide"
                            style={{ color: primaryColor, borderColor: primaryColor + '30' }}
                        >
                            Certifications
                        </h3>
                        {resumeData.certifications.map((cert, index) => (
                            <div key={index} className="mb-3">
                                <div className="font-bold text-sm text-gray-800">
                                    {cert.name || <span className="text-gray-300 italic">Certification Name</span>}
                                    {cert.link && (
                                        <a href={cert.link} target="_blank" rel="noreferrer" className="ml-1 text-blue-600 hover:underline text-xs">
                                            [View]
                                        </a>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">{cert.issuer || "Issuer"} • {cert.date || "Date"}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Languages */}
                {resumeData.languages && resumeData.languages.length > 0 && (
                    <div className="flex-1">
                        <h3 
                            className="text-lg font-bold uppercase border-b-2 mb-4 pb-2 tracking-wide"
                            style={{ color: primaryColor, borderColor: primaryColor + '30' }}
                        >
                            Languages
                        </h3>
                         {resumeData.languages.map((lang, index) => (
                            <div key={index} className="flex justify-between items-center mb-2 text-sm border-b border-gray-100 pb-1 last:border-0">
                                <span className="font-medium text-gray-700">{lang.language || <span className="text-gray-300 italic">Language</span>}</span>
                                <span className="text-gray-500 text-xs uppercase tracking-wider">{lang.proficiency || "Proficiency"}</span>
                            </div>
                        ))}
                    </div>
                )}
           </div>
       )}
    </div>
  );
};

export default ClassicTemplate;
