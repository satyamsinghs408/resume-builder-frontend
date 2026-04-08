import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  Shield,
  Zap,
  Layout,
  Download,
  Clock,
  Check,
  Star,
  ChevronDown,
  MonitorSmartphone,
} from "lucide-react";
import { useState, useEffect } from "react";
import RealisticTemplatePreview from "../components/landing/RealisticTemplatePreview";
import AdSlot from "../components/ads/AdSlot";

const AnimatedResumeDetails = () => {
  const text1 = "React Developer";
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedTitle(text1.substring(0, i));
      i++;
      if (i > text1.length) {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-slate-100 flex font-sans overflow-hidden border border-slate-200">
      {/* Left Sidebar (Form) */}
      <div className="w-[45%] bg-white border-r border-slate-200 p-3 sm:p-4 flex flex-col relative z-20 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
        <div className="h-2 w-16 bg-slate-300 rounded mb-4"></div>
        <div className="space-y-3">
          <div>
            <div className="h-1.5 w-10 bg-slate-400 rounded mb-1.5"></div>
            <div className="h-6 sm:h-8 w-full border border-slate-200 rounded px-2 flex items-center bg-slate-50 relative pointer-events-none">
              <span className="text-[10px] sm:text-xs text-slate-800 font-medium tracking-tight">
                Alex Rivera
              </span>
            </div>
          </div>
          <div>
            <div className="h-1.5 w-14 bg-indigo-600 rounded mb-1.5"></div>
            <div className="h-6 sm:h-8 w-full border border-indigo-400 ring-2 ring-indigo-500/20 rounded px-2 flex items-center bg-white relative overflow-hidden shadow-[0_0_10px_rgba(79,70,229,0.1)] pointer-events-none z-10">
              <span className="text-[10px] sm:text-xs text-indigo-900 font-bold">
                {typedTitle}
              </span>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-[1.5px] h-3.5 bg-indigo-600 ml-[1px]"
              />
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="h-1.5 w-8 bg-slate-400 rounded mb-1.5"></div>
                <div className="h-6 sm:h-8 w-full border border-slate-200 rounded bg-slate-50"></div>
              </div>
              <div className="flex-1">
                <div className="h-1.5 w-10 bg-slate-400 rounded mb-1.5"></div>
                <div className="h-6 sm:h-8 w-full border border-slate-200 rounded bg-slate-50"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Fake mouse cursor clicking the input */}
        <motion.div
          initial={{ top: "80%", left: "80%", opacity: 0 }}
          animate={{ top: "45%", left: "50%", opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute z-30 pointer-events-none"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-slate-900 drop-shadow-md"
          >
            <path
              d="M5.5 3.21V19a1 1 0 0 0 1.707.707L11.5 15.5l3.5 1.5 1.5-6.5-9.302-7.234A1 1 0 0 0 5.5 3.21z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>

      {/* Right Content (Live Preview) */}
      <div className="flex-1 bg-slate-100/50 p-2 sm:p-4 flex justify-center items-center overflow-hidden">
        <div className="w-full bg-white shadow-lg border border-slate-200 h-full p-4 sm:p-5 flex flex-col relative transform">
          {/* Template Header */}
          <div className="text-center border-b-2 border-slate-800 pb-3 mb-4 shrink-0 transition-all duration-300">
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-widest transition-colors duration-300 relative inline-block">
              Alex Rivera
            </h1>
            <div className="text-indigo-600 text-[9px] sm:text-[10px] font-bold mt-1.5 uppercase tracking-wider h-3 border-l-2 border-r-2 border-transparent px-2">
              {typedTitle || <span className="opacity-0">Placeholder</span>}
            </div>
          </div>
          {/* Template Body blocks */}
          <div className="space-y-4 max-w-[90%] mx-auto w-full">
            <div>
              <div className="text-[7px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-300 pb-0.5 mb-1.5">
                Experience
              </div>
              <div className="flex justify-between items-end mb-1">
                <div className="h-1.5 w-16 bg-slate-700"></div>
                <div className="h-1 w-8 bg-slate-400"></div>
              </div>
              <div className="h-1 w-full bg-slate-200 mb-1"></div>
              <div className="h-1 w-5/6 bg-slate-200 mb-1"></div>
              <div className="h-1 w-4/5 bg-slate-200"></div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <div className="h-1.5 w-20 bg-slate-600"></div>
                <div className="h-1 w-10 bg-slate-400"></div>
              </div>
              <div className="h-1 w-full bg-slate-200 mb-1"></div>
              <div className="h-1 w-11/12 bg-slate-200"></div>
            </div>
          </div>

          {/* CSS Animation Overlay (Magic) */}
          <div className="absolute top-2 right-2 bg-blue-50 text-blue-600 text-[6px] px-1.5 py-0.5 rounded font-bold border border-blue-100 flex items-center gap-1 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            Auto Sync
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const templates: Array<
    "classic" | "modern" | "minimalist" | "executive" | "creative"
  > = ["classic", "modern", "minimalist", "executive", "creative"];

  const faqs = [
    {
      q: "Is CareerLeaf really free to use?",
      a: "Yes! CareerLeaf is a 100% free resume builder. We believe everyone deserves access to great career tools without hidden fees.",
    },
    {
      q: "Can I download my resume as a PDF?",
      a: "Absolutely. Once you finish building your resume, you can instantly download it as a high-quality, ATS-friendly PDF file.",
    },
    {
      q: "Are the templates ATS-friendly?",
      a: "Yes, all our templates are carefully designed to pass through Applicant Tracking Systems (ATS) accurately so recruiters see your actual data.",
    },
    {
      q: "Do I need to sign up to create a resume?",
      a: "No signup is required to start building your resume. However, creating an account lets you save your progress and edit later.",
    },
    {
      q: "Can I edit my resume later?",
      a: "Yes, if you create a free account, your resume data is saved securely, and you can come back anytime to edit or download it again.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-16 md:mt-20">
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden py-10 lg:py-24 bg-linear-to-r from-indigo-600 to-cyan-500 border-b border-indigo-700/50">
        {/* Soft Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* Hero Content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm shadow-sm">
                <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                Rated 4.9/5 by Professionals
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5 sm:mb-6 drop-shadow-sm">
                Build Professional Resume in{" "}
                <span className="text-emerald-300 block sm:inline">
                  Minutes
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-indigo-50 mb-8 max-w-2xl leading-relaxed drop-shadow-sm">
                Create ATS-friendly resumes with modern templates. Download
                instantly. No signup required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/editor" className="w-full sm:w-auto block">
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-indigo-600 hover:bg-slate-50 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-base sm:text-lg flex items-center justify-center gap-2">
                    Create Resume
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                  </button>
                </Link>
                <a href="#templates" className="w-full sm:w-auto block">
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 backdrop-blur-md transition-all text-base sm:text-lg flex items-center justify-center shadow-lg hover:-translate-y-1">
                    View Templates
                  </button>
                </a>
              </div>
            </div>

            {/* Hero Image / Preview (Glass Card) */}
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-md lg:max-w-none perspective-1000 mt-4 sm:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 overflow-hidden transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500"
              >
                <div className="bg-white/20 border-b border-white/20 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="ml-2 sm:ml-4 h-3 sm:h-4 rounded bg-white/30 w-1/3"></div>
                </div>
                <div className="p-3 sm:p-4 origin-top bg-white/5 relative aspect-21/29.7">
                  <div className="scale-[0.85] origin-top-left w-[118%] h-[118%] pointer-events-none rounded-xl shadow-lg border border-slate-200 bg-slate-800 overflow-hidden relative">
                    <AnimatedResumeDetails />
                  </div>
                </div>
              </motion.div>
              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-indigo-300/30 to-cyan-300/30 rounded-full blur-3xl opacity-60 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placeholder After Hero */}
      <div
        className="w-full bg-slate-50 border-b border-slate-200/60 py-6"
        aria-label="Top Advertisement"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot position="hero" />
        </div>
      </div>

      {/* 3. TRUST BADGES SECTION */}
      <section className="py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
            {[
              { icon: Zap, label: "Free Resume Builder" },
              { icon: Shield, label: "ATS Friendly" },
              { icon: Download, label: "Instant Download" },
              { icon: Clock, label: "No Signup Required" },
              { icon: Layout, label: "Professional Templates" },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white pl-3 pr-5 py-3 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/80 hover:shadow-[0_8px_30px_rgba(79,70,229,0.1)] hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1 cursor-default group"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                  <badge.icon className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-bold text-slate-700 tracking-tight">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
              Create Your Resume in 3 Easy Steps
            </h2>
            <p className="text-base sm:text-lg text-slate-500 px-2 leading-relaxed">
              Building a professional resume has never been this simple. Follow
              these steps to get hired faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-indigo-100 -z-10"></div>

            {[
              {
                step: "01",
                title: "Enter Your Details",
                icon: FileText,
                desc: "Fill in your personal info, experience, and education using our easy forms.",
              },
              {
                step: "02",
                title: "Choose Template",
                icon: Layout,
                desc: "Select from our collection of ATS-friendly and professional resume templates.",
              },
              {
                step: "03",
                title: "Download Resume",
                icon: Download,
                desc: "Get an instant PDF download, ready to be sent to recruiters right away.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center relative group bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full border border-indigo-100 shadow-md flex items-center justify-center mb-6 relative z-10 group-hover:scale-105 group-hover:border-indigo-200 transition-all duration-300">
                  <s.icon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {s.step}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 sm:mb-3">
                  {s.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-500 px-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEMPLATES PREVIEW */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-100" id="templates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
            Professional Resume Templates
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-10 sm:mb-16 px-2 leading-relaxed">
            Choose from ATS-friendly resume templates designed by HR experts to
            land you the job.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {templates.map((template, idx) => {
              const details = {
                classic: {
                  title: "Software Engineer",
                  desc: "Classic format preferred by tech recruiters.",
                },
                modern: {
                  title: "Product Manager",
                  desc: "Sleek and bold dark-mode headers.",
                },
                minimalist: {
                  title: "Creative Director",
                  desc: "Clean layout with maximum whitespace.",
                },
                executive: {
                  title: "Operations Executive",
                  desc: "Authoritative branding and structure.",
                },
                creative: {
                  title: "UX/UI Designer",
                  desc: "Vibrant accent colors and portfolios.",
                },
              }[template];

              return (
                <div
                  key={idx}
                  className={`relative group bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(79,70,229,0.12)] hover:border-indigo-200 transition-all duration-500 hover:-translate-y-2 max-w-[280px] sm:max-w-none mx-auto w-full ${idx > 2 ? "lg:col-span-1.5" : ""}`}
                >
                  <div className="w-full aspect-[0.85] bg-slate-100 rounded-3xl mb-8 relative border border-slate-200 shadow-inner overflow-hidden group-hover/card:shadow-lg transition-all group/preview">
                    <div
                      className="w-full h-[500px] transform scale-[0.55] sm:scale-[0.55] md:scale-[0.5] xl:scale-[0.55] origin-top-left absolute top-0 left-0 transition-transform duration-[2s] ease-in-out group-hover/preview:-translate-y-[2%]"
                      style={{ width: "181%" }}
                    >
                      <RealisticTemplatePreview template={template} />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px] z-10 pointer-events-none group-hover:pointer-events-auto">
                      <Link to="/editor" className="w-4/5">
                        <button className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl shadow-[0_10px_25px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(79,70,229,0.4)]">
                          Use Template <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 capitalize">
                        {details?.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 font-medium">
                        {details?.desc}
                      </p>
                    </div>
                    <div className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">
                      Free
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-14 text-center px-4">
            <Link
              to="/templates"
              className="block sm:inline-block w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 text-indigo-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                View All Templates
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. ADVERTISEMENT PLACEMENT SECTION */}
      <section
        className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200"
        aria-label="Advertisement"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot position="templates" />
        </div>
      </section>

      {/* 7. FEATURES SECTION (Glassmorphism) */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden">
        {/* Soft radial background for glass contrast */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-50 rounded-full blur-[100px] -z-10 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-50 rounded-full blur-[100px] -z-10 opacity-70"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
              Powerful Resume Builder Features
            </h2>
            <p className="text-base sm:text-lg text-slate-500 px-2 leading-relaxed">
              Everything you need to create a winning resume, completely free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                t: "ATS Friendly Templates",
                d: "Designed to pass through applicant tracking systems directly to HR.",
                i: Shield,
              },
              {
                t: "Easy Resume Builder",
                d: "A simple, intuitive interface that lets you build your resume without hassle.",
                i: Layout,
              },
              {
                t: "Instant Download",
                d: "No paywalls at the end. Download your resume as a PDF instantly.",
                i: Download,
              },
              {
                t: "Professional Templates",
                d: "Stand out with templates approved by professional recruiters.",
                i: FileText,
              },
              {
                t: "Mobile Friendly",
                d: "Build and edit your resume anywhere, directly from your mobile device.",
                i: MonitorSmartphone,
              },
              {
                t: "Free to Use",
                d: "No hidden charges. A completely free resume builder for job seekers.",
                i: Zap,
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg shadow-indigo-900/5 border border-white hover:border-indigo-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-indigo-600 transition-colors">
                  <f.i className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 sm:mb-3">
                  {f.t}
                </h3>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE CAREERLEAF (Gradient soft) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-linear-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 text-slate-900 leading-tight tracking-tight">
                Why Choose CareerLeaf
                <br className="hidden sm:block" />
                Over Others?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Most resume builders promise a free service but hit you with a
                paywall right before you download. CareerLeaf is genuinely free,
                providing professional-grade tools to everyone.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {[
                  "Free Resume Builder",
                  "Professional Templates",
                  "Fast Download",
                  "ATS Friendly",
                ].map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-slate-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-10 sm:mt-12">
                <Link to="/editor" className="block w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-1 text-center justify-center flex text-sm sm:text-base">
                    Try it Now
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl shadow-indigo-900/5 border border-slate-100 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Shield className="w-24 h-24 text-indigo-900" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-6 text-slate-900 border-b border-slate-100 pb-4 relative z-10">
                CareerLeaf vs Others
              </h3>
              <div className="space-y-4 sm:space-y-5 relative z-10">
                {[
                  { label: "Cost", us: "Free Forever", them: "$15-$30 / mo" },
                  {
                    label: "Downloads",
                    us: "Unlimited PDFs",
                    them: "Text only / Paywall",
                  },
                  {
                    label: "Templates",
                    us: "Premium Unlocked",
                    them: "Mostly Locked",
                  },
                  {
                    label: "Signup Info",
                    us: "Not Needed",
                    them: "Credit Card Req.",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap sm:flex-nowrap items-center justify-between py-2 sm:py-3 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-slate-500 font-medium w-2/5 sm:w-1/3 text-sm">
                      {row.label}
                    </span>
                    <span className="font-extrabold text-emerald-600 w-3/5 sm:w-1/3 text-right sm:text-center text-sm bg-emerald-50 py-1 rounded-md px-2">
                      {row.us}
                    </span>
                    <span className="text-slate-400 w-full sm:w-1/3 text-right text-xs sm:text-sm hidden sm:block font-medium">
                      {row.them}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. RESUME EXAMPLES SECTION */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white" id="examples">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
              Resume Examples
            </h2>
            <p className="text-base sm:text-lg text-slate-500 px-2 leading-relaxed">
              Get inspired by resumes built with our tool for different career
              paths.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              "Fresher Resume",
              "Developer Resume",
              "Designer Resume",
              "Marketing Resume",
            ].map((job, idx) => (
              <div key={idx} className="group flex flex-col">
                <div className="bg-linear-to-b from-white to-slate-50 p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 aspect-3/4 mb-5 relative overflow-hidden group-hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)] group-hover:ring-cyan-200 transition-all duration-500 group-hover:-translate-y-2">
                  {/* Abstract Resume Design Placeholder */}
                  <div className="w-full h-full bg-white shadow-[0_2px_15px_rgba(0,0,0,0.06)] rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-slate-50 relative top-2 group-hover:top-0 transition-all duration-500 pointer-events-none">
                    <div className="h-3 sm:h-4 bg-linear-to-r from-indigo-100 to-slate-100 w-2/3 rounded-full mb-5"></div>
                    <div className="space-y-3 flex-1 border-t border-slate-50 pt-4">
                      <div className="h-2 bg-slate-100 w-full rounded-full"></div>
                      <div className="h-2 bg-slate-100 w-5/6 rounded-full"></div>
                      <div className="h-2 bg-slate-100 w-4/6 rounded-full"></div>
                      <div className="h-6"></div>
                      <div className="h-2 bg-slate-100 w-full rounded-full"></div>
                      <div className="h-2 bg-slate-100 w-3/4 rounded-full"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/60 transition-all duration-300 flex items-center justify-center backdrop-blur-none group-hover:backdrop-blur-sm cursor-pointer border-2 border-transparent group-hover:border-cyan-400/50 rounded-3xl z-10 box-border">
                    <button className="text-white font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base border border-white/50 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      View Example <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-extrabold text-slate-800 text-center group-hover:text-cyan-600 transition-colors tracking-tight">
                  {job}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
            What Users Say
          </h2>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-10 sm:mb-16 px-2 leading-relaxed">
            Join thousands of job seekers who landed interviews with our resume
            maker.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {[
              {
                name: "Sarah M.",
                role: "Marketing Manager",
                text: "I was struggling to format my resume in Word. CareerLeaf made it so simple. I used the modern template and got 3 interviews in a week!",
              },
              {
                name: "James D.",
                role: "Software Developer",
                text: "Finally, a resume builder that is actually free. No credit card prompts, just an instant PDF download. The ATS-friendly layout is perfect.",
              },
              {
                name: "Emily R.",
                role: "Recent Graduate",
                text: "As a fresher, I didn't know how to structure my resume. The examples and easy steps helped me create a professional CV in 15 minutes.",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg shadow-indigo-900/5 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4 text-emerald-500">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 italic mb-6 sm:mb-8 leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-base sm:text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {t.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-8 sm:mb-12 text-center tracking-tight leading-snug">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-indigo-200 transition-colors bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 bg-slate-50 border-t border-slate-100 ${openFaq === idx ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="p-5 sm:p-6 text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. SEO CONTENT SECTION */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-500 prose prose-slate">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            The Best Free Resume Builder Online
          </h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            CareerLeaf is a <strong>free resume builder</strong> designed to
            help job seekers create professional, impressive resumes in minutes.
            With our tool, you don't need to waste time fighting with word
            processors or formatting issues. Simply enter your information into
            our intuitive form, choose an <strong>ATS-friendly template</strong>
            , and instantly download your resume as a perfect PDF.
          </p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            In today's competitive job market, an employer spends only seconds
            scanning your application. Our <strong>resume maker</strong>{" "}
            utilizes proven layouts to ensure that your skills, experience, and
            education are highlighted effectively. Whether you are creating a{" "}
            <strong>fresher resume</strong> or an executive CV, CareerLeaf
            provides the best formatting to enhance your employability without
            hidden paywalls.
          </p>
          <p className="text-sm sm:text-base leading-relaxed font-medium">
            Start using our free online builder today to generate a compelling
            narrative of your career history. We take pride in offering
            high-quality, professional resume templates completely free of
            charge. Your career progression shouldn't cost you a subscription
            fee. Create your resume now and take the next step toward your dream
            job!
          </p>
        </div>
      </section>

      {/* 13. CTA SECTION */}
      <section className="py-16 sm:py-24 bg-linear-to-r from-indigo-600 to-emerald-500 text-center px-4 relative overflow-hidden">
        {/* Subtle geometric background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-sm tracking-tight">
            Start Building Your Resume Now
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 font-medium px-2 drop-shadow-sm">
            Join the thousands of successful candidates who used CareerLeaf to
            get hired.
          </p>
          <Link to="/editor" className="block w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-indigo-600 font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-3 mx-auto">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 hidden sm:block text-indigo-500" />{" "}
              Create Resume - It's Free
            </button>
          </Link>
        </div>
      </section>

      {/* Ad Placeholder Before Footer */}
      <div
        className="w-full bg-slate-900 border-t border-slate-800 pt-6 sm:pt-8 relative z-20"
        aria-label="Bottom Advertisement"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot
            position="footer"
            className="bg-slate-800/80 border-slate-700 text-slate-400"
          />
        </div>
      </div>

      {/* 14. FOOTER */}
      <footer
        className="bg-slate-900 text-slate-400 py-12 sm:py-16 border-t border-slate-800"
        aria-label="Site Footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10 sm:mb-16">
            {/* Column 1 */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2 mb-4 sm:mb-6 group inline-flex"
              >
                <img
                  src="/logo.png"
                  alt="CareerLeaf"
                  className="h-10 w-auto object-contain bg-white rounded-lg px-2 py-1 shadow-sm"
                />
              </Link>
              <p className="text-sm mb-2 text-slate-400 bg-slate-800/50 p-4 rounded-xl border border-slate-800 leading-relaxed font-medium">
                The simplest free online resume builder and CV maker designed
                for modern professionals.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
                Resume
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-sm font-medium">
                <li>
                  <Link
                    to="/editor"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Resume Builder
                  </Link>
                </li>
                <li>
                  <Link
                    to="/templates"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Templates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/examples"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Examples
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-sm font-medium">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-600/20 hover:text-emerald-400 flex items-center justify-center text-slate-400 transition-all shadow-sm"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-600/20 hover:text-indigo-400 flex items-center justify-center text-slate-400 transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-slate-800 text-center text-xs sm:text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} CareerLeaf.app. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
