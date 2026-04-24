import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RealisticTemplatePreview from '../components/landing/RealisticTemplatePreview';
import SEO from '../components/SEO';
import AdSlot from '../components/ads/AdSlot';

const templates = [
  { id: 'classic', name: 'Classic Professional', desc: 'Standard ATS-friendly format perfect for corporate roles.', bg: 'bg-white', border: 'border-slate-200' },
  { id: 'modern', name: 'Modern Dark', desc: 'Sleek dark-mode header. Stands out in a pile of white pages.', bg: 'bg-slate-800', border: 'border-slate-700' },
  { id: 'minimalist', name: 'Minimalist Clean', desc: 'Lots of whitespace. Focus purely on your content.', bg: 'bg-white', border: 'border-slate-200' },
  { id: 'executive', name: 'Executive Leadership', desc: 'Authoritative typography and strong borders.', bg: 'bg-slate-50', border: 'border-slate-300' },
  { id: 'creative', name: 'Creative Portfolio', desc: 'Bold accent colors. Perfect for design and UI roles.', bg: 'bg-indigo-50', border: 'border-indigo-100' },
];

const TemplatesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <SEO
        title="Free Resume Templates - ATS Friendly Professional Designs | CareerLeaf"
        description="Browse CareerLeaf's collection of free, ATS-optimized resume templates. Classic, Modern, Minimalist, Executive & Creative designs. Download as PDF instantly."
        path="/templates"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">ATS-Friendly Templates</h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl">
            Choose from our collection of professionally designed resume templates. Every template is engineered to pass Applicant Tracking Systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl, i) => (
            <motion.div 
              key={tpl.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-full aspect-[1.0] rounded-2xl mb-6 relative border border-slate-200 shadow-inner overflow-hidden group/preview pointer-events-none bg-slate-100">
                 {/* Container that scrolls on hover */}
                 <div className="w-full h-[650px] transform scale-[0.58] origin-top-left absolute top-0 left-0 transition-transform duration-[2s] ease-in-out group-hover:-translate-y-[2%]" style={{ width: '172%' }}>
                   <RealisticTemplatePreview template={tpl.id as 'classic' | 'modern' | 'minimalist' | 'executive' | 'creative'} />
                 </div>

                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-auto">
                    <Link to="/editor">
                      <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
                        Use Template
                      </button>
                    </Link>
                 </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{tpl.name}</h3>
              <p className="text-slate-500 font-medium text-sm">{tpl.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 max-w-4xl mx-auto text-slate-500 prose prose-slate">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            Why Choose Our Free Resume Templates?
          </h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            Every <strong>resume template</strong> in our library has been designed by HR professionals and tested against major <strong>Applicant Tracking Systems (ATS)</strong>. Whether you're a fresh graduate writing your first CV or a seasoned executive updating your career profile, our templates provide the perfect structure for showcasing your skills, experience, and education.
          </p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            Our <strong>Classic Professional</strong> template is the go-to choice for corporate and traditional industries. The <strong>Modern</strong> template features a bold sidebar layout ideal for tech and product roles. Choose the <strong>Minimalist</strong> or <strong>Creative</strong> designs for maximum visual impact while maintaining ATS compatibility.
          </p>
          <p className="mb-6 text-sm sm:text-base leading-relaxed font-medium">
            All our templates are <strong>100% free</strong> — no hidden paywalls, no credit card required. Simply select your preferred design, fill in your information using our intuitive editor, and download a polished PDF ready for your next job application.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 tracking-tight">
            How to Choose the Right Resume Template for Your Industry
          </h3>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            Selecting the right template is more than an aesthetic choice — it directly affects how recruiters and ATS software perceive your application. For <strong>corporate sectors</strong> like banking, law, accounting, and consulting, stick with clean, single-column layouts that prioritize readability and professionalism. The Classic Professional template works exceptionally well here. For <strong>technology, design, and startup roles</strong>, a two-column layout with a skills sidebar (like our Modern template) allows you to showcase technical proficiencies prominently while keeping work history accessible.
          </p>
          <p className="mb-6 text-sm sm:text-base leading-relaxed font-medium">
            If you're a <strong>recent graduate or career changer</strong>, choose a template that allows you to lead with skills and education rather than extensive work experience. Functional or combination layouts help highlight transferable competencies. Regardless of which template you choose, ensure it uses standard section headings like "Work Experience," "Education," and "Skills" — these are the labels ATS software is programmed to recognize.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions About Our Resume Templates
          </h3>
          <div className="space-y-4">
            {[
              { q: "Are these resume templates really free?", a: "Yes, 100% free with no hidden fees. You can create, edit, and download your resume as a PDF without ever entering payment information. CareerLeaf is supported by advertising, which allows us to offer premium-quality templates at no cost to you." },
              { q: "Are the templates compatible with ATS software?", a: "Absolutely. Every template is tested against popular ATS platforms including Workday, Greenhouse, Lever, and iCIMS. We use clean HTML-to-PDF rendering with standard fonts, proper heading hierarchy, and machine-readable formatting to ensure your resume passes automated screening." },
              { q: "Can I customize the colors and fonts?", a: "Yes. Our resume editor lets you personalize your template with different color accents while maintaining professional readability. The layout structure is optimized for both visual appeal and ATS compatibility, so your customizations won't break the formatting." },
              { q: "Which template is best for freshers with no experience?", a: "We recommend starting with the Classic Professional or Minimalist template. These layouts allow you to lead with your education, skills, and projects rather than work experience. Focus on internships, academic achievements, volunteer work, and relevant coursework to fill your resume with impactful content." },
              { q: "What file format will I download?", a: "All resumes are exported as high-quality PDF files. PDF is the universally accepted format for job applications — it preserves your formatting across all devices and operating systems, and is compatible with virtually every ATS on the market." }
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed m-0">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Placement */}
        <div className="mt-12">
          <AdSlot position="templates" />
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
