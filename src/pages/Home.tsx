import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Upload, Download, Sparkles, CheckCircle, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: 'Import Existing Resume',
      description: 'Upload your PDF and let our AI extract all your information automatically.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: '5+ Premium Templates',
      description: 'Choose from professionally designed templates that get you noticed.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Download,
      title: 'Export to PDF',
      description: 'Download your polished resume as a perfectly formatted PDF document.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const templates = ['Classic', 'Modern', 'Minimalist', 'Executive', 'Creative'];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden pt-16">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-blue-900 to-purple-900" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float delay-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-pattern-grid opacity-20" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">Build your perfect resume in minutes</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight"
          >
            Create Stunning Resumes
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
              That Land Jobs
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Stand out from the crowd with professionally designed templates.
            Import your existing resume or start fresh – it's never been easier.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/editor">
              <button className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 overflow-hidden">
                <span className="relative z-10">Create My Resume</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>

            <Link to="/login">
              <button className="btn-secondary flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-black">Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-black">No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-black">PDF export</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-50 to-transparent" />
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-24 px-6 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you create the perfect resume in minutes
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEMPLATES SECTION ===== */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professional Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of beautifully designed templates
            </p>
          </div>

          {/* Template Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {templates.map((template, index) => (
              <motion.div
                key={template}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="px-6 py-3 bg-gray-100 hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 rounded-full font-semibold text-gray-700 hover:text-white transition-all duration-300 cursor-default flex items-center gap-2">
                  <Star className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {template}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/editor">
              <button className="btn-primary text-lg">
                Try All Templates Free
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 px-6 bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-pattern-dots opacity-10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Build Your Future?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 mb-10"
          >
            Join thousands of professionals who have already created stunning resumes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/editor">
              <button className="group px-10 py-5 bg-white text-gray-900 text-lg font-bold rounded-xl shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">Resume<span className="text-blue-400">Builder</span></span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ResumeBuilder. Designed & developed with ❤️ by Satyam Singh.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;