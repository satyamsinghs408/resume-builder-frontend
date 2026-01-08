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

// Export the main function
export const downloadResumePDF = (resumeData: Resume, template: string, theme?: ThemeConfig) => {
  const docDefinition = template === 'modern' ? getModernDefinition(resumeData, theme) : getClassicDefinition(resumeData, theme);
  pdfMake.createPdf(docDefinition).download(`Resume_${template}.pdf`);
};
