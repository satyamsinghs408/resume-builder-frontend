import pdfMake from "pdfmake/build/pdfmake";
import { vfs } from "pdfmake/build/vfs_fonts";
import { ResumeData, ThemeConfig } from '../types';

// Register fonts
pdfMake.vfs = vfs;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// SHARED UTILITIES
// ──────────────────────────────────────────────────────────────────────────────

const formatDateRange = (startDate: string, endDate: string, current: boolean): string => {
  const format = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const start = format(startDate);
  if (!start) return '';
  if (current) return `${start} - Present`;
  const end = format(endDate || '');
  if (!end) return start;
  return `${start} - ${end}`;
};

/** Builds a "email • phone • address" text array with bullet separators */
const buildContactLine = (parts: string[], separator = ' • '): string => {
  return parts.filter(Boolean).join(separator);
};

/** Builds clickable social links text array for pdfmake */
const buildSocialLinks = (socialLinks?: { linkedin?: string; github?: string; portfolio?: string }) => {
  if (!socialLinks) return [];
  const links: any[] = [];
  if (socialLinks.linkedin) {
    if (links.length > 0) links.push(' | ');
    links.push({ text: 'LinkedIn', link: socialLinks.linkedin, decoration: 'underline', color: '#2563eb', fontSize: 9 });
  }
  if (socialLinks.github) {
    if (links.length > 0) links.push(' | ');
    links.push({ text: 'GitHub', link: socialLinks.github, decoration: 'underline', color: '#2563eb', fontSize: 9 });
  }
  if (socialLinks.portfolio) {
    if (links.length > 0) links.push(' | ');
    links.push({ text: 'Portfolio', link: socialLinks.portfolio, decoration: 'underline', color: '#2563eb', fontSize: 9 });
  }
  return links;
};

/** Lightens a hex color by mixing it with white at a given ratio (0-1) */
const lightenColor = (hex: string, amount = 0.7): string => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const nr = Math.round(r + (255 - r) * amount);
  const ng = Math.round(g + (255 - g) * amount);
  const nb = Math.round(b + (255 - b) * amount);
  return '#' + [nr, ng, nb].map(c => c.toString(16).padStart(2, '0')).join('');
};

/** Creates a thin horizontal line */
const thinLine = (color: string, width = 515, lineWidth = 0.5): any => ({
  canvas: [{ type: 'line', x1: 0, y1: 0, x2: width, y2: 0, lineWidth, lineColor: color }],
  margin: [0, 0, 0, 0]
});

// ──────────────────────────────────────────────────────────────────────────────
// 1. CLASSIC TEMPLATE
// Matches: font-serif, centered header, bordered sections, side-by-side exp
// ──────────────────────────────────────────────────────────────────────────────

const getClassicDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const pc = theme?.primaryColor || '#1f2937';
  const pcLight = lightenColor(pc, 0.75); // Light version of primary for subtle lines
  const { firstName, lastName, email, phone, address, summary, socialLinks } = resumeData.personalInfo || {};

  const contactParts = buildContactLine([email || '', phone || '', address || '']);
  const socialLinksArr = buildSocialLinks(socialLinks);

  return {
    content: [
      // ── Header ──
      {
        text: `${firstName || ''} ${lastName || ''}`.trim().toUpperCase(),
        fontSize: 24, bold: true, alignment: 'center', color: pc,
        characterSpacing: 3, margin: [0, 0, 0, 8]
      },
      contactParts ? { text: contactParts, fontSize: 9, alignment: 'center', color: '#4b5563', margin: [0, 0, 0, 4] } : null,
      socialLinksArr.length > 0 ? { text: socialLinksArr, alignment: 'center', margin: [0, 0, 0, 0] } : null,
      thinLine(pc, 515, 1.5),
      { text: '', margin: [0, 0, 0, 12] },

      // ── Professional Summary ──
      ...(summary ? [
        { text: 'PROFESSIONAL SUMMARY', fontSize: 12, bold: true, color: pc, characterSpacing: 1, margin: [0, 0, 0, 4] },
        thinLine(pcLight),
        { text: summary, fontSize: 9.5, color: '#374151', lineHeight: 1.4, margin: [0, 6, 0, 12] }
      ] : []),

      // ── Professional Experience ──
      ...(resumeData.experience?.length ? [
        { text: 'PROFESSIONAL EXPERIENCE', fontSize: 12, bold: true, color: pc, characterSpacing: 1, margin: [0, 4, 0, 4] },
        thinLine(pcLight),
        ...resumeData.experience.map(exp => ([
          {
            columns: [
              { text: exp.title || '', fontSize: 12, bold: true, color: pc, width: '*' },
              { text: exp.company || '', fontSize: 10, italics: true, color: '#4b5563', width: 'auto', alignment: 'right' }
            ],
            margin: [0, 8, 0, 0]
          },
          { text: formatDateRange(exp.startDate, exp.endDate, exp.current), fontSize: 8.5, color: '#6b7280', margin: [0, 2, 0, 4] },
          { text: exp.description || '', fontSize: 9.5, color: '#374151', lineHeight: 1.4, margin: [0, 0, 0, 8] }
        ]))
      ] : []),

      // ── Education ──
      ...(resumeData.education?.length ? [
        { text: 'EDUCATION', fontSize: 12, bold: true, color: pc, characterSpacing: 1, margin: [0, 8, 0, 4] },
        thinLine(pcLight),
        ...resumeData.education.map(edu => ({
          columns: [
            {
              width: '*',
              stack: [
                { text: edu.school || '', fontSize: 11, bold: true, color: pc },
                { text: edu.degree || '', fontSize: 9.5, italics: true, color: '#4b5563' }
              ]
            },
            { text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 9, bold: true, color: '#4b5563', width: 'auto', alignment: 'right' }
          ],
          margin: [0, 6, 0, 4]
        }))
      ] : []),

      // ── Skills ──
      ...(resumeData.skills?.length ? [
        { text: 'SKILLS', fontSize: 12, bold: true, color: pc, characterSpacing: 1, margin: [0, 10, 0, 4] },
        thinLine(pcLight),
        { text: resumeData.skills.join('  •  '), fontSize: 9.5, color: '#374151', lineHeight: 1.5, margin: [0, 6, 0, 4] }
      ] : []),

      // ── Projects ──
      ...(resumeData.projects?.length ? [
        { text: 'PROJECTS', fontSize: 12, bold: true, color: pc, characterSpacing: 1, margin: [0, 10, 0, 4] },
        thinLine(pcLight),
        ...resumeData.projects.map(proj => ([
          {
            text: [
              { text: proj.title || '', bold: true, fontSize: 11, color: '#1f2937' },
              ...(proj.link ? [{ text: '  ↗ Link', link: proj.link, color: '#2563eb', decoration: 'underline', fontSize: 9 }] : [])
            ],
            margin: [0, 8, 0, 2]
          },
          ...(proj.technologies?.length ? [{ text: proj.technologies.join(' • '), fontSize: 8.5, bold: true, color: '#2563eb', margin: [0, 0, 0, 4] }] : []),
          { text: proj.description || '', fontSize: 9.5, color: '#374151', lineHeight: 1.4, margin: [0, 0, 0, 6] }
        ]))
      ] : []),

      // ── Certifications & Languages (side by side) ──
      ...((resumeData.certifications?.length || resumeData.languages?.length) ? [
        {
          columns: [
            ...(resumeData.certifications?.length ? [{
              width: '50%',
              stack: [
                { text: 'CERTIFICATIONS', fontSize: 12, bold: true, color: pc, characterSpacing: 1, margin: [0, 10, 0, 4] },
                thinLine(pcLight, 240),
                ...resumeData.certifications.map(cert => ({
                  stack: [
                    {
                      text: [
                        { text: cert.name || '', bold: true, fontSize: 9.5 },
                        ...(cert.link ? [{ text: ' [View]', link: cert.link, color: '#2563eb', decoration: 'underline', fontSize: 8 }] : [])
                      ]
                    },
                    { text: `${cert.issuer || 'Issuer'} • ${cert.date || 'Date'}`, fontSize: 8, color: '#6b7280' }
                  ],
                  margin: [0, 6, 0, 0]
                }))
              ]
            }] : []),
            ...(resumeData.languages?.length ? [{
              width: '50%',
              stack: [
                { text: 'LANGUAGES', fontSize: 12, bold: true, color: pc, characterSpacing: 1, margin: [0, 10, 0, 4] },
                thinLine(pcLight, 240),
                ...resumeData.languages.map(l => ({
                  columns: [
                    { text: l.language || '', fontSize: 9.5, bold: true, color: '#374151', width: '*' },
                    { text: l.proficiency || '', fontSize: 8, color: '#6b7280', width: 'auto', characterSpacing: 1 }
                  ],
                  margin: [0, 6, 0, 0]
                }))
              ]
            }] : [])
          ]
        }
      ] : [])
    ].filter(Boolean),
    defaultStyle: { font: 'Roboto' },
    pageMargins: [40, 40, 40, 40] as [number, number, number, number]
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// 2. MODERN TEMPLATE
// Matches: sidebar layout (1/3 colored + 2/3 white), split name, timeline
// ──────────────────────────────────────────────────────────────────────────────

const getModernDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const pc = theme?.primaryColor || '#2c3e50';
  const { firstName, lastName, email, phone, address, summary, socialLinks } = resumeData.personalInfo || {};

  // Build sidebar content stack
  const sidebarStack: any[] = [
    // Contact Section
    { text: 'Contact', fontSize: 14, bold: true, color: 'white', margin: [0, 0, 0, 8] },
    thinLine('#ffffff', 150, 0.3),
    ...(email ? [{ text: email || '', fontSize: 8.5, color: '#e5e7eb', margin: [0, 6, 0, 2] }] : []),
    ...(phone ? [{ text: phone || '', fontSize: 8.5, color: '#e5e7eb', margin: [0, 0, 0, 2] }] : []),
    ...(address ? [{ text: address || '', fontSize: 8.5, color: '#e5e7eb', margin: [0, 0, 0, 2] }] : []),
  ];

  // Social links in sidebar
  if (socialLinks?.linkedin) sidebarStack.push({ text: 'LinkedIn', link: socialLinks.linkedin, fontSize: 8.5, color: '#d1d5db', decoration: 'underline', margin: [0, 4, 0, 0] });
  if (socialLinks?.github) sidebarStack.push({ text: 'GitHub', link: socialLinks.github, fontSize: 8.5, color: '#d1d5db', decoration: 'underline', margin: [0, 2, 0, 0] });
  if (socialLinks?.portfolio) sidebarStack.push({ text: 'Portfolio', link: socialLinks.portfolio, fontSize: 8.5, color: '#d1d5db', decoration: 'underline', margin: [0, 2, 0, 0] });

  // Skills in sidebar
  if (resumeData.skills?.length) {
    sidebarStack.push({ text: '', margin: [0, 12, 0, 0] });
    sidebarStack.push({ text: 'Skills', fontSize: 14, bold: true, color: 'white', margin: [0, 0, 0, 8] });
    sidebarStack.push(thinLine('#ffffff', 150, 0.3));
    sidebarStack.push({ text: resumeData.skills.join('  •  '), fontSize: 8.5, color: '#e5e7eb', lineHeight: 1.5, margin: [0, 6, 0, 0] });
  }

  // Languages in sidebar
  if (resumeData.languages?.length) {
    sidebarStack.push({ text: '', margin: [0, 12, 0, 0] });
    sidebarStack.push({ text: 'Languages', fontSize: 14, bold: true, color: 'white', margin: [0, 0, 0, 8] });
    sidebarStack.push(thinLine('#ffffff', 150, 0.3));
    resumeData.languages.forEach(l => {
      sidebarStack.push({
        columns: [
          { text: l.language, fontSize: 9, bold: true, color: 'white', width: '*' },
          { text: l.proficiency, fontSize: 8, color: '#d1d5db', width: 'auto' }
        ],
        margin: [0, 4, 0, 0]
      });
    });
  }

  // Education in sidebar
  sidebarStack.push({ text: '', margin: [0, 12, 0, 0] });
  sidebarStack.push({ text: 'Education', fontSize: 14, bold: true, color: 'white', margin: [0, 0, 0, 8] });
  sidebarStack.push(thinLine('#ffffff', 150, 0.3));
  (resumeData.education || []).forEach(edu => {
    sidebarStack.push({ text: edu.degree || '', fontSize: 9.5, bold: true, color: 'white', margin: [0, 6, 0, 0] });
    sidebarStack.push({ text: edu.school || '', fontSize: 8.5, color: '#d1d5db' });
    sidebarStack.push({ text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 8, italics: true, color: '#d1d5db', margin: [0, 2, 0, 4] });
  });

  // Build main content stack
  const mainStack: any[] = [];

  // Name in main area
  mainStack.push({ text: (firstName || '').toUpperCase(), fontSize: 28, bold: true, color: '#1f2937', margin: [0, 0, 0, 0] });
  mainStack.push({ text: (lastName || '').toUpperCase(), fontSize: 28, bold: true, color: pc, margin: [0, 0, 0, 16] });

  // Summary
  if (summary) {
    mainStack.push({ text: summary, fontSize: 9.5, color: '#374151', lineHeight: 1.4, margin: [0, 0, 0, 16] });
  }

  // Experience with timeline dots
  if (resumeData.experience?.length) {
    mainStack.push({ text: 'Experience', fontSize: 16, bold: true, color: '#1f2937', margin: [0, 0, 0, 4] });
    mainStack.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 80, y2: 0, lineWidth: 3, lineColor: pc }], margin: [0, 0, 0, 12] });

    resumeData.experience.forEach(exp => {
      mainStack.push({
        columns: [
          { text: '●', fontSize: 8, color: pc, width: 14 },
          {
            width: '*',
            stack: [
              { text: exp.title || '', fontSize: 13, bold: true, color: '#1f2937' },
              {
                columns: [
                  { text: exp.company || '', fontSize: 9.5, bold: true, color: pc, width: '*' },
                  { text: formatDateRange(exp.startDate, exp.endDate, exp.current), fontSize: 8.5, color: '#6b7280', width: 'auto' }
                ],
                margin: [0, 2, 0, 4]
              },
              { text: exp.description || '', fontSize: 9, color: '#4b5563', lineHeight: 1.4 }
            ]
          }
        ],
        margin: [0, 0, 0, 12]
      });
    });
  }

  // Projects with timeline dots
  if (resumeData.projects?.length) {
    mainStack.push({ text: 'Projects', fontSize: 16, bold: true, color: '#1f2937', margin: [0, 8, 0, 4] });
    mainStack.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 80, y2: 0, lineWidth: 3, lineColor: pc }], margin: [0, 0, 0, 12] });

    resumeData.projects.forEach(proj => {
      mainStack.push({
        columns: [
          { text: '●', fontSize: 8, color: pc, width: 14 },
          {
            width: '*',
            stack: [
              {
                text: [
                  { text: proj.title || '', fontSize: 12, bold: true, color: '#1f2937' },
                  ...(proj.link ? [{ text: '  Link', link: proj.link, color: '#3b82f6', decoration: 'underline', fontSize: 9 }] : [])
                ]
              },
              ...(proj.technologies?.length ? [{ text: proj.technologies.join(' • '), fontSize: 8, bold: true, color: '#6b7280', margin: [0, 2, 0, 4] }] : []),
              { text: proj.description || '', fontSize: 9, color: '#4b5563', lineHeight: 1.4 }
            ]
          }
        ],
        margin: [0, 0, 0, 10]
      });
    });
  }

  // Certifications
  if (resumeData.certifications?.length) {
    mainStack.push({ text: 'Certifications', fontSize: 16, bold: true, color: '#1f2937', margin: [0, 8, 0, 4] });
    mainStack.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: 80, y2: 0, lineWidth: 3, lineColor: pc }], margin: [0, 0, 0, 12] });

    resumeData.certifications.forEach(cert => {
      mainStack.push({
        table: {
          widths: ['*', 'auto'],
          body: [[
            {
              stack: [
                {
                  text: [
                    { text: cert.name || '', bold: true, fontSize: 10, color: '#1f2937' },
                    ...(cert.link ? [{ text: '  View', link: cert.link, color: '#3b82f6', decoration: 'underline', fontSize: 8 }] : [])
                  ]
                },
                { text: cert.issuer || '', fontSize: 8.5, color: '#6b7280' }
              ],
              fillColor: '#f9fafb', margin: [6, 6, 6, 6]
            },
            { text: cert.date || '', fontSize: 8.5, bold: true, color: pc, fillColor: '#f9fafb', margin: [6, 8, 6, 6] }
          ]]
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 4]
      });
    });
  }

  return {
    content: [
      {
        columns: [
          {
            width: '30%',
            stack: sidebarStack,
            fillColor: pc,
          },
          {
            width: '70%',
            stack: mainStack,
            margin: [20, 0, 0, 0]
          }
        ],
        columnGap: 0
      }
    ],
    background: (currentPage: number) => {
      if (currentPage === 1) {
        return {
          canvas: [{
            type: 'rect', x: 0, y: 0, w: 170, h: 842, color: pc
          }]
        };
      }
      return null;
    },
    defaultStyle: { font: 'Roboto' },
    pageMargins: [20, 30, 30, 30] as [number, number, number, number]
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// 3. MINIMALIST TEMPLATE
// Matches: left-aligned, airy, tiny section headers, 25/75 grid
// ──────────────────────────────────────────────────────────────────────────────

const getMinimalistDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const pc = theme?.primaryColor || '#000000';
  const { firstName, lastName, email, phone, address, summary } = resumeData.personalInfo || {};

  return {
    content: [
      // ── Header: left aligned, light first name + bold last name ──
      {
        text: [
          { text: `${firstName || ''} `, fontSize: 26, bold: false, color: pc },
          { text: lastName || '', fontSize: 26, bold: true, color: pc }
        ],
        margin: [0, 0, 0, 6]
      },
      { text: buildContactLine([email || '', phone || '', address || ''], '    '), fontSize: 9, color: '#6b7280', margin: [0, 0, 0, 16] },

      // ── Summary ──
      ...(summary ? [
        { text: summary, fontSize: 9.5, color: '#4b5563', lineHeight: 1.4, margin: [0, 0, 0, 16] }
      ] : []),

      // ── Skills: horizontal list ──
      ...(resumeData.skills?.length ? [
        { text: resumeData.skills.join('  •  '), fontSize: 9.5, color: '#4b5563', bold: true, margin: [0, 0, 0, 16] }
      ] : []),

      // ── Experience ──
      ...(resumeData.experience?.length ? [
        { text: 'EXPERIENCE', fontSize: 8.5, bold: true, color: '#6b7280', characterSpacing: 3, margin: [0, 0, 0, 12] },
        ...resumeData.experience.map(exp => ({
          columns: [
            {
              width: '25%',
              stack: [
                { text: exp.company || '', fontSize: 9.5, bold: true, color: '#1f2937' },
                { text: formatDateRange(exp.startDate, exp.endDate, exp.current), fontSize: 8.5, color: '#6b7280' }
              ]
            },
            {
              width: '75%',
              stack: [
                { text: exp.title || '', fontSize: 12, bold: true, color: '#1f2937', margin: [0, 0, 0, 2] },
                { text: exp.description || '', fontSize: 9.5, color: '#4b5563', lineHeight: 1.4 }
              ]
            }
          ],
          columnGap: 16,
          margin: [0, 0, 0, 14]
        }))
      ] : []),

      // ── Projects ──
      ...(resumeData.projects?.length ? [
        { text: 'PROJECTS', fontSize: 8.5, bold: true, color: '#6b7280', characterSpacing: 3, margin: [0, 6, 0, 12] },
        ...resumeData.projects.map(proj => ({
          columns: [
            {
              width: '25%',
              stack: [
                ...(proj.technologies?.length ? [{ text: proj.technologies.slice(0, 3).join(', '), fontSize: 8.5, color: '#6b7280' }] : []),
                ...(proj.link ? [{ text: 'View Project', link: proj.link, fontSize: 8.5, color: '#3b82f6', decoration: 'underline', margin: [0, 2, 0, 0] }] : [])
              ]
            },
            {
              width: '75%',
              stack: [
                { text: proj.title || '', fontSize: 12, bold: true, color: '#1f2937', margin: [0, 0, 0, 2] },
                { text: proj.description || '', fontSize: 9.5, color: '#4b5563', lineHeight: 1.4 }
              ]
            }
          ],
          columnGap: 16,
          margin: [0, 0, 0, 14]
        }))
      ] : []),

      // ── Education ──
      ...(resumeData.education?.length ? [
        { text: 'EDUCATION', fontSize: 8.5, bold: true, color: '#6b7280', characterSpacing: 3, margin: [0, 6, 0, 12] },
        ...resumeData.education.map(edu => ({
          columns: [
            {
              width: '25%',
              stack: [
                { text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 8.5, color: '#6b7280', bold: true }
              ]
            },
            {
              width: '75%',
              stack: [
                { text: edu.school || '', fontSize: 11, bold: true, color: '#1f2937' },
                { text: edu.degree || '', fontSize: 9.5, color: '#4b5563' }
              ]
            }
          ],
          columnGap: 16,
          margin: [0, 0, 0, 8]
        }))
      ] : []),

      // ── Certifications & Languages (side by side) ──
      ...((resumeData.certifications?.length || resumeData.languages?.length) ? [
        {
          columns: [
            ...(resumeData.certifications?.length ? [{
              width: '50%',
              stack: [
                { text: 'CERTIFICATIONS', fontSize: 8.5, bold: true, color: '#6b7280', characterSpacing: 3, margin: [0, 6, 0, 8] },
                ...resumeData.certifications.map(cert => ({
                  text: [
                    { text: cert.name || '', bold: true, fontSize: 9.5 },
                    ...(cert.link ? [{ text: ' [Link]', link: cert.link, color: '#3b82f6', decoration: 'underline', fontSize: 8 }] : []),
                    { text: ` | ${cert.issuer || ''}`, color: '#6b7280', fontSize: 9 }
                  ],
                  margin: [0, 0, 0, 4]
                }))
              ]
            }] : []),
            ...(resumeData.languages?.length ? [{
              width: '50%',
              stack: [
                { text: 'LANGUAGES', fontSize: 8.5, bold: true, color: '#6b7280', characterSpacing: 3, margin: [0, 6, 0, 8] },
                ...resumeData.languages.map(l => ({
                  text: [
                    { text: l.language || '', bold: true, fontSize: 9.5 },
                    { text: ` - ${l.proficiency || ''}`, color: '#6b7280', fontSize: 9 }
                  ],
                  margin: [0, 0, 0, 4]
                }))
              ]
            }] : [])
          ]
        }
      ] : [])
    ],
    defaultStyle: { font: 'Roboto' },
    pageMargins: [40, 40, 40, 40] as [number, number, number, number]
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// 4. EXECUTIVE TEMPLATE
// Matches: top border bar, centered header, summary in quotes, 2/3+1/3 layout
// ──────────────────────────────────────────────────────────────────────────────

const getExecutiveDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const pc = theme?.primaryColor || '#1e3a8a';
  const { firstName, lastName, email, phone, address, summary, socialLinks } = resumeData.personalInfo || {};

  const contactParts: string[] = [email || '', phone || '', address || ''];
  if (socialLinks?.linkedin) contactParts.push('LinkedIn');
  if (socialLinks?.portfolio) contactParts.push('Portfolio');

  // Section header with lines on both sides
  const sectionHeader = (title: string): any => ({
    columns: [
      { canvas: [{ type: 'line', x1: 0, y1: 6, x2: 100, y2: 6, lineWidth: 0.5, lineColor: '#d1d5db' }], width: '*' },
      { text: title, fontSize: 11, bold: true, color: '#374151', characterSpacing: 2, width: 'auto', alignment: 'center', margin: [8, 0, 8, 0] },
      { canvas: [{ type: 'line', x1: 0, y1: 6, x2: 100, y2: 6, lineWidth: 0.5, lineColor: '#d1d5db' }], width: '*' }
    ],
    margin: [0, 4, 0, 10]
  });

  // Build side column stack
  const sideStack: any[] = [];

  // Education
  sideStack.push({ text: 'EDUCATION', fontSize: 9, bold: true, color: '#374151', characterSpacing: 2, margin: [0, 0, 0, 4] });
  sideStack.push(thinLine('#d1d5db', 165, 0.5));
  (resumeData.education || []).forEach(edu => {
    sideStack.push({ text: edu.school || '', fontSize: 9.5, bold: true, color: '#111827', margin: [0, 6, 0, 0] });
    sideStack.push({ text: edu.degree || '', fontSize: 9, italics: true, color: '#4b5563' });
    sideStack.push({ text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 8, bold: true, color: '#6b7280', margin: [0, 2, 0, 6] });
  });

  // Skills
  if (resumeData.skills?.length) {
    sideStack.push({ text: '', margin: [0, 8, 0, 0] });
    sideStack.push({ text: 'SKILLS', fontSize: 9, bold: true, color: '#374151', characterSpacing: 2, margin: [0, 0, 0, 4] });
    sideStack.push(thinLine('#d1d5db', 165, 0.5));
    sideStack.push({
      ul: resumeData.skills.map(s => ({ text: s, fontSize: 9, color: '#374151' })),
      margin: [0, 6, 0, 0]
    });
  }

  // Languages
  if (resumeData.languages?.length) {
    sideStack.push({ text: '', margin: [0, 8, 0, 0] });
    sideStack.push({ text: 'LANGUAGES', fontSize: 9, bold: true, color: '#374151', characterSpacing: 2, margin: [0, 0, 0, 4] });
    sideStack.push(thinLine('#d1d5db', 165, 0.5));
    resumeData.languages.forEach(l => {
      sideStack.push({ text: l.language || '', fontSize: 9.5, bold: true, color: '#1f2937', margin: [0, 6, 0, 0] });
      sideStack.push({ text: l.proficiency || '', fontSize: 8, italics: true, color: '#4b5563' });
    });
  }

  // Certifications
  if (resumeData.certifications?.length) {
    sideStack.push({ text: '', margin: [0, 8, 0, 0] });
    sideStack.push({ text: 'CERTIFICATIONS', fontSize: 9, bold: true, color: '#374151', characterSpacing: 2, margin: [0, 0, 0, 4] });
    sideStack.push(thinLine('#d1d5db', 165, 0.5));
    resumeData.certifications.forEach(cert => {
      sideStack.push({
        text: [
          { text: cert.name || '', fontSize: 9.5, bold: true, color: '#1f2937' },
          ...(cert.link ? [{ text: '\nView Credential', link: cert.link, color: '#2563eb', decoration: 'underline', fontSize: 8 }] : [])
        ],
        margin: [0, 6, 0, 0]
      });
      sideStack.push({ text: cert.issuer || '', fontSize: 8, color: '#6b7280' });
    });
  }

  return {
    content: [
      // ── Top colored border bar ──
      {
        absolutePosition: { x: 0, y: 0 },
        canvas: [{ type: 'rect', x: 0, y: 0, w: 596, h: 8, color: pc }]
      },

      // ── Centered Header ──
      { text: `${firstName || ''} ${lastName || ''}`.trim().toUpperCase(), fontSize: 22, bold: true, alignment: 'center', color: pc, characterSpacing: 2, margin: [0, 16, 0, 6] },
      { text: buildContactLine(contactParts.filter(Boolean), '  •  '), fontSize: 9, alignment: 'center', color: '#4b5563', bold: true, margin: [0, 0, 0, 6] },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: pc }], margin: [0, 0, 0, 8] },

      // ── Summary ──
      ...(summary ? [
        { text: `"${summary}"`, fontSize: 9.5, italics: true, alignment: 'center', color: '#4b5563', margin: [30, 8, 30, 12] }
      ] : []),

      // ── Two Column Layout ──
      {
        columns: [
          // Main Column (65%)
          {
            width: '65%',
            stack: [
              // Experience
              ...(resumeData.experience?.length ? [
                sectionHeader('PROFESSIONAL EXPERIENCE'),
                ...resumeData.experience.map(exp => ({
                  stack: [
                    {
                      columns: [
                        { text: exp.title || '', fontSize: 12, bold: true, color: '#111827', width: '*' },
                        { text: formatDateRange(exp.startDate, exp.endDate, exp.current), fontSize: 8, bold: true, color: '#6b7280', width: 'auto' }
                      ]
                    },
                    { text: (exp.company || '').toUpperCase(), fontSize: 8.5, bold: true, color: pc, characterSpacing: 1, margin: [0, 2, 0, 4] },
                    { text: exp.description || '', fontSize: 9.5, color: '#374151', lineHeight: 1.4, alignment: 'justify' }
                  ],
                  margin: [8, 0, 0, 12]
                }))
              ] : []),

              // Projects
              ...(resumeData.projects?.length ? [
                sectionHeader('PROJECTS'),
                ...resumeData.projects.map(proj => ({
                  stack: [
                    {
                      text: [
                        { text: proj.title || '', fontSize: 12, bold: true, color: '#111827' },
                        ...(proj.link ? [{ text: '  View Project', link: proj.link, color: '#1e40af', decoration: 'underline', fontSize: 8.5, bold: true }] : [])
                      ]
                    },
                    ...(proj.technologies?.length ? [{ text: proj.technologies.join(' • '), fontSize: 8, bold: true, color: '#6b7280', characterSpacing: 0.5, margin: [0, 2, 0, 4] }] : []),
                    { text: proj.description || '', fontSize: 9.5, color: '#374151', lineHeight: 1.4, alignment: 'justify' }
                  ],
                  margin: [8, 0, 0, 12]
                }))
              ] : [])
            ]
          },
          // Side Column (35%)
          {
            width: '35%',
            margin: [16, 0, 0, 0],
            stack: sideStack
          }
        ]
      }
    ],
    defaultStyle: { font: 'Roboto' },
    pageMargins: [40, 30, 40, 30] as [number, number, number, number]
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// 5. CREATIVE TEMPLATE
// Matches: colored header block, two columns, timeline, project cards
// ──────────────────────────────────────────────────────────────────────────────

const getCreativeDefinition = (resumeData: ResumeData, theme?: ThemeConfig): any => {
  const pc = theme?.primaryColor || '#ec4899';
  const { firstName, lastName, email, phone, address, summary, socialLinks } = resumeData.personalInfo || {};

  // Build right column stack
  const rightStack: any[] = [];

  // Education card
  rightStack.push({
    table: {
      widths: ['*'],
      body: [[{
        stack: [
          { text: 'Education', fontSize: 14, bold: true, color: pc, margin: [0, 0, 0, 8] },
          ...(resumeData.education || []).map((edu, i, arr) => ({
            stack: [
              { text: edu.school || '', fontSize: 10.5, bold: true, color: '#1f2937' },
              { text: edu.degree || '', fontSize: 9.5, color: '#6b7280' },
              { text: formatDateRange(edu.startDate, edu.endDate, edu.current), fontSize: 8.5, bold: true, color: '#6b7280', margin: [0, 2, 0, i < arr.length - 1 ? 8 : 0] }
            ]
          }))
        ],
        fillColor: '#f9fafb', margin: [12, 12, 12, 12]
      }]]
    },
    layout: 'noBorders',
    margin: [0, 0, 0, 12]
  });

  // Skills
  if (resumeData.skills?.length) {
    rightStack.push({ text: 'Skills', fontSize: 14, bold: true, color: pc, margin: [0, 4, 0, 8] });
    rightStack.push({ text: resumeData.skills.join(',  '), fontSize: 9.5, color: '#4b5563', lineHeight: 1.5, margin: [0, 0, 0, 12] });
  }

  // Certifications
  if (resumeData.certifications?.length) {
    rightStack.push({ text: 'Certifications', fontSize: 14, bold: true, color: pc, margin: [0, 4, 0, 8] });
    resumeData.certifications.forEach(cert => {
      rightStack.push({
        text: [
          { text: cert.name || '', bold: true, fontSize: 10, color: '#1f2937' },
          ...(cert.link ? [{ text: ' (Link)', link: cert.link, color: '#3b82f6', decoration: 'underline', fontSize: 8.5 }] : [])
        ],
        margin: [0, 0, 0, 2]
      });
      rightStack.push({ text: cert.issuer || '', fontSize: 8.5, bold: true, color: '#6b7280', margin: [0, 0, 0, 6] });
    });
  }

  // Languages
  if (resumeData.languages?.length) {
    rightStack.push({ text: '', margin: [0, 4, 0, 0] });
    rightStack.push({ text: 'Languages', fontSize: 14, bold: true, color: pc, margin: [0, 0, 0, 8] });
    resumeData.languages.forEach(l => {
      rightStack.push({
        columns: [
          { text: l.language || '', fontSize: 9.5, bold: true, color: '#374151', width: '*' },
          { text: l.proficiency || '', fontSize: 8.5, color: '#6b7280', width: 'auto' }
        ],
        margin: [0, 0, 0, 4]
      });
    });
  }

  // Contact card (colored)
  rightStack.push({ text: '', margin: [0, 8, 0, 0] });
  rightStack.push({
    table: {
      widths: ['*'],
      body: [[{
        stack: [
          { text: 'Contact', fontSize: 14, bold: true, color: 'white', margin: [0, 0, 0, 6] },
          ...(phone ? [{ text: phone, fontSize: 9.5, color: 'white' }] : []),
          ...((socialLinks?.linkedin || socialLinks?.portfolio || socialLinks?.github) ? [
            { text: '', margin: [0, 6, 0, 0] },
            ...(socialLinks?.linkedin ? [{ text: 'LinkedIn', link: socialLinks.linkedin, fontSize: 8.5, bold: true, color: 'white', decoration: 'underline' }] : []),
            ...(socialLinks?.portfolio ? [{ text: 'Portfolio', link: socialLinks.portfolio, fontSize: 8.5, bold: true, color: 'white', decoration: 'underline', margin: [0, 2, 0, 0] }] : []),
            ...(socialLinks?.github ? [{ text: 'GitHub', link: socialLinks.github, fontSize: 8.5, bold: true, color: 'white', decoration: 'underline', margin: [0, 2, 0, 0] }] : [])
          ] : [])
        ],
        fillColor: pc, margin: [12, 12, 12, 12]
      }]]
    },
    layout: 'noBorders'
  });

  return {
    content: [
      {
        table: {
          widths: ['*'],
          body: [[{
            stack: [
              { text: `${firstName || ''}\n${lastName || ''}`, fontSize: 30, bold: true, color: 'white', lineHeight: 0.95, margin: [0, 0, 0, 8] },
              { text: buildContactLine([email || '', address || '']), fontSize: 9.5, color: 'white' }
            ],
            fillColor: pc, margin: [20, 20, 20, 20]
          }]]
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 0]
      },

      // ── Two Column Content ──
      {
        columns: [
          // Left Column (60%)
          {
            width: '58%',
            stack: [
              // Summary
              ...(summary ? [
                {
                  text: [
                    { text: '— ', fontSize: 14, bold: true, color: pc },
                    { text: 'Profile', fontSize: 14, bold: true }
                  ],
                  margin: [0, 0, 0, 8]
                },
                { text: summary, fontSize: 9.5, color: '#4b5563', lineHeight: 1.4, margin: [0, 0, 0, 16] }
              ] : []),

              // Experience
              ...(resumeData.experience?.length ? [
                {
                  text: [
                    { text: '— ', fontSize: 14, bold: true, color: pc },
                    { text: 'Experience', fontSize: 14, bold: true }
                  ],
                  margin: [0, 0, 0, 10]
                },
                ...resumeData.experience.map(exp => ({
                  stack: [
                    { text: '●', fontSize: 7, color: pc, margin: [0, 0, 0, 2] },
                    { text: exp.title || '', fontSize: 13, bold: true, color: '#1f2937' },
                    { text: exp.company || '', fontSize: 9, bold: true, color: '#6b7280', margin: [0, 2, 0, 0] },
                    { text: formatDateRange(exp.startDate, exp.endDate, exp.current), fontSize: 8, color: '#6b7280', margin: [0, 1, 0, 4] },
                    { text: exp.description || '', fontSize: 9, color: '#4b5563', lineHeight: 1.4 }
                  ],
                  margin: [8, 0, 0, 14]
                }))
              ] : []),

              // Projects
              ...(resumeData.projects?.length ? [
                {
                  text: [
                    { text: '— ', fontSize: 14, bold: true, color: pc },
                    { text: 'Projects', fontSize: 14, bold: true }
                  ],
                  margin: [0, 4, 0, 10]
                },
                ...resumeData.projects.map(proj => ({
                  table: {
                    widths: ['*'],
                    body: [[{
                      stack: [
                        {
                          text: [
                            { text: proj.title || '', fontSize: 12, bold: true, color: '#1f2937' },
                            ...(proj.link ? [{ text: '  LINK', link: proj.link, color: pc, fontSize: 8, bold: true, characterSpacing: 1 }] : [])
                          ]
                        },
                        ...(proj.technologies?.length ? [{ text: proj.technologies.join(' / '), fontSize: 8, bold: true, color: '#6b7280', characterSpacing: 0.5, margin: [0, 2, 0, 4] }] : []),
                        { text: proj.description || '', fontSize: 9, color: '#4b5563', lineHeight: 1.4 }
                      ],
                      fillColor: '#f9fafb', margin: [10, 10, 10, 10]
                    }]]
                  },
                  layout: 'noBorders',
                  margin: [0, 0, 0, 8]
                }))
              ] : [])
            ]
          },
          // Right Column (40%)
          {
            width: '42%',
            margin: [16, 0, 0, 0],
            stack: rightStack
          }
        ],
        margin: [0, 20, 0, 0]
      },

      // ── Footer bar ──
      {
        canvas: [{ type: 'rect', x: 0, y: 0, w: 515, h: 6, color: lightenColor(pc, 0.5) }],
        margin: [0, 20, 0, 0]
      }
    ],
    defaultStyle: { font: 'Roboto' },
    pageMargins: [40, 30, 30, 30] as [number, number, number, number]
  };
};

// ──────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT FUNCTION
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
   
    const pdfDoc = pdfMake.createPdf(docDefinition);
    
    pdfDoc.getBlob((blob: Blob) => {
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    });

  } catch (error) {
    console.error('[PDF Download] Error:', error);
    alert(`PDF Generation failed: ${error}`);
  }
};
