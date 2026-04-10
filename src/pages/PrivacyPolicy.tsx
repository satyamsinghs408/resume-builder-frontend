import { motion } from 'framer-motion';
import { Shield, Eye, Database, Share2, Lock, Mail, ShieldCheck, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SEO
          title="Privacy Policy | CareerLeaf"
          description="CareerLeaf's professional privacy policy. Learn how we protect your data with total transparency and security."
          path="/privacy-policy"
        />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            Your Privacy, Our Priority
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Privacy <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">Policy</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            We believe you deserve total transparency regarding your personal information. 
            This policy outlines how we handle your data with the highest degree of care.
          </p>
          <div className="mt-6 text-slate-400 font-bold text-sm tracking-widest uppercase">
            Effective Date: April 10, 2026
          </div>
        </motion.div>

        {/* TL;DR Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
                {
                    icon: <Eye className="w-6 h-6 text-cyan-500" />,
                    title: "Total Transparency",
                    desc: "We collect data only when required for account features. Guest sessions are ephemeral."
                },
                {
                    icon: <Lock className="w-6 h-6 text-indigo-500" />,
                    title: "Bank-Level Security",
                    desc: "Your data is encrypted and saved only upon your explicit request to save a resume."
                },
                {
                    icon: <Heart className="w-6 h-6 text-rose-500" />,
                    title: "Never Sold",
                    desc: "We do not sell your data. We have zero interest in monetizing your professional history."
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 translate-x-32 -translate-y-32" />
          
          <div className="prose prose-slate max-w-none 
            prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-ul:list-disc prose-li:text-slate-600 prose-li:font-medium
          ">
            
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">1</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Introduction</h2>
                </div>
                <p>
                    Welcome to CareerLeaf.app. Our platform is designed to provide you with the most efficient professional resume-building tools while safeguarding your personal identity. This Privacy Policy informs you how we manage your personal information, your rights, and the legal protections afforded to you. 
                </p>
                <p className="border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50/50 rounded-r-xl italic font-bold text-indigo-900">
                    "At CareerLeaf, we believe your professional data belongs to you. We act merely as the architect of your career tools, not the owner of your identity."
                </p>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">2</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Data Collection Architecture</h2>
                </div>
                <p>We pride ourselves on a "minimalist collection" philosophy. Our data capture is divided into two distinct modes:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="font-bold text-indigo-600 mb-2 flex items-center gap-2 underline underline-offset-4 decoration-2">
                             Guest Mode (Anonymous)
                        </div>
                        <p className="text-xs m-0">In guest mode, your details are held in <strong>temporary memory (RAM)</strong> solely to generate your PDF. Once you close your session, this information is not persisted on our permanent servers.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
                        <div className="font-bold text-white mb-2 flex items-center gap-2 underline underline-offset-4 decoration-2">
                             Registered Mode
                        </div>
                        <p className="text-xs m-0 opacity-90 text-white">We collect and persist only the data you explicitly choose to save (Name, Email, Resume Work) upon account creation. This enables you to return and edit your resumes at your convenience.</p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">3</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Purpose of Processing</h2>
                </div>
                <p>We use your information exclusively for the following purposes:</p>
                <ul>
                    <li><strong>Service Delivery:</strong> Converting your professional details into high-quality PDF resumes.</li>
                    <li><strong>Account Management:</strong> Securely storing your drafts for future modifications.</li>
                    <li><strong>Site Improvement:</strong> Analyzing broad, anonymized usage trends to enhance our editor interface.</li>
                    <li><strong>Technical Support:</strong> Responding to your inquiries via our contact channels.</li>
                </ul>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">4</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Third-Party Partners & Associates</h2>
                </div>
                <p>
                    To maintain our high technological standards, we indulge in minimal data sharing with trusted third-party associates who are strictly aligned with our privacy values:
                </p>
                <ul>
                    <li><strong>AI Infrastructure (Google Gemini):</strong> Used temporarily to parse and enhance resume content. Your data is processed securely and is not used to train global AI models beyond your specific request.</li>
                    <li><strong>Cloud Infrastructure:</strong> Secure hosting and database management to keep the site operational.</li>
                    <li><strong>Ad Performance (Google AdSense):</strong> We serve ads to keep our services free. These partners may use cookies to serve personalized ads based on your visit to this and other sites.</li>
                </ul>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">5</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Security Guarantee</h2>
                </div>
                <p>
                    We have implemented industry-standard encryption and security protocols (SSL/TLS) to prevent unauthorized access or disclosure. We act under a "Nothing to do with your data" policy—meaning we do not inspect or manually review your content unless requested for technical support.
                </p>
            </section>

            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">6</div>
                    <h2 className="text-2xl m-0 uppercase tracking-tighter">Contact Us</h2>
                </div>
                <p>
                    For any questions regarding your privacy, deletion of data, or general inquiries, please reach out to our team:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <a href="mailto:support@careerleaf.app" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 transition-all no-underline font-bold text-slate-800">
                        <Mail className="w-5 h-5 text-indigo-600" /> support@careerleaf.app
                    </a>
                    <a href="/contact" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 transition-all no-underline font-bold text-slate-800">
                        <Database className="w-5 h-5 text-indigo-600" /> Contact Support Page
                    </a>
                </div>
            </section>

          </div>
        </motion.div>

        {/* Closing trust message */}
        <div className="mt-12 text-center text-slate-400 text-sm font-medium">
            CareerLeaf.app &copy; {new Date().getFullYear()}. All your professional data is safe with us.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
