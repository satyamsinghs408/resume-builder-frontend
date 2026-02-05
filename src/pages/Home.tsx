import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Shield,
  Zap,
  Layout
} from 'lucide-react';
import TemplatePreview from '../components/landing/TemplatePreview';

const Home = () => {
  const steps = [
    {
      num: '01',
      title: 'Import or Start Fresh',
      desc: 'Upload an existing resume PDF to autofill data or start from scratch.'
    },
    {
      num: '02',
      title: 'Edit & Custimize',
      desc: 'Use our drag-and-drop editor to tweak details, colors, and layout.'
    },
    {
      num: '03',
      title: 'Export to PDF',
      desc: 'Download a perfectly formatted, ATS-friendly resume instantly.'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'ATS-Friendly',
      desc: 'Optimized layouts ensuring your resume gets past hiring bots.'
    },
    {
      icon: Zap,
      title: 'AI Parsing',
      desc: 'Smart extraction technology saves you hours of manual typing.'
    },
    {
      icon: Layout,
      title: 'Live Preview',
      desc: 'See changes in real-time. What you see is exactly what you get.'
    }
  ];

  const templates: Array<'classic' | 'modern' | 'minimalist' | 'executive' | 'creative'> = [
      'classic', 'modern', 'minimalist', 'executive', 'creative'
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen pt-20 lg:pt-0 flex items-center overflow-hidden bg-slate-900 border-b border-white/5">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-0 right-0 w-200 h-200 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-150 h-150 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
            
            {/* Left Content */}
            <div className="text-center lg:text-left pt-10 lg:pt-0">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-medium mb-8 hover:bg-white/10 transition-colors cursor-default"
                >
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>#1 Free Resume Builder</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
                >
                    Build a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Winning Resume</span> <br className="hidden lg:block"/> in Minutes.
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                >
                    Professional templates, AI-powered parsing, and real-time previews. 
                    No hidden fees, no credit card required—just build and download.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                    <Link to="/editor" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                            Create My Resume
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto">
                         <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2">
                             I have an account
                         </button>
                    </Link>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-white/5 pt-8"
                >
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs text-white overflow-hidden">
                                 <div className={`w-full h-full bg-linear-to-br ${i % 2 === 0 ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'}`}></div>
                            </div>
                        ))}
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-slate-400 text-sm">Trusted by 10,000+ professionals</p>
                    </div>
                </motion.div>
            </div>

            {/* Right Visuals - 3D Stack */}
            <div className="relative hidden lg:block h-200">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 perspective-1000">
                     {/* Floating Cards Animation */}
                     <motion.div 
                        initial={{ opacity: 0, rotateX: 20, rotateY: -20, rotateZ: 10, y: 100 }}
                        animate={{ opacity: 1, rotateX: 20, rotateY: -20, rotateZ: 10, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                        className="relative w-full h-full preserve-3d"
                     >
                        <div className="absolute top-0 right-0 transform -translate-z-12.5 translate-x-12 translate-y-12 opacity-60">
                            <TemplatePreview template="modern" scale={1.2} />
                        </div>
                        <div className="absolute top-10 right-10 transform -translate-z-6.25 translate-x-6 translate-y-6 opacity-80">
                             <TemplatePreview template="minimalist" scale={1.2} />
                        </div>
                        <div className="absolute top-20 right-20 shadow-2xl shadow-black/50">
                             <TemplatePreview template="classic" scale={1.2} />
                             {/* Floating Badge on top card */}
                             <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold shadow-xl border border-slate-100 flex items-center gap-2 z-20"
                             >
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                ATS Ready
                             </motion.div>
                        </div>
                     </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* ===== FEATURES / TRUST ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Professionals Choose Us</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">We focus on one thing: helping you land your dream job with a resume that stands out.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all group">
                         <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                             <feature.icon className="w-7 h-7 text-blue-600" />
                         </div>
                         <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                         <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
                 <div>
                     <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Built for Speed and Quality.</h2>
                     <p className="text-lg text-slate-600 mb-12">No confusing menus or complex tools. Just a straightforward path to your new resume.</p>
                     
                     <div className="space-y-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex gap-6 relative">
                                {idx !== steps.length - 1 && (
                                    <div className="absolute left-6 top-12 -bottom-8 w-px border-l-2 border-dashed border-slate-200"></div>
                                )}
                                <div className="w-12 h-12 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center shrink-0 font-bold text-blue-600 relative z-10 shadow-sm">
                                    {step.num}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                 </div>
                 <div className="relative">
                      {/* Abstract Decoration */}
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-3xl transform rotate-3 scale-105"></div>
                      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-8 overflow-hidden">
                           <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                               <div className="w-3 h-3 rounded-full bg-red-400"></div>
                               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                               <div className="w-3 h-3 rounded-full bg-green-400"></div>
                               <div className="ml-4 h-4 bg-slate-100 rounded-full w-48"></div>
                           </div>
                           <div className="space-y-4">
                               <div className="h-40 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 gap-2">
                                   <Upload className="w-6 h-6" />
                                   Drop PDF here
                               </div>
                               <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                               <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                               <div className="pt-4 flex justify-end">
                                   <div className="h-10 w-32 bg-blue-600 rounded-lg"></div>
                               </div>
                           </div>
                      </div>
                 </div>
             </div>
         </div>
      </section>

      {/* ===== TEMPLATES GALLERY ===== */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stunning Templates for Every Career</h2>
                  <p className="text-xl text-slate-400">Minimalist, creative, or executive — tailored for your industry.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {templates.map((template, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="group relative bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
                      >
                           {/* Preview Container */}
                           <div className="aspect-210/297 bg-white rounded-lg overflow-hidden relative shadow-lg mb-4">
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all z-10"></div>
                                <div className="transform scale-[0.45] origin-top-left w-[200%] h-[200%]">
                                    <TemplatePreview template={template}  />
                                </div>
                                
                                {/* Hover Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <Link to="/editor">
                                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg hover:bg-blue-500 transform scale-90 group-hover:scale-100 transition-all">
                                            Use Template
                                        </button>
                                    </Link>
                                </div>
                           </div>
                           <h3 className="text-center font-bold text-slate-200 capitalize group-hover:text-blue-400 transition-colors">{template}</h3>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* ===== COMPARISON VS COMPETITORS ===== */}
      <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why We Are Better</h2>
              
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
                  <div className="grid grid-cols-3 bg-slate-50 p-4 border-b border-slate-200 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      <div>Features</div>
                      <div className="text-center text-blue-600">ResumeBuilder</div>
                      <div className="text-center">Other Builders</div>
                  </div>
                  
                  {[
                      { name: 'Cost', us: '100% Free', them: '$15 - $25/month' },
                      { name: 'Watermarks', us: 'None', them: 'Yes (on free plan)' },
                      { name: 'Templates', us: '5+ Premium', them: 'Locked behind paywall' },
                      { name: 'AI Parsing', us: 'Unlimited', them: 'Limited/Paid' },
                      { name: 'Export', us: 'Instant PDF', them: 'Signup Required' },
                  ].map((row, idx) => (
                      <div key={idx} className={`grid grid-cols-3 p-4 items-center ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <div className="font-semibold text-slate-700">{row.name}</div>
                          <div className="text-center font-bold text-blue-600 flex justify-center items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              {row.us}
                          </div>
                          <div className="text-center text-slate-400">{row.them}</div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* ===== CTA FOOTER ===== */}
      <section className="py-24 px-6 bg-linear-to-br from-blue-900 to-slate-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to launch your career?</h2>
              <p className="text-xl text-blue-100 mb-10">Join thousands of job seekers who secured interviews with our professional resumes.</p>
              
              <Link to="/editor">
                  <button className="px-10 py-5 bg-white text-blue-900 text-lg font-bold rounded-xl shadow-2xl hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto">
                      Build My Resume Now
                      <ArrowRight className="w-5 h-5" />
                  </button>
              </Link>
          </div>
      </section>

      {/* ===== FINAL FOOTER ===== */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-white">Resume<span className="text-blue-500">Builder</span></span>
                  </div>
                  <p className="text-sm leading-relaxed max-w-sm">
                      We believe every professional deserves a great resume without breaking the bank. Open-source and free forever.
                  </p>
              </div>
              
              <div>
                  <h4 className="text-white font-bold mb-4">Product</h4>
                  <ul className="space-y-2 text-sm">
                      <li><Link to="/editor" className="hover:text-blue-400 transition-colors">Templates</Link></li>
                      <li><Link to="/editor" className="hover:text-blue-400 transition-colors">AI Builder</Link></li>
                      <li><Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
                  </ul>
              </div>

              <div>
                  <h4 className="text-white font-bold mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm">
                      <li><span className="cursor-not-allowed opacity-50">Privacy Policy</span></li>
                      <li><span className="cursor-not-allowed opacity-50">Terms of Service</span></li>
                      <li><span className="cursor-not-allowed opacity-50">Cookie Policy</span></li>
                  </ul>
              </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs">
              © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </div>
      </footer>
    </div>
  );
};

export default Home;