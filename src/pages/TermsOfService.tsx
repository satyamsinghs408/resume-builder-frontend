import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Scale, Zap, Mail, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SEO
          title="Terms of Service | CareerLeaf"
          description="Read CareerLeaf's Terms of Service. Learn about the rules and guidelines for using our premium resume builder."
          path="/terms-of-service"
        />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6">
            <CheckCircle className="w-3.5 h-3.5" />
            Terms of Use
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Terms of <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">Service</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            By using CareerLeaf, you agree to the conditions set forth in this agreement. 
            We aim to keep these terms simple, fair, and transparent.
          </p>
          <div className="mt-6 text-slate-400 font-bold text-sm tracking-widest uppercase">
            Updated: April 10, 2026
          </div>
        </motion.div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
                {
                    icon: <Zap className="w-6 h-6 text-yellow-500" />,
                    title: "Service Scope",
                    desc: "Free and premium tools to help you build professional resumes instantly."
                },
                {
                    icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
                    title: "User Obligations",
                    desc: "You are responsible for the accuracy of your data and account security."
                },
                {
                    icon: <Scale className="w-6 h-6 text-slate-500" />,
                    title: "Fair Usage",
                    desc: "Usage is strictly for personal career advancement, subject to fair use limits."
                }
            ].map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                    className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-100 shadow-xl shadow-indigo-900/5 relative group hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {item.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
            ))}
        </div>

        {/* Detailed Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50/50 rounded-full blur-3xl -z-10 translate-x-32 -translate-y-32" />
          
          <div className="prose prose-slate max-w-none 
            prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-slate-900 prose-strong:font-bold
          ">
            
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">1</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Acceptance of Terms</h2>
                </div>
                <p>
                    By accessing and using CareerLeaf.app (the "Site" or "Service"), you agree to the conditions set forth in this agreement. If you do not agree to these terms, please do not use our services. Your continued use of the Site constitutes your acceptance of these Terms and any future modifications.
                </p>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">2</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Service Description</h2>
                </div>
                <p>
                    CareerLeaf provides an interactive platform for resume design and career tool generation. We offer:
                </p>
                <ul>
                    <li><strong>Guest Processing:</strong> Real-time PDF generation without account creation. These sessions are ephemeral.</li>
                    <li><strong>Account Storage:</strong> Persistence of resume drafts and settings for registered users.</li>
                    <li><strong>AI Assistance:</strong> Intelligent parsing and content suggestions powered by third-party infrastructure.</li>
                </ul>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">3</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">User Responsibilities</h2>
                </div>
                <p>
                    You are solely responsible for the content you input into the Service. You agree that:
                </p>
                <ul>
                    <li>The information provided is accurate and truthful.</li>
                    <li>You will not use the service to generate fraudulent or misleading documents.</li>
                    <li>You will maintain the confidentiality of your account credentials (for registered users).</li>
                </ul>
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4 my-6">
                    <div className="bg-amber-100 p-2 rounded-lg h-fit">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <div className="font-bold text-amber-900">Important Note</div>
                        <p className="text-xs text-amber-800 m-0">CareerLeaf acts as a tool for creation. We do not verify the authenticity of user-generated resumes. Users assume all liability for the content of their documents.</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">4</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Intellectual Property</h2>
                </div>
                <p>
                    The layout, design system, brand identity, and standard templates provided on the Site are the exclusive intellectual property of CareerLeaf. 
                </p>
                <ul>
                    <li><strong>Your Content:</strong> You retain full ownership of the text and personal data you input.</li>
                    <li><strong>Our Templates:</strong> You are granted a personal, non-exclusive license to use our templates for your personal resume creation. Commercial resale or distribution of CareerLeaf templates is strictly prohibited.</li>
                </ul>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">5</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Prohibited Uses</h2>
                </div>
                <p>You may not use the Service to:</p>
                <ul>
                    <li>Engage in any form of automated scraping or data mining.</li>
                    <li>Reverse-engineer the platform's proprietary algorithms.</li>
                    <li>Create resumes for fraudulent purposes or to impersonate others.</li>
                    <li>Attempt to bypass account security or system limitations.</li>
                </ul>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">6</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Limitation of Liability</h2>
                </div>
                <p>
                    CareerLeaf shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service. We provide these tools "As Is" without warranties of any kind regarding the success of your job applications or the stability of the platform beyond our standard maintenance.
                </p>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">7</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Governing Law</h2>
                </div>
                <p>
                    These terms shall be governed by and defined in accordance with the laws of India. CareerLeaf and yourself irrevocably consent that the courts of Haryana shall have exclusive jurisdiction to resolve any dispute which may arise.
                </p>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">8</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Contact & Compliance</h2>
                </div>
                <p>For any legal inquiries regarding these terms, please contact:</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <a href="mailto:support@careerleaf.app" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 transition-all no-underline font-bold text-slate-800">
                        <Mail className="w-5 h-5 text-indigo-600" /> support@careerleaf.app
                    </a>
                </div>
            </section>

          </div>
        </motion.div>

        {/* Closing message */}
        <div className="mt-12 text-center text-slate-400 text-sm font-medium">
            Thank you for choosing CareerLeaf to advance your professional journey.
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
