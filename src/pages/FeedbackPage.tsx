import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, ThumbsUp, AlertCircle, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import axios from 'axios';
import { useApi } from '../context/ApiContext';

const FeedbackPage = () => {
  const { endpoints } = useApi();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await axios.post(endpoints.feedback, formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', type: 'general', message: '' });
      
      // Reset success message after 10 seconds
      setTimeout(() => setIsSuccess(false), 10000);
    } catch (err: any) {
      console.error('Feedback submission error:', err);
      setError(err.response?.data?.message || 'Failed to send feedback. Please try again later.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16 font-sans">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000000_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SEO
          title="Share Your Feedback | CareerLeaf"
          description="Help us improve CareerLeaf by sharing your thoughts, reporting bugs, or requesting new features. Your feedback shapes our product."
          path="/feedback"
        />
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs border border-indigo-200">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            We'd Love Your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">Feedback</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Help us improve CareerLeaf by sharing your thoughts, reporting bugs, or requesting new features.
          </p>
        </motion.div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50 border border-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none" />

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
                <ThumbsUp className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Thank you for your feedback!</h2>
              <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">
                We've received your message and will use it to make CareerLeaf even better.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-8 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Submit another response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 font-medium text-slate-700">
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 font-bold animate-shake">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Rivera"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Feedback Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className={`
                    flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${formData.type === 'general' ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'}
                  `}>
                    <input type="radio" name="type" value="general" checked={formData.type === 'general'} onChange={handleChange} className="sr-only" />
                    <MessageSquare className={`w-6 h-6 mb-2 ${formData.type === 'general' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className={`text-sm font-bold ${formData.type === 'general' ? 'text-indigo-800' : 'text-slate-600'}`}>General</span>
                  </label>
                  
                  <label className={`
                    flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${formData.type === 'feature' ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'}
                  `}>
                    <input type="radio" name="type" value="feature" checked={formData.type === 'feature'} onChange={handleChange} className="sr-only" />
                    <Lightbulb className={`w-6 h-6 mb-2 ${formData.type === 'feature' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className={`text-sm font-bold ${formData.type === 'feature' ? 'text-indigo-800' : 'text-slate-600'}`}>New Feature</span>
                  </label>

                  <label className={`
                    flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${formData.type === 'bug' ? 'border-red-500 bg-red-50 shadow-sm' : 'border-slate-200 bg-white hover:border-red-300 hover:bg-slate-50'}
                  `}>
                    <input type="radio" name="type" value="bug" checked={formData.type === 'bug'} onChange={handleChange} className="sr-only" />
                    <AlertCircle className={`w-6 h-6 mb-2 ${formData.type === 'bug' ? 'text-red-500' : 'text-slate-400'}`} />
                    <span className={`text-sm font-bold ${formData.type === 'bug' ? 'text-red-700' : 'text-slate-600'}`}>Report Bug</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us what you love, what's broken, or what could be better..."
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-lg font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default FeedbackPage;
