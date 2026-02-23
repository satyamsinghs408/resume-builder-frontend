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
      title: 'Edit & Customize',
      desc: 'Use our intuitive editor to tweak details, colors, and layout.'
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
      desc: 'Optimized layouts ensuring your resume gets past automated screening systems.'
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
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen pt-20 lg:pt-0 flex items-center overflow-hidden bg-[#0F172A]">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle Background Fills */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-50/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-slate-100/60 rounded-full blur-3xl -z-10" />
             {/* Noise texture */}
             <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-3 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
            {/* Left Content */}
            <div className="text-center lg:text-left pt-10 lg:pt-0">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-emerald-400 text-sm font-medium mb-8 cursor-default"
                >
                    <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>Trusted by 10,000+ professionals</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6"
                >
                    Build a resume that <br className="hidden lg:block"/>
                    <span className="text-emerald-400">gets you hired.</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                >
                    Professional templates, AI-powered parsing, and real-time previews. 
                    No hidden fees — just build and download.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
                >
                    <Link to="/editor" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group">
                            Create My Resume
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto">
                         <button className="w-full sm:w-auto px-7 py-3.5 bg-transparent hover:bg-white/6 text-slate-300 font-medium rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2">
                             I have an account
                         </button>
                    </Link>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-14 flex items-center justify-center lg:justify-start gap-6 border-t border-white/6 pt-8"
                >
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center text-xs text-white overflow-hidden">
                                 <div className={`w-full h-full ${i % 2 === 0 ? 'bg-emerald-600' : 'bg-teal-600'}`}></div>
                            </div>
                        ))}
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-0.5 text-amber-400 mb-0.5">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                        <p className="text-slate-500 text-sm">4.9/5 from 2,000+ reviews</p>
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
                        <div className="absolute top-0 right-0 transform -translate-z-12.5 translate-x-12 translate-y-12 opacity-50">
                            <TemplatePreview template="modern" scale={1.2} />
                        </div>
                        <div className="absolute top-10 right-10 transform -translate-z-6.25 translate-x-6 translate-y-6 opacity-70">
                             <TemplatePreview template="minimalist" scale={1.2} />
                        </div>
                        <div className="absolute top-20 right-20 shadow-2xl shadow-black/40">
                             <TemplatePreview template="classic" scale={1.2} />
                             {/* Floating Badge on top card */}
                             <motion.div 
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-5 -right-5 bg-white text-slate-900 px-3.5 py-1.5 rounded-lg font-semibold text-sm shadow-lg border border-slate-100 flex items-center gap-1.5 z-20"
                             >
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                ATS Ready
                             </motion.div>
                        </div>
                     </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* ===== FEATURES / TRUST ===== */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Why Professionals Choose Us</h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">We focus on one thing: helping you land your dream job with a resume that stands out.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/4 hover:-translate-y-1 transition-all duration-300 group"
                    >
                         <div className="w-12 h-12 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors duration-300">
                              <feature.icon className="w-6 h-6 text-emerald-600" />
                         </div>
                         <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                         <p className="text-slate-500 leading-relaxed text-[15px]">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-28 bg-[#F8FAFC] border-y border-slate-200/60">
         <div className="max-w-7xl mx-auto px-6">
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                     >
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Built for Speed<br/>and Quality.</h2>
                        <p className="text-lg text-slate-500 mb-14">No confusing menus or complex tools. Just a straightforward path to your new resume.</p>
                     </motion.div>
                     
                     <div className="space-y-10">
                        {steps.map((step, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="flex gap-5 relative"
                            >
                                {idx !== steps.length - 1 && (
                                    <div className="absolute left-5 top-12 -bottom-10 w-px border-l border-dashed border-slate-200"></div>
                                )}
                                <div className="w-10 h-10 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center shrink-0 font-bold text-emerald-600 text-sm relative z-10">
                                    {step.num}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1.5">{step.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-[15px]">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                     </div>
                 </div>
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                 >
                      <div className="relative bg-white rounded-xl shadow-lg shadow-slate-200/60 border border-slate-200/60 p-8 overflow-hidden">
                           <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                               <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                               <div className="ml-4 h-3.5 bg-slate-100 rounded-full w-40"></div>
                           </div>
                           <div className="space-y-4">
                               <div className="h-36 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-400 gap-2 text-sm">
                                   <Upload className="w-5 h-5" />
                                   Drop PDF here
                               </div>
                               <div className="h-3.5 bg-slate-100 rounded w-3/4"></div>
                               <div className="h-3.5 bg-slate-100 rounded w-1/2"></div>
                               <div className="pt-3 flex justify-end">
                                   <div className="h-9 w-28 bg-emerald-600 rounded-lg"></div>
                               </div>
                           </div>
                      </div>
                 </motion.div>
             </div>
         </div>
      </section>

      {/* ===== TEMPLATES GALLERY ===== */}
      <section className="py-28 bg-[#0F172A] text-white overflow-hidden relative">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-emerald-900/15 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 tracking-tight">Stunning Templates for Every Career</h2>
                  <p className="text-lg text-slate-400">Minimalist, creative, or executive — tailored for your industry.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                  {templates.map((template, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="group relative bg-slate-800/50 rounded-xl p-3.5 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                      >
                           {/* Preview Container */}
                           <div className="aspect-210/297 bg-white rounded-lg overflow-hidden relative shadow-md mb-3">
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-all z-10"></div>
                                <div className="transform scale-[0.90] origin-top-left w-[200%] h-[200%]">
                                    <TemplatePreview template={template}  />
                                </div>
                                
                                {/* Hover Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <Link to="/editor">
                                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                                            Use Template
                                        </button>
                                    </Link>
                                </div>
                           </div>
                           <h3 className="text-center font-semibold text-slate-300 capitalize group-hover:text-emerald-400 transition-colors duration-300 text-sm">{template}</h3>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* ===== COMPARISON VS COMPETITORS ===== */}
      <section className="py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12 tracking-tight">Why We Are Better</h2>
              
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="grid grid-cols-3 bg-slate-50 p-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      <div>Features</div>
                      <div className="text-center text-emerald-600">ResumeBuilder</div>
                      <div className="text-center">Other Builders</div>
                  </div>
                  
                  {[
                      { name: 'Cost', us: '100% Free', them: '$15 - $25/month' },
                      { name: 'Watermarks', us: 'None', them: 'Yes (on free plan)' },
                      { name: 'Templates', us: '5+ Premium', them: 'Locked behind paywall' },
                      { name: 'AI Parsing', us: 'Unlimited', them: 'Limited/Paid' },
                      { name: 'Export', us: 'Instant PDF', them: 'Signup Required' },
                  ].map((row, idx) => (
                      <div key={idx} className={`grid grid-cols-3 p-4 items-center text-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <div className="font-medium text-slate-700">{row.name}</div>
                          <div className="text-center font-semibold text-emerald-600 flex justify-center items-center gap-1.5">
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
      <section className="py-28 px-6 bg-[#0F172A] text-center relative overflow-hidden">
          {/* Subtle emerald glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-600/6 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-3" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}}></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 tracking-tight">Ready to launch your career?</h2>
              <p className="text-lg text-slate-400 mb-10">Join thousands of job seekers who secured interviews with our professional resumes.</p>
              
              <Link to="/editor">
                  <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 mx-auto">
                      Build My Resume Now
                      <ArrowRight className="w-4 h-4" />
                  </button>
              </Link>
          </div>
      </section>

      {/* ===== FINAL FOOTER ===== */}
      <footer className="bg-[#0B1120] text-slate-500 py-12 border-t border-white/4">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg font-bold text-white tracking-tight">Resume<span className="text-emerald-400">Builder</span></span>
                  </div>
                  <p className="text-sm leading-relaxed max-w-sm text-slate-500">
                      We believe every professional deserves a great resume without breaking the bank. Open-source and free forever.
                  </p>
              </div>
              
              <div>
                  <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
                  <ul className="space-y-2.5 text-sm">
                      <li><Link to="/editor" className="hover:text-emerald-400 transition-colors duration-200">Templates</Link></li>
                      <li><Link to="/editor" className="hover:text-emerald-400 transition-colors duration-200">AI Builder</Link></li>
                      <li><Link to="/login" className="hover:text-emerald-400 transition-colors duration-200">Login</Link></li>
                  </ul>
              </div>

              <div>
                  <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                  <ul className="space-y-2.5 text-sm">
                      <li><span className="cursor-not-allowed opacity-40">Privacy Policy</span></li>
                      <li><span className="cursor-not-allowed opacity-40">Terms of Service</span></li>
                      <li><span className="cursor-not-allowed opacity-40">Cookie Policy</span></li>
                  </ul>
              </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/4 text-center text-xs text-slate-600">
              © {new Date().getFullYear()} ResumeBuilder. All rights reserved. || Designed and Developed with ❤️ by Satyam Singh
          </div>
      </footer>
    </div>
  );
};

export default Home;