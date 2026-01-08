import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Resume, ThemeConfig } from '../types';

// Register fonts
if (pdfFonts && (pdfFonts as any).pdfMake && (pdfFonts as any).pdfMake.vfs) {
  pdfMake.vfs = (pdfFonts as any).pdfMake.vfs;
} else if (pdfFonts && (pdfFonts as any).vfs) {
  pdfMake.vfs = (pdfFonts as any).vfs;
} else {
  pdfMake.vfs = pdfFonts as any;
}


const getClassicDefinition = (resumeData: Resume, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#000000';
  
  return {
    content: [
      { text: `${resumeData.firstName} ${resumeData.lastName}`, style: 'header', color: primaryColor },
      { text: `Email: ${resumeData.email} | Phone: ${resumeData.phone}`, alignment: 'center', margin: [0, 0, 0, 20] },
      
      { text: 'Experience', style: 'sectionHeader', color: primaryColor },
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
      ...resumeData.experience.map(exp => ([
        { text: exp.title, style: 'jobTitle', margin: [0, 10, 0, 0] },
        { text: exp.company, italics: true, margin: [0, 0, 0, 5] },
        { text: exp.description, margin: [0, 0, 0, 10] }
      ])),

      { text: 'Education', style: 'sectionHeader', margin: [0, 20, 0, 5], color: primaryColor },
      { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: primaryColor }] },
      ...resumeData.education.map(edu => ([
        { text: edu.school, style: 'jobTitle', margin: [0, 10, 0, 0] },
        { columns: [{ text: edu.degree, italics: true }, { text: edu.year, alignment: 'right' }], margin: [0, 0, 0, 10] }
      ]))
    ],
    styles: {
      header: { fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
      sectionHeader: { fontSize: 16, bold: true, margin: [0, 15, 0, 5] },
      jobTitle: { fontSize: 14, bold: true }
    }
  };
};

const getModernDefinition = (resumeData: Resume, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#2c3e50';
  const secondaryColor = theme?.secondaryColor || '#ffffff';

  return {
    content: [
      {
        table: {
          widths: ['*'],
          body: [[{ 
            text: `${resumeData.firstName} ${resumeData.lastName}`.toUpperCase(), 
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
              { text: resumeData.email, style: 'smallText' },
              { text: resumeData.phone, style: 'smallText' },
              { text: resumeData.address, style: 'smallText' },
              { text: 'EDUCATION', style: 'modernSubHeader', margin: [0, 20, 0, 5] },
              ...resumeData.education.map(edu => ([
                { text: edu.school, bold: true, fontSize: 10 },
                { text: edu.degree, fontSize: 9 },
                { text: edu.year, fontSize: 9, italics: true, margin: [0, 0, 0, 10] }
              ]))
            ]
          },
          {
            width: '70%', margin: [20, 0, 0, 0],
            stack: [
              { text: 'EXPERIENCE', style: 'modernSubHeader' },
              ...resumeData.experience.map(exp => ([
                { text: exp.title, bold: true, fontSize: 12, color: primaryColor },
                { text: exp.company, italics: true, fontSize: 10 },
                { text: exp.description, fontSize: 10, margin: [0, 5, 0, 15] }
              ]))
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

const getMinimalistDefinition = (resumeData: Resume, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#000000';
  return {
    content: [
      { text: `${resumeData.firstName} ${resumeData.lastName}`.toUpperCase(), style: 'minimalHeader', color: primaryColor },
      { text: `${resumeData.email} | ${resumeData.phone} | ${resumeData.address}`, style: 'minimalSub', margin: [0, 5, 0, 20] },

      { text: 'EXPERIENCE', style: 'minimalSection', color: primaryColor },
      ...resumeData.experience.map(exp => ({
        columns: [
          { text: exp.company, width: '25%', style: 'minimalGray' },
          { 
            width: '75%',
            stack: [
              { text: exp.title, bold: true, fontSize: 11 },
              { text: exp.description, style: 'minimalText' }
            ]
          }
        ],
        margin: [0, 0, 0, 15]
      })),

      { text: 'EDUCATION', style: 'minimalSection', color: primaryColor, margin: [0, 10, 0, 10] },
      ...resumeData.education.map(edu => ({
        columns: [
          { text: edu.year, width: '25%', style: 'minimalGray' },
          { 
             width: '75%',
             stack: [
               { text: edu.school, bold: true, fontSize: 11 },
               { text: edu.degree, style: 'minimalText' }
             ]
          }
        ],
        margin: [0, 0, 0, 10]
      }))
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

const getExecutiveDefinition = (resumeData: Resume, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#1e3a8a';
  return {
    content: [
      { text: `${resumeData.firstName} ${resumeData.lastName}`.toUpperCase(), style: 'execHeader', color: primaryColor },
      { text: `${resumeData.email}  •  ${resumeData.phone}  •  ${resumeData.address}`, alignment: 'center', fontSize: 9, color: '#555', margin: [0, 5, 0, 20] },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: primaryColor }] },
      
      { text: 'PROFESSIONAL EXPERIENCE', style: 'execSection', margin: [0, 20, 0, 10], color: primaryColor },
      ...resumeData.experience.map(exp => ([
        { text: exp.title, fontSize: 12, bold: true },
        { text: exp.company.toUpperCase(), fontSize: 9, bold: true, color: primaryColor, margin: [0, 2, 0, 5] },
        { text: exp.description, fontSize: 10, alignment: 'justify', margin: [0, 0, 0, 15] }
      ])),

      { text: 'EDUCATION', style: 'execSection', margin: [0, 10, 0, 10], color: primaryColor },
      ...resumeData.education.map(edu => ([
        { text: edu.school, fontSize: 11, bold: true },
        { 
          columns: [
            { text: edu.degree, fontSize: 10, italics: true },
            { text: edu.year, fontSize: 10, alignment: 'right', bold: true, color: '#555' }
          ],
          margin: [0, 0, 0, 10]
        }
      ]))
    ],
    styles: {
      execHeader: { fontSize: 26, bold: true, alignment: 'center', letterSpacing: 2 },
      execSection: { fontSize: 12, bold: true, letterSpacing: 1, decoration: 'underline' }
    }
  };
};

const getCreativeDefinition = (resumeData: Resume, theme?: ThemeConfig): any => {
  const primaryColor = theme?.primaryColor || '#ec4899';
  return {
    content: [
      {
        canvas: [
             { type: 'rect', x: -40, y: -40, w: 595, h: 140, color: primaryColor } 
        ]
      },
      { text: `${resumeData.firstName}\n${resumeData.lastName}`, absolutePosition: { x: 40, y: 40 }, color: 'white', fontSize: 36, bold: true, lineHeight: 0.9 },
      { text: `${resumeData.email} • ${resumeData.address}`, absolutePosition: { x: 40, y: 110 }, color: 'white', fontSize: 10, opacity: 0.9 },

      {
        columns: [
          {
             width: '60%',
             margin: [0, 120, 0, 0],
             stack: [
               { text: 'EXPERIENCE', fontSize: 14, bold: true, color: primaryColor, margin: [0, 0, 0, 15] },
               ...resumeData.experience.map(exp => ({
                 stack: [
                    { text: exp.title, fontSize: 14, bold: true },
                    { text: exp.company, fontSize: 10, bold: true, color: '#888', margin: [0, 2, 0, 5] },
                    { text: exp.description, fontSize: 10, margin: [0, 0, 0, 20] }
                 ]
               }))
             ]
          },
          {
             width: '40%',
             margin: [40, 120, 0, 0],
             stack: [
               { text: 'EDUCATION', fontSize: 14, bold: true, color: primaryColor, margin: [0, 0, 0, 10] },
               ...resumeData.education.map(edu => ({
                 stack: [
                   { text: edu.school, fontSize: 11, bold: true },
                   { text: edu.degree, fontSize: 10, color: '#555' },
                   { text: edu.year, fontSize: 10, bold: true, color: '#aaa', margin: [0, 0, 0, 15] }
                 ]
               })),
               { text: 'CONTACT', fontSize: 14, bold: true, color: primaryColor, margin: [0, 20, 0, 10] },
               { text: resumeData.phone, fontSize: 10 }
             ]
          }
        ]
      }
    ],
    styles: {}
  };
};

// Export the main function
export const downloadResumePDF = (resumeData: Resume, template: string, theme?: ThemeConfig) => {
  let docDefinition;
  switch (template) {
    case 'modern': docDefinition = getModernDefinition(resumeData, theme); break;
    case 'minimalist': docDefinition = getMinimalistDefinition(resumeData, theme); break;
    case 'executive': docDefinition = getExecutiveDefinition(resumeData, theme); break;
    case 'creative': docDefinition = getCreativeDefinition(resumeData, theme); break;
    case 'classic': 
    default:
        docDefinition = getClassicDefinition(resumeData, theme); break;
  }
  
  pdfMake.createPdf(docDefinition).download(`Resume_${template}.pdf`);
};
