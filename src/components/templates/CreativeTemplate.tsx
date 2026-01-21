import React from 'react';
import { TemplateProps } from '../../types';
import { formatDateRange } from '../../utils/dateUtils';

const CreativeTemplate: React.FC<TemplateProps> = ({ resumeData, theme }) => {
  const primaryColor = theme?.primaryColor || '#ec4899'; // Pink default
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo;

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

             <section>
                 <div className="p-6 rounded-2xl text-white" style={{ backgroundColor: primaryColor }}>
                     <h2 className="text-xl font-black mb-2 opacity-90">Contact</h2>
                     <p className="text-sm font-medium opacity-80">{phone}</p>
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
