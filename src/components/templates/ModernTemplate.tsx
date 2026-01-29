// src/components/templates/ModernTemplate.tsx
import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const ModernTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#2c3e50'; // Dark Blue default
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

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
            
            {/* Social Links in Sidebar */}
            <div className="pt-2 space-y-1">
                {resumeData.personalInfo?.socialLinks?.linkedin && (
                    <a href={resumeData.personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="block text-gray-200 hover:text-white truncate">LinkedIn</a>
                )}
                {resumeData.personalInfo?.socialLinks?.github && (
                    <a href={resumeData.personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="block text-gray-200 hover:text-white truncate">GitHub</a>
                )}
                {resumeData.personalInfo?.socialLinks?.portfolio && (
                    <a href={resumeData.personalInfo.socialLinks.portfolio} target="_blank" rel="noreferrer" className="block text-gray-200 hover:text-white truncate">Portfolio</a>
                )}
            </div>
          </div>
        </div>

        {/* Skills in Sidebar */}
        {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-8">
               <h2 className="text-xl font-bold border-b border-gray-400/30 pb-2 mb-4">Skills</h2>
               <div className="flex flex-wrap gap-2">
                 {resumeData.skills.map((skill, index) => (
                   <span key={index} className="bg-white/10 px-2 py-1 rounded text-xs text-white">
                     {skill}
                   </span>
                 ))}
               </div>
            </div>
        )}

        {/* Languages in Sidebar */}
        {resumeData.languages && resumeData.languages.length > 0 && (
            <div className="mb-8">
               <h2 className="text-xl font-bold border-b border-gray-400/30 pb-2 mb-4">Languages</h2>
               <div className="space-y-2">
                 {resumeData.languages.map((lang, index) => (
                   <div key={index} className="flex justify-between text-sm">
                     <span className="font-medium text-white">{lang.language}</span>
                     <span className="text-gray-300 text-xs opacity-80">{lang.proficiency}</span>
                   </div>
                 ))}
               </div>
            </div>
        )}

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

        {/* Professional Summary */}
        {resumeData.personalInfo?.summary && (
            <div className="mb-8 text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {resumeData.personalInfo.summary}
            </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
            <div className="mb-8">
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
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="mb-8">
                <h3 
                    className="text-2xl font-bold text-gray-800 border-b-4 pb-2 mb-6 w-max"
                    style={{ borderColor: primaryColor }}
                >
                    Projects
                </h3>
                {resumeData.projects.map((proj, index) => (
                  <div key={index} className="mb-6 relative border-l-2 border-gray-200 pl-4 ml-2">
                     <div 
                        className="absolute -left-2.25 top-0 w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: primaryColor }}
                     ></div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-gray-800">{proj.title}</h4>
                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">Link</a>}
                    </div>
                    {proj.technologies && (
                        <div className="text-xs font-semibold text-gray-500 mb-2">{proj.technologies.join(' • ')}</div>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{proj.description}</p>
                  </div>
                ))}
            </div>
        )}

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mb-8">
                <h3 
                    className="text-2xl font-bold text-gray-800 border-b-4 pb-2 mb-6 w-max"
                    style={{ borderColor: primaryColor }}
                >
                    Certifications
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                         <div>
                            <div className="font-bold text-gray-800">
                                {cert.name}
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noreferrer" className="ml-2 text-xs text-blue-500 hover:underline">
                                        View
                                    </a>
                                )}
                            </div>
                            <div className="text-xs text-gray-500">{cert.issuer}</div>
                         </div>
                         <div className="text-xs font-bold" style={{ color: primaryColor }}>{cert.date}</div>
                      </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
