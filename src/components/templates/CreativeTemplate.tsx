import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const CreativeTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#ec4899'; // Pink default
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

  return (
    <div className="font-sans text-gray-800 h-full max-w-[210mm] mx-auto flex flex-col">
      
      {/* Header - Large Colored Block */}
      <div className="p-10 text-white relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20"></div>
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10"></div>
        
        <h1 className="text-5xl font-black mb-2 tracking-tighter relative z-10">
          {firstName}<br/>{lastName}
        </h1>
        <div className="text-sm font-medium opacity-90 relative z-10">
           {email} • {address}
        </div>
      </div>

      <div className="flex-1 p-10 grid grid-cols-2 gap-12 bg-white">
          
          {/* Left Col */}
          <div className="space-y-10">
              
              {/* Summary */}
              {resumeData.personalInfo?.summary && (
                <section>
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                      <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                      Profile
                    </h2>
                    <p className="text-gray-600 leading-relaxed font-medium text-sm">
                        {resumeData.personalInfo.summary}
                    </p>
                </section>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
              <section>
                  <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                      <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                      Experience
                  </h2>
                  <div className="space-y-8 border-l-2 border-gray-100 pl-6 ml-1">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-7.75 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: primaryColor }}></div>
                        <h3 className="font-bold text-xl leading-none mb-1">{exp.title}</h3>
                        <div className="flex flex-col mb-3">
                            <span className="text-sm font-bold text-gray-400">{exp.company}</span>
                            <span className="text-xs font-medium text-gray-400 mt-0.5">
                                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
              </section>
              )}

              {/* Projects */}
              {resumeData.projects && resumeData.projects.length > 0 && (
              <section>
                  <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                      <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                      Projects
                  </h2>
                  <div className="space-y-6">
                    {resumeData.projects.map((proj, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-xl leading-none">{proj.title}</h3>
                            {proj.link && <a href={proj.link} className="text-xs font-bold uppercase tracking-wider hover:underline" style={{ color: primaryColor }}>Link</a>}
                          </div>
                          {proj.technologies && <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wide">{proj.technologies.join(' / ')}</div>}
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">
                             {proj.description}
                          </p>
                      </div>
                    ))}
                  </div>
              </section>
              )}
          </div>

          {/* Right Col */}
          <div className="space-y-10">
             <section className="bg-gray-50 p-6 rounded-2xl">
                 <h2 className="text-xl font-black mb-4" style={{ color: primaryColor }}>Education</h2>
                 <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                            <div className="font-bold text-gray-800">{edu.school}</div>
                            <div className="text-sm text-gray-500">{edu.degree}</div>
                            <div className="text-xs font-bold mt-1 text-gray-400">
                                {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                            </div>
                        </div>
                    ))}
                 </div>
             </section>

             {/* Skills */}
             {resumeData.skills && resumeData.skills.length > 0 && (
             <section>
                 <h2 className="text-xl font-black mb-4" style={{ color: primaryColor }}>Skills</h2>
                 <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 rounded-lg text-sm font-bold bg-gray-100 text-gray-600 border border-gray-200">
                            {skill}
                        </span>
                    ))}
                 </div>
             </section>
             )}

             {/* Certifications */}
             {resumeData.certifications && resumeData.certifications.length > 0 && (
             <section>
                 <h2 className="text-xl font-black mb-4" style={{ color: primaryColor }}>Certifications</h2>
                 <div className="space-y-3">
                    {resumeData.certifications.map((cert, index) => (
                        <div key={index}>
                            <div className="font-bold text-gray-800 flex items-center gap-2">
                                {cert.name}
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noreferrer" className="text-xs font-normal text-blue-500 hover:underline">
                                        (Link)
                                    </a>
                                )}
                            </div>
                            <div className="text-xs font-bold text-gray-400">{cert.issuer}</div>
                        </div>
                    ))}
                 </div>
             </section>
             )}

             {/* Languages */}
             {resumeData.languages && resumeData.languages.length > 0 && (
             <section>
                 <h2 className="text-xl font-black mb-4" style={{ color: primaryColor }}>Languages</h2>
                 <div className="space-y-2">
                    {resumeData.languages.map((lang, index) => (
                        <div key={index} className="flex justify-between font-bold text-gray-700 text-sm">
                            <span>{lang.language}</span>
                            <span className="text-gray-400">{lang.proficiency}</span>
                        </div>
                    ))}
                 </div>
             </section>
             )}

             <section>
                 <div className="p-6 rounded-2xl text-white" style={{ backgroundColor: primaryColor }}>
                     <h2 className="text-xl font-black mb-2 opacity-90">Contact</h2>
                     <p className="text-sm font-medium opacity-80">{phone}</p>
                     
                     {/* Social Links */}
                     {(resumeData.personalInfo?.socialLinks?.linkedin || resumeData.personalInfo?.socialLinks?.portfolio) && (
                         <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
                             {resumeData.personalInfo?.socialLinks?.linkedin && <a href={resumeData.personalInfo.socialLinks.linkedin} className="block text-xs font-bold opacity-80 hover:opacity-100 truncate">LinkedIn</a>}
                             {resumeData.personalInfo?.socialLinks?.portfolio && <a href={resumeData.personalInfo.socialLinks.portfolio} className="block text-xs font-bold opacity-80 hover:opacity-100 truncate">Portfolio</a>}
                             {resumeData.personalInfo?.socialLinks?.github && <a href={resumeData.personalInfo.socialLinks.github} className="block text-xs font-bold opacity-80 hover:opacity-100 truncate">GitHub</a>}
                         </div>
                     )}
                 </div>
             </section>
          </div>
      </div>

      {/* Footer bar */}
      <div className="h-4 w-full" style={{ backgroundColor: primaryColor, opacity: 0.5 }}></div>

    </div>
  );
};

export default CreativeTemplate;
