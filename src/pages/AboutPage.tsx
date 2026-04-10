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
                CareerLeaf started with a simple observation: highly qualified candidates were being rejected because their resumes couldn't pass automated Applicant Tracking Systems (ATS), or simply didn't visually represent their professional value.
              </p>
              <p>
                We realized that formatting a resume in a traditional word processor is tedious, error-prone, and often results in broken layouts. So, we decided to engineer a solution.
              </p>
              <p>
                Today, CareerLeaf is a powerful, totally free SaaS platform designed to remove that friction. By combining intelligent design algorithms with human-centered aesthetics, we ensure you spend less time formatting borders and more time preparing for your next big interview.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 text-center"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Precision</h3>
            <p className="text-slate-500 font-medium">Every template engineered to pass ATS firewalls and look stunning to human eyes.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 text-center"
          >
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-7 h-7 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Speed</h3>
            <p className="text-slate-500 font-medium">Create, edit, and instantly export beautiful PDFs without installing any software.</p>
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
            <p className="text-slate-500 font-medium">Premium career tools should be available to everyone, regardless of budget.</p>
          </motion.div>
        </div>

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
