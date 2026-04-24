import { motion } from 'framer-motion';
import { AlertTriangle, Info, ExternalLink, Bot, Shield, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SEO
          title="Disclaimer | CareerLeaf"
          description="Read CareerLeaf's disclaimer regarding the use of our free resume builder, AI-generated content, third-party links, and advertising."
          path="/disclaimer"
        />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 font-bold text-xs uppercase tracking-widest mb-6">
            <AlertTriangle className="w-3.5 h-3.5" />
            Legal Notice
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">Disclaimer</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
            Please read this disclaimer carefully before using CareerLeaf.app. By accessing and using our platform, you acknowledge and agree to the terms outlined below.
          </p>
          <div className="mt-6 text-slate-400 font-bold text-sm tracking-widest uppercase">
            Last Updated: April 20, 2026
          </div>
        </motion.div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Info className="w-6 h-6 text-blue-500" />,
              title: "General Information",
              desc: "The content on CareerLeaf is provided for general informational and educational purposes only."
            },
            {
              icon: <Bot className="w-6 h-6 text-indigo-500" />,
              title: "AI-Assisted Content",
              desc: "Some features use artificial intelligence. AI-generated suggestions should always be reviewed by you."
            },
            {
              icon: <Shield className="w-6 h-6 text-emerald-500" />,
              title: "No Guarantees",
              desc: "Using CareerLeaf does not guarantee employment, interviews, or any specific career outcomes."
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/50 rounded-full blur-3xl -z-10 translate-x-32 -translate-y-32" />

          <div className="prose prose-slate max-w-none
            prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-ul:list-disc prose-li:text-slate-600 prose-li:font-medium
          ">

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">1</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">General Information Disclaimer</h2>
              </div>
              <p>
                The information provided on CareerLeaf.app (the "Website") is for <strong>general informational and educational purposes only</strong>. All content, including resume templates, career guides, blog articles, and resume examples, is provided in good faith. However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.
              </p>
              <p>
                Under no circumstance shall CareerLeaf have any liability to you for any loss or damage of any kind incurred as a result of the use of the Website or reliance on any information provided on the Website. Your use of the Website and your reliance on any information on the Website is solely at your own risk.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">2</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">No Employment Guarantee</h2>
              </div>
              <p>
                CareerLeaf is a <strong>resume creation tool</strong>. While our templates are designed to be professional and ATS-friendly, we do not guarantee that using our service will result in job interviews, job offers, or any specific career outcomes. The success of your job application depends on numerous factors beyond the scope of our service, including but not limited to:
              </p>
              <ul>
                <li>The accuracy and relevance of the information you provide in your resume.</li>
                <li>The specific requirements and preferences of individual employers and recruiters.</li>
                <li>Current job market conditions in your industry and geographic location.</li>
                <li>Your qualifications, experience, and skills relative to other candidates.</li>
                <li>The specific Applicant Tracking System (ATS) software used by the employer.</li>
              </ul>
              <p>
                We encourage all users to complement their resume with thorough interview preparation, professional networking, and tailored cover letters for each application.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">3</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">AI-Generated Content Disclaimer</h2>
              </div>
              <p>
                Certain features of CareerLeaf utilize <strong>artificial intelligence (AI) technology</strong>, including Google Gemini, to assist with resume content suggestions, parsing, and optimization. Please be aware of the following:
              </p>
              <ul>
                <li><strong>AI suggestions are advisory only.</strong> You are solely responsible for reviewing, editing, and approving all AI-generated content before including it in your resume.</li>
                <li><strong>AI is not infallible.</strong> AI-generated text may contain inaccuracies, generalizations, or content that does not accurately represent your professional experience. Always verify the factual accuracy of any AI-assisted content.</li>
                <li><strong>Your data during AI processing</strong> is handled in accordance with our <a href="/privacy-policy">Privacy Policy</a>. We do not use your personal resume data to train public AI models.</li>
                <li><strong>You retain full ownership</strong> of the content you create, including any AI-assisted text that you choose to use.</li>
              </ul>
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4 my-6">
                <div className="bg-amber-100 p-2 rounded-lg h-fit">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-bold text-amber-900">Important</div>
                  <p className="text-xs text-amber-800 m-0">Never include false, misleading, or fabricated information in your resume, regardless of whether the content was AI-generated or manually written. Misrepresentation on a resume can have serious professional and legal consequences.</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">4</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">External Links Disclaimer</h2>
              </div>
              <p>
                The Website may contain links to external websites and resources that are not provided or maintained by, or in any way affiliated with, CareerLeaf. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>
              <p>
                The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them. CareerLeaf has no control over the nature, content, and availability of third-party sites. We encourage users to read the privacy policies and terms of service of any external website they visit.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">5</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">Advertising Disclosure</h2>
              </div>
              <p>
                CareerLeaf is a <strong>free service</strong> supported in part by advertising revenue. We use Google AdSense and may use other advertising networks to display advertisements on our Website. These advertisements help us keep our resume building tools free for all users.
              </p>
              <p>
                Please be aware of the following regarding advertisements on our site:
              </p>
              <ul>
                <li><strong>Third-party ads:</strong> Advertisements displayed on our Website are served by third-party advertising networks. These networks may use cookies and similar technologies to serve ads based on your prior visits to our Website or other websites on the internet.</li>
                <li><strong>No endorsement:</strong> The display of any advertisement on CareerLeaf does not constitute an endorsement of the advertised product, service, or company. We do not control the content of third-party advertisements.</li>
                <li><strong>Ad personalization:</strong> You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>.</li>
              </ul>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">6</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">Professional Advice Disclaimer</h2>
              </div>
              <p>
                The career advice, resume writing tips, and blog articles published on CareerLeaf are provided for <strong>educational and informational purposes</strong>. This content does not constitute professional career counseling, legal advice, or employment consulting services.
              </p>
              <p>
                If you require specific professional advice regarding your career, employment law, or any other specialized area, we recommend consulting with a qualified professional who can assess your individual circumstances.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">7</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">Content Accuracy</h2>
              </div>
              <p>
                While we strive to keep the information on CareerLeaf accurate and up-to-date, we make no guarantees about the completeness, reliability, or accuracy of this information. Resume best practices, ATS requirements, and hiring trends evolve over time. We recommend cross-referencing our advice with multiple reputable sources when making important career decisions.
              </p>
              <p>
                Any action you take upon the information found on this Website is strictly at your own risk. CareerLeaf will not be liable for any losses, damages, or consequences arising from your use of the information provided.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">8</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">Changes to This Disclaimer</h2>
              </div>
              <p>
                CareerLeaf reserves the right to update or modify this Disclaimer at any time without prior notice. We encourage you to review this page periodically for any changes. Your continued use of the Website after any modifications to this Disclaimer constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-200">9</div>
                <h2 className="text-2xl m-0 uppercase tracking-tighter">Contact Us</h2>
              </div>
              <p>
                If you have any questions or concerns about this Disclaimer, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <a href="mailto:support@careerleaf.app" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-slate-50 transition-all no-underline font-bold text-slate-800">
                  <Mail className="w-5 h-5 text-amber-600" /> support@careerleaf.app
                </a>
                <a href="/contact" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-slate-50 transition-all no-underline font-bold text-slate-800">
                  <ExternalLink className="w-5 h-5 text-amber-600" /> Contact Support Page
                </a>
              </div>
            </section>

          </div>
        </motion.div>

        {/* Closing message */}
        <div className="mt-12 text-center text-slate-400 text-sm font-medium">
          CareerLeaf.app &copy; {new Date().getFullYear()}. This disclaimer was last updated on April 20, 2026.
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
