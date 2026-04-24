import { motion } from 'framer-motion';
import { Sparkles, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-indigo-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000000_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none" />
      
      <SEO
        title="About CareerLeaf - Our Mission to Elevate Careers"
        description="Learn about CareerLeaf's mission to democratize professional success with free, ATS-friendly resume building tools for everyone."
        path="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'CareerLeaf',
          url: 'https://www.careerleaf.app',
          logo: 'https://www.careerleaf.app/logo.png',
          description: 'CareerLeaf is a free online resume builder that helps job seekers create professional, ATS-friendly resumes.',
          sameAs: [],
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Our Mission to <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">Elevate Careers</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
            We built CareerLeaf to democratize professional success. Your resume is the single most important document in your career—we make sure it looks perfect.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">The CareerLeaf Story</h2>
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                CareerLeaf started with a simple observation: highly qualified candidates were being rejected because their resumes couldn't pass automated Applicant Tracking Systems (ATS), or simply didn't visually represent their professional value. We saw talented developers, marketers, nurses, and recent graduates struggle with formatting tools that were never designed for resume building.
              </p>
              <p>
                We realized that formatting a resume in a traditional word processor is tedious, error-prone, and often results in broken layouts. Most "free" resume builders on the market lure users in with promises, only to demand payment at the final download step — a bait-and-switch that disproportionately affects students and early-career professionals who need help the most.
              </p>
              <p>
                So we decided to build something different. CareerLeaf was founded with one principle: <strong>professional career tools should be accessible to everyone, regardless of budget</strong>. Today, CareerLeaf is a powerful, completely free platform used by thousands of job seekers worldwide to create polished, ATS-optimized resumes that actually get interviews.
              </p>
              <p>
                Our platform combines intelligent design algorithms with human-centered aesthetics, ensuring you spend less time formatting borders and more time preparing for your next big interview. Every template is tested against major ATS platforms including Workday, Greenhouse, Lever, and iCIMS to ensure maximum compatibility.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight text-center md:text-left">Meet the Founder</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 border-4 border-indigo-50 shadow-lg">
              <span className="text-3xl font-extrabold text-indigo-600">S</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">Satyam Singh</h3>
              <p className="text-indigo-600 font-bold text-sm mb-4">Founder & Developer</p>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                Satyam is a full-stack developer passionate about building tools that make a real difference in people's lives. After witnessing friends and peers struggle with expensive resume services and poorly designed free alternatives, he built CareerLeaf as an open, accessible solution that prioritizes the user experience above all else.
              </p>
              <p className="text-slate-600 font-medium leading-relaxed">
                With expertise in React, Node.js, and modern web technologies, Satyam has designed CareerLeaf to be fast, reliable, and genuinely helpful — proving that high-quality software doesn't have to come with a high price tag.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "5+", label: "Professional Templates" },
            { value: "Free", label: "Forever, No Hidden Fees" },
            { value: "100%", label: "ATS Compatible" },
            { value: "PDF", label: "Instant Download" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-2">{stat.value}</div>
              <p className="text-sm text-slate-500 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 text-center"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Precision</h3>
            <p className="text-slate-500 font-medium">Every template engineered to pass ATS firewalls and look stunning to human eyes. We test against Workday, Greenhouse, Lever, and more.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 text-center"
          >
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-7 h-7 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Speed</h3>
            <p className="text-slate-500 font-medium">Create, edit, and instantly export beautiful PDFs without installing any software. Go from blank page to finished resume in under 15 minutes.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 text-center"
          >
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Accessibility</h3>
            <p className="text-slate-500 font-medium">Premium career tools should be available to everyone, regardless of budget. No credit card, no paywall, no hidden charges — ever.</p>
          </motion.div>
        </div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight text-center md:text-left">Built With Modern Technology</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">
            CareerLeaf is built using industry-leading technologies to ensure a fast, secure, and reliable experience for every user. Our frontend is powered by React with a responsive design system that works seamlessly across desktop, tablet, and mobile devices. The backend runs on Node.js with secure authentication and encrypted data storage.
          </p>
          <p className="text-slate-600 font-medium leading-relaxed">
            We use AI-powered features through Google Gemini to help users optimize their resume content, while ensuring all personal data remains private and is never used to train external models. Our PDF generation engine produces pixel-perfect documents that maintain their formatting across all devices and printing services.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none" />
          
          <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Ready to build your future?</h2>
          <Link to="/editor">
            <button className="px-8 py-4 bg-linear-to-r from-indigo-600 to-cyan-500 text-white text-lg font-bold rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.4)] active:scale-95 transition-all duration-300">
              Start Building For Free
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;
