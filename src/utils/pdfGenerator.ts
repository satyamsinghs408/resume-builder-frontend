import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "pdfmake/build/vfs_fonts";
import { ResumeData, ThemeConfig } from '../types';

// Register fonts - Simple and clean method (exactly like your working project)
pdfMake.vfs = vfs;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
};

const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
  if (!startDate) return '';
  const start = new Date(startDate).getFullYear();
  const end = current ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '');
  return `${start} - ${end}`;
};

const getClassicDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#000000';
  const { firstName, lastName, email, phone, socialLinks } = resumeData.personalInfo || {};
  
  // Format Social Links
  const socialTextParts = [];
  if (socialLinks?.linkedin) socialTextParts.push({ text: 'LinkedIn', link: socialLinks.linkedin, decoration: 'underline', color: 'blue' });
  if (socialLinks?.github) socialTextParts.push({ text: 'GitHub', link: socialLinks.github, decoration: 'underline', color: 'blue' });
  if (socialLinks?.portfolio) socialTextParts.push({ text: 'Portfolio', link: socialLinks.portfolio, decoration: 'underline', color: 'blue' });

  return {
    content: [
      // Header
      { text: `${firstName} ${lastName}`, style: 'header', color: primaryColor },
      { text: `Email: ${email} | Phone: ${phone}`, alignment: 'center', margin: [0, 0, 0, 5] },
      
      // Social Links
      (socialTextParts.length > 0) ? { 
          text: socialTextParts.reduce((acc: any[], curr, idx) => {
              if (idx > 0) acc.push(' | ');
              acc.push(curr);
              return acc;
          }, []), 
          alignment: 'center', margin: [0, 0, 0, 20], fontSize: 9 
      } : { text: '', margin: [0, 0, 0, 15] },

      // Experience
      ...(resumeData.experience?.length ? [
        { text: 'Experience', style: 'sectionHeader', color: primaryColor },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
        ...resumeData.experience.map(exp => ([
          { text: exp.title, style: 'jobTitle', margin: [0, 10, 0, 0] },
          { text: exp.company, italics: true, margin: [0, 0, 0, 5] },
          { text: `${formatDateRange(exp.startDate, exp.endDate, exp.current)}`, italics: true, fontSize: 10, margin: [0, 0, 0, 5] },
          { text: exp.description, margin: [0, 0, 0, 10] }
        ]))
      ] : []),

      // Education
      ...(resumeData.education?.length ? [
        { text: 'Education', style: 'sectionHeader', margin: [0, 20, 0, 5], color: primaryColor },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
        ...resumeData.education.map(edu => ([
          { text: edu.school, style: 'jobTitle', margin: [0, 10, 0, 0] },
          { columns: [{ text: edu.degree, italics: true }, { text: formatDateRange(edu.startDate, edu.endDate, edu.current), alignment: 'right' }], margin: [0, 0, 0, 10] }
        ]))
      ] : []),

      // Skills
      ...(resumeData.skills?.length ? [
         { text: 'Skills', style: 'sectionHeader', margin: [0, 20, 0, 5], color: primaryColor },
         { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
         { text: resumeData.skills.join(', '), margin: [0, 10, 0, 0] }
      ] : []),

      // Projects
      ...(resumeData.projects?.length ? [
        { text: 'Projects', style: 'sectionHeader', margin: [0, 20, 0, 5], color: primaryColor },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
        ...resumeData.projects.map(proj => ([
            { text: [
                { text: proj.title, bold: true, fontSize: 12 },
                ...(proj.link ? [{ text: ' (Link)', link: proj.link, color: 'blue', decoration: 'underline', fontSize: 10 }] : [])
              ], margin: [0, 10, 0, 2] 
            },
            ...(proj.technologies?.length ? [{ text: `Tech Stack: ${proj.technologies.join(', ')}`, fontSize: 10, italics: true, color: '#555', margin: [0, 0, 0, 5] }] : []),
            { text: proj.description, margin: [0, 0, 0, 10] }
        ]))
      ] : []),

      // Certifications
      ...(resumeData.certifications?.length ? [
          { text: 'Certifications', style: 'sectionHeader', margin: [0, 20, 0, 5], color: primaryColor },
          { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
          ...resumeData.certifications.map(cert => ([
             { text: cert.name, bold: true, margin: [0, 10, 0, 2] },
             { text: `${cert.issuer} | ${cert.date}`, fontSize: 10, italics: true, margin: [0, 0, 0, 5] },
             ...(cert.link ? [{ text: 'View Certificate', link: cert.link, color: 'blue', decoration: 'underline', fontSize: 10, margin: [0, 0, 0, 5] }] : [])
          ]))
      ] : []),

      // Languages
      ...(resumeData.languages?.length ? [
          { text: 'Languages', style: 'sectionHeader', margin: [0, 20, 0, 5], color: primaryColor },
          { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
          { ul: resumeData.languages.map(l => `${l.language} (${l.proficiency})`), margin: [0, 10, 0, 0] }
      ] : [])
    ],
    styles: {
      header: { fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
      sectionHeader: { fontSize: 16, bold: true, margin: [0, 15, 0, 5] },
      jobTitle: { fontSize: 14, bold: true }
    }
  };
};

const getModernDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#2c3e50';
  const secondaryColor = theme?.secondaryColor || '#ffffff';
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

  return {
    content: [
      {
        table: {
          widths: ['*'],
          body: [[{
            text: `${firstName} ${lastName}`.toUpperCase(),
            style: 'modernHeader', fillColor: primaryColor, color: secondaryColor || 'white', alignment: 'center', margin: [0, 10, 0, 10]
          }]]
        },
        layout: 'noBorders'
      },
      {
        columns: [
          {
            width: '30%',
            stack: [
              { text: 'CONTACT', style: 'modernSubHeader' },
              { text: email, style: 'smallText' },
              { text: phone, style: 'smallText' },
              { text: address, style: 'smallText' },
              
              // Social Links (Sidebar)
              ...(resumeData.personalInfo?.socialLinks?.linkedin ? [{ text: 'LinkedIn', link: resumeData.personalInfo.socialLinks.linkedin, style: 'smallText', decoration: 'underline', color: 'blue' }] : []),
              ...(resumeData.personalInfo?.socialLinks?.github ? [{ text: 'GitHub', link: resumeData.personalInfo.socialLinks.github, style: 'smallText', decoration: 'underline', color: 'blue' }] : []),
              ...(resumeData.personalInfo?.socialLinks?.portfolio ? [{ text: 'Portfolio', link: resumeData.personalInfo.socialLinks.portfolio, style: 'smallText', decoration: 'underline', color: 'blue' }] : []),

              // Education
              { text: 'EDUCATION', style: 'modernSubHeader', margin: [0, 20, 0, 5] },
              ...(resumeData.education || []).map(edu => ([
                { text: edu.school, bold: true, fontSize: 10 },
                { text: edu.degree, fontSize: 9 },
                { text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 9, italics: true, margin: [0, 0, 0, 10] }
              ])),

              // Skills (Sidebar)
              ...(resumeData.skills?.length ? [
                  { text: 'SKILLS', style: 'modernSubHeader', margin: [0, 20, 0, 5] },
                  { text: resumeData.skills.join(', '), fontSize: 9, lineHeight: 1.3 }
              ] : []),

              // Languages (Sidebar)
              ...(resumeData.languages?.length ? [
                  { text: 'LANGUAGES', style: 'modernSubHeader', margin: [0, 20, 0, 5] },
                  ...resumeData.languages.map(l => ({
                      text: `${l.language} (${l.proficiency})`, fontSize: 9, margin: [0, 0, 0, 2]
                  }))
              ] : [])
            ]
          },
          {
            width: '70%', margin: [20, 0, 0, 0],
            stack: [
              // Summary
              ...(resumeData.personalInfo?.summary ? [
                  { text: resumeData.personalInfo.summary, fontSize: 10, margin: [0, 0, 0, 15] }
              ] : []),

              // Experience
              { text: 'EXPERIENCE', style: 'modernSubHeader' },
              ...(resumeData.experience || []).map(exp => ([
                { text: exp.title, bold: true, fontSize: 12, color: primaryColor },
                { text: `${exp.company} | ${formatDateRange(exp.startDate, exp.endDate, exp.current)}`, italics: true, fontSize: 10 },
                { text: exp.description, fontSize: 10, margin: [0, 5, 0, 15] }
              ])),

              // Projects
              ...(resumeData.projects?.length ? [
                  { text: 'PROJECTS', style: 'modernSubHeader' },
                  ...resumeData.projects.map(proj => ([
                      { text: [
                          { text: proj.title, bold: true, fontSize: 11 },
                          ...(proj.link ? [{ text: ' (Link)', link: proj.link, decoration: 'underline', color: 'blue', fontSize: 10 }] : [])
                        ] 
                      },
                      ...(proj.technologies ? [{ text: proj.technologies.join(' • '), fontSize: 9, italics: true, color: '#555' }] : []),
                      { text: proj.description, fontSize: 10, margin: [0, 2, 0, 10] }
                  ]))
              ] : []),

              // Certifications
              ...(resumeData.certifications?.length ? [
                  { text: 'CERTIFICATIONS', style: 'modernSubHeader' },
                  ...resumeData.certifications.map(cert => ([
                      { 
                        text: [
                            { text: cert.name, bold: true, fontSize: 10 },
                            ...(cert.link ? [{ text: ' (Link)', link: cert.link, decoration: 'underline', color: 'blue', fontSize: 9 }] : [])
                        ]
                      },
                      { text: `${cert.issuer} | ${cert.date}`, fontSize: 9, italics: true, margin: [0, 0, 0, 5] }
                  ]))
              ] : [])
            ]
          }
        ],
        margin: [0, 20, 0, 0]
      }
    ],
    styles: {
      modernHeader: { fontSize: 24, bold: true, letterSpacing: 2 },
      modernSubHeader: { fontSize: 12, bold: true, color: primaryColor, margin: [0, 0, 0, 5], decoration: 'underline' },
      smallText: { fontSize: 9, margin: [0, 2, 0, 2] }
    }
  };
};

const getMinimalistDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#000000';
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

  return {
    content: [
      { text: `${firstName} ${lastName}`.toUpperCase(), style: 'minimalHeader', color: primaryColor },
      { text: `${email} | ${phone} | ${address}`, style: 'minimalSub', margin: [0, 5, 0, 20] },
      
      // Summary
      ...(resumeData.personalInfo?.summary ? [
          { text: resumeData.personalInfo.summary, fontSize: 10, margin: [0, 0, 0, 15] }
      ] : []),

      // Skills
      ...(resumeData.skills?.length ? [
          { text: resumeData.skills.join('  •  '), fontSize: 10, bold: true, color: '#555', margin: [0, 0, 0, 15] }
      ] : []),

      { text: 'EXPERIENCE', style: 'minimalSection', color: primaryColor },
      ...(resumeData.experience || []).map(exp => ({
        columns: [
          { text: exp.company, width: '25%', style: 'minimalGray' },
          {
            width: '75%',
            stack: [
              { text: exp.title, bold: true, fontSize: 11 },
              { text: formatDateRange(exp.startDate, exp.endDate, exp.current), fontSize: 10, italics: true, color: '#666' },
              { text: exp.description, style: 'minimalText' }
            ]
          }
        ],
        margin: [0, 0, 0, 15]
      })),

      // Projects
      ...(resumeData.projects?.length ? [
          { text: 'PROJECTS', style: 'minimalSection', color: primaryColor },
          ...resumeData.projects.map(proj => ({
            columns: [
              { 
                  width: '25%', 
                  stack: [
                      ...(proj.technologies ? [{ text: proj.technologies.slice(0, 3).join(', '), fontSize: 9, color: '#999' }] : []),
                      ...(proj.link ? [{ text: 'View Project', link: proj.link, fontSize: 9, decoration: 'underline', color: 'blue', margin: [0, 2, 0, 0] }] : [])
                  ]
              },
              {
                width: '75%',
                stack: [
                  { text: proj.title, bold: true, fontSize: 11 },
                  { text: proj.description, style: 'minimalText' }
                ]
              }
            ],
            margin: [0, 0, 0, 15]
          }))
      ] : []),

      { text: 'EDUCATION', style: 'minimalSection', color: primaryColor, margin: [0, 10, 0, 10] },
      ...(resumeData.education || []).map(edu => ({
        columns: [
          { text: formatDateRange(edu.startDate, edu.endDate, edu.current), width: '25%', style: 'minimalGray' },
          {
             width: '75%',
             stack: [
               { text: edu.school, bold: true, fontSize: 11 },
               { text: edu.degree, style: 'minimalText' }
             ]
          }
        ],
        margin: [0, 0, 0, 10]
      })),

      // Certifications & Languages
      ...( (resumeData.certifications?.length || resumeData.languages?.length) ? [
          { text: 'ADDITIONAL', style: 'minimalSection', color: primaryColor, margin: [0, 10, 0, 10] },
          {
              columns: [
                  ...(resumeData.certifications?.length ? [{
                      width: '50%',
                      stack: [
                          { text: 'CERTIFICATIONS', fontSize: 9, bold: true, color: '#999', margin: [0, 0, 0, 5] },
                          ...resumeData.certifications.map(cert => ({
                              text: [
                                  { text: `${cert.name} - ${cert.issuer}`, fontSize: 10 },
                                  ...(cert.link ? [{ text: ' (Link)', link: cert.link, decoration: 'underline', color: 'blue', fontSize: 9 }] : [])
                              ],
                              margin: [0, 0, 0, 2]
                          }))
                      ]
                  }] : []),
                  ...(resumeData.languages?.length ? [{
                      width: '50%',
                      stack: [
                          { text: 'LANGUAGES', fontSize: 9, bold: true, color: '#999', margin: [0, 0, 0, 5] },
                          ...resumeData.languages.map(l => ({
                              text: `${l.language} (${l.proficiency})`, fontSize: 10, margin: [0, 0, 0, 2]
                          }))
                      ]
                  }] : [])
              ]
          }
      ] : [])
    ],
    styles: {
      minimalHeader: { fontSize: 28, bold: true, letterSpacing: 1 },
      minimalSub: { fontSize: 9, color: '#666' },
      minimalSection: { fontSize: 10, bold: true, letterSpacing: 2, margin: [0, 0, 0, 10] },
      minimalGray: { fontSize: 9, color: '#999', bold: true },
      minimalText: { fontSize: 10, margin: [0, 2, 0, 0] }
    }
  };
};

const getExecutiveDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#1e3a8a';
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

  return {
    content: [
      { text: `${firstName} ${lastName}`.toUpperCase(), style: 'execHeader', color: primaryColor },
      { text: `${email} • ${phone} • ${address}`, alignment: 'center', fontSize: 9, color: '#555', margin: [0, 5, 0, 20] },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: primaryColor }] },
     
      // Summary
      ...(resumeData.personalInfo?.summary ? [
          { text: `"${resumeData.personalInfo.summary}"`, fontSize: 10, italics: true, alignment: 'center', margin: [40, 15, 40, 15], color: '#555' }
      ] : []),

      {
        columns: [
          // Main Column (65%)
          {
            width: '65%',
            stack: [
              { text: 'PROFESSIONAL EXPERIENCE', style: 'execSection', margin: [0, 0, 0, 10], color: primaryColor },
              ...(resumeData.experience || []).map(exp => ([
                { text: exp.title, fontSize: 12, bold: true },
                { text: `${exp.company.toUpperCase()} | ${formatDateRange(exp.startDate, exp.endDate, exp.current)}`, fontSize: 9, bold: true, color: primaryColor, margin: [0, 2, 0, 5] },
                { text: exp.description, fontSize: 10, alignment: 'justify', margin: [0, 0, 0, 15] }
              ])),

              // Projects
              ...(resumeData.projects?.length ? [
                  { text: 'PROJECTS', style: 'execSection', margin: [0, 10, 0, 10], color: primaryColor },
                  ...resumeData.projects.map(proj => ([
                      { text: [
                          { text: proj.title, fontSize: 11, bold: true },
                          ...(proj.link ? [{ text: ' (Link)', link: proj.link, color: 'blue', decoration: 'underline', fontSize: 10 }] : [])
                        ] 
                      },
                      ...(proj.technologies ? [{ text: proj.technologies.join(' • '), fontSize: 9, bold: true, color: '#777', margin: [0, 2, 0, 5] }] : []),
                      { text: proj.description, fontSize: 10, alignment: 'justify', margin: [0, 0, 0, 15] }
                  ]))
              ] : [])
            ]
          },
          // Side Column (35%)
          {
            width: '35%',
            margin: [20, 0, 0, 0],
            stack: [
              { text: 'EDUCATION', style: 'execSection', margin: [0, 0, 0, 10], color: primaryColor },
              ...(resumeData.education || []).map(edu => ([
                { text: edu.school, fontSize: 10, bold: true },
                { text: edu.degree, fontSize: 10, italics: true },
                { text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 9, bold: true, color: '#555', margin: [0, 0, 0, 10] }
              ])),

              // Skills
              ...(resumeData.skills?.length ? [
                  { text: 'SKILLS', style: 'execSection', margin: [0, 10, 0, 10], color: primaryColor },
                  { 
                      ul: resumeData.skills, 
                      fontSize: 10, 
                      margin: [0, 0, 0, 10] 
                  }
              ] : []),

              // Certifications
              ...(resumeData.certifications?.length ? [
                  { text: 'CERTIFICATIONS', style: 'execSection', margin: [0, 10, 0, 10], color: primaryColor },
                  ...resumeData.certifications.map(cert => ([
                      { 
                          text: [
                              { text: cert.name, fontSize: 10, bold: true },
                              ...(cert.link ? [{ text: ' (Link)', link: cert.link, decoration: 'underline', color: 'blue', fontSize: 9 }] : [])
                          ]
                      },
                      { text: cert.issuer, fontSize: 9, color: '#666', margin: [0, 0, 0, 5] }
                  ]))
              ] : []),

              // Languages
              ...(resumeData.languages?.length ? [
                  { text: 'LANGUAGES', style: 'execSection', margin: [0, 10, 0, 10], color: primaryColor },
                  ...resumeData.languages.map(l => ([
                      { text: l.language, fontSize: 10, bold: true },
                      { text: l.proficiency, fontSize: 9, italics: true, color: '#666', margin: [0, 0, 0, 5] }
                  ]))
              ] : [])
            ]
          }
        ]
      }
    ],
    styles: {
      execHeader: { fontSize: 26, bold: true, alignment: 'center', letterSpacing: 2 },
      execSection: { fontSize: 12, bold: true, letterSpacing: 1, decoration: 'underline' }
    }
  };
};

const getCreativeDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#ec4899';
  const { firstName, lastName, email, phone, address } = resumeData.personalInfo || {};

  return {
    content: [
      {
        canvas: [
             { type: 'rect', x: -40, y: -40, w: 595, h: 140, color: primaryColor }
        ]
      },
      { text: `${firstName}\n${lastName}`, absolutePosition: { x: 40, y: 40 }, color: 'white', fontSize: 36, bold: true, lineHeight: 0.9 },
      { text: `${email} • ${address}`, absolutePosition: { x: 40, y: 110 }, color: 'white', fontSize: 10, opacity: 0.9 },
      {
        columns: [
          {
             width: '60%',
             margin: [0, 120, 0, 0],
             stack: [
               
               // Summary
               ...(resumeData.personalInfo?.summary ? [
                   { text: 'PROFILE', fontSize: 14, bold: true, color: primaryColor, margin: [0, 0, 0, 10] },
                   { text: resumeData.personalInfo.summary, fontSize: 10, margin: [0, 0, 0, 20] }
               ] : []),

               { text: 'EXPERIENCE', fontSize: 14, bold: true, color: primaryColor, margin: [0, 0, 0, 15] },
               ...(resumeData.experience || []).map(exp => ({
                 stack: [
                    { text: exp.title, fontSize: 14, bold: true },
                    { text: `${exp.company} | ${formatDateRange(exp.startDate, exp.endDate, exp.current)}`, fontSize: 10, bold: true, color: '#888', margin: [0, 2, 0, 5] },
                    { text: exp.description, fontSize: 10, margin: [0, 0, 0, 20] }
                 ]
               })),

               // Projects
               ...(resumeData.projects?.length ? [
                   { text: 'PROJECTS', fontSize: 14, bold: true, color: primaryColor, margin: [0, 0, 0, 15] },
                   ...resumeData.projects.map(proj => ({
                       stack: [
                           { text: [
                               { text: proj.title, fontSize: 12, bold: true },
                               ...(proj.link ? [{ text: ' (Link)', link: proj.link, color: 'blue', decoration: 'underline', fontSize: 10 }] : [])
                             ] 
                           },
                           ...(proj.technologies ? [{ text: proj.technologies.join(' / '), fontSize: 9, bold: true, color: '#aaa', margin: [0, 2, 0, 5] }] : []),
                           { text: proj.description, fontSize: 10, margin: [0, 0, 0, 20] }
                       ]
                   }))
               ] : [])
             ]
          },
          {
             width: '40%',
             margin: [40, 120, 0, 0],
             stack: [
               { text: 'EDUCATION', fontSize: 14, bold: true, color: primaryColor, margin: [0, 0, 0, 10] },
               ...(resumeData.education || []).map(edu => ({
                 stack: [
                   { text: edu.school, fontSize: 11, bold: true },
                   { text: edu.degree, fontSize: 10, color: '#555' },
                   { text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 10, bold: true, color: '#aaa', margin: [0, 0, 0, 15] }
                 ]
               })),

               // Skills
               ...(resumeData.skills?.length ? [
                  { text: 'SKILLS', fontSize: 14, bold: true, color: primaryColor, margin: [0, 10, 0, 10] },
                  { text: resumeData.skills.join(', '), fontSize: 10, lineHeight: 1.4, margin: [0, 0, 0, 15] }
               ] : []),

               // Certifications
               ...(resumeData.certifications?.length ? [
                  { text: 'CERTIFICATIONS', fontSize: 14, bold: true, color: primaryColor, margin: [0, 10, 0, 10] },
                  ...resumeData.certifications.map(cert => ({
                      stack: [
                          { 
                              text: [
                                  { text: cert.name, fontSize: 10, bold: true },
                                  ...(cert.link ? [{ text: ' (Link)', link: cert.link, decoration: 'underline', color: 'blue', fontSize: 9 }] : [])
                              ]
                          },
                          { text: cert.issuer, fontSize: 9, color: '#666', margin: [0, 0, 0, 5] }
                      ]
                  }))
               ] : []),

               // Languages
               ...(resumeData.languages?.length ? [
                  { text: 'LANGUAGES', fontSize: 14, bold: true, color: primaryColor, margin: [0, 10, 0, 10] },
                  ...resumeData.languages.map(l => ({
                       columns: [
                           { text: l.language, fontSize: 10, bold: true, width: '*' },
                           { text: l.proficiency, fontSize: 9, color: '#666', width: 'auto' }
                       ],
                       margin: [0, 0, 0, 5]
                  }))
               ] : []),

               { text: 'CONTACT', fontSize: 14, bold: true, color: primaryColor, margin: [0, 20, 0, 10] },
               { text: phone, fontSize: 10 }
             ]
          }
        ]
      }
    ],
    styles: {}
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT FUNCTION - Using proven pattern from working project
// ──────────────────────────────────────────────────────────────────────────────
export const downloadResumePDF = (resumeData: ResumeData, template: string, theme?: ThemeConfig) => {
  try {
    let docDefinition: any;
    
    switch (template) {
      case 'modern':
        docDefinition = getModernDefinition(resumeData, theme);
        break;
      case 'minimalist':
        docDefinition = getMinimalistDefinition(resumeData, theme);
        break;
      case 'executive':
        docDefinition = getExecutiveDefinition(resumeData, theme);
        break;
      case 'creative':
        docDefinition = getCreativeDefinition(resumeData, theme);
        break;
      case 'classic':
      default:
        docDefinition = getClassicDefinition(resumeData, theme);
        break;
    }
   
    // Create filename
    const firstName = resumeData.personalInfo?.firstName?.trim() || 'Resume';
    const lastName = resumeData.personalInfo?.lastName?.trim() || '';
    const filename = lastName
      ? `${firstName}_${lastName}_${template}.pdf`
      : `${firstName}_${template}.pdf`;
   
    // ── Same pattern as working project ──────────────────────────────────────
    const pdfDoc = pdfMake.createPdf(docDefinition);
    
    pdfDoc.getBlob((blob: Blob) => {
      // Create download link
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    });
    // ────────────────────────────────────────────────────────────────────────

  } catch (error) {
    console.error('[PDF Download] Error:', error);
    alert(`PDF Generation failed: ${error}`);
  }
};
