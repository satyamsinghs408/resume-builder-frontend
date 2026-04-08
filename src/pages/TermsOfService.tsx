import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#000000_1px,_transparent_1px)] bg-[length:24px_24px] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-slate-500 font-medium text-lg">Last Updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-500"
        >
          <h2 className="text-2xl mt-0">1. Acceptance of Terms</h2>
          <p>
            By accessing and using CareerLeaf.app ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl">2. Description of Service</h2>
          <p>
            CareerLeaf provides an online resume builder tool that allows users to create, edit, and download professional resumes. We reserve the right to modify, suspend or discontinue the service at any time.
          </p>

          <h2 className="text-2xl">3. User Conduct</h2>
          <p>
            You agree to use our services only for lawful purposes. You represent that all information you provide is accurate and truthful. You must not use our service to generate fraudulent documentation.
          </p>

          <h2 className="text-2xl">4. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the exclusive property of CareerLeaf and its licensors. Standard templates provided by our service may be used for your personal career advancement but may not be resold or repackaged.
          </p>

          <h2 className="text-2xl">5. Account Registration</h2>
          <p>
            You may be required to register with the site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate.
          </p>

          <h2 className="text-2xl">6. Limitation of Liability</h2>
          <p>
            In no event shall CareerLeaf, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2 className="text-2xl">7. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@careerleaf.app.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
