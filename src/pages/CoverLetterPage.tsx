import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertCircle, Lightbulb, ArrowRight, PenTool, Target, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const CoverLetterPage = () => {
  const tips = [
    {
      icon: Target,
      title: "Tailor Every Letter",
      desc: "Customize each cover letter for the specific job you're applying to. Reference the company name, job title, and key requirements directly."
    },
    {
      icon: PenTool,
      title: "Open With Impact",
      desc: "Skip generic openings like 'I am writing to apply.' Instead, lead with a compelling accomplishment or a genuine reason you're excited about the role."
    },
    {
      icon: CheckCircle,
      title: "Show, Don't Tell",
      desc: "Back up your claims with quantifiable achievements. Instead of 'I'm a great communicator,' say 'I led weekly cross-functional standups with 25+ stakeholders.'"
    },
    {
      icon: Lightbulb,
      title: "Research the Company",
      desc: "Mention recent company news, products, or values that resonate with you. This demonstrates genuine interest and initiative."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000000_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SEO
          title="Cover Letter Guide: How to Write a Cover Letter in 2026 | CareerLeaf"
          description="Learn how to write a compelling cover letter that complements your resume. Step-by-step guide with examples, tips, and a free cover letter template."
          path="/cover-letter"
        />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6">
            <FileText className="w-3.5 h-3.5" />
            Complete Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            How to Write a <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">Cover Letter</span> That Gets Interviews
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
            A well-crafted cover letter is your opportunity to stand out from hundreds of applicants. Learn how to write one that complements your resume and compels hiring managers to call you.
          </p>
        </motion.div>

        {/* What is a Cover Letter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">What Is a Cover Letter and Why Does It Matter?</h2>
            <div className="space-y-5 text-slate-600 font-medium leading-relaxed">
              <p>
                A <strong>cover letter</strong> is a one-page document that accompanies your resume when you apply for a job. While your resume provides a structured overview of your work history, skills, and education, a cover letter gives you the space to tell the story behind those bullet points — why you're interested in this specific role, what motivates you, and how your unique background makes you the ideal candidate.
              </p>
              <p>
                Despite the rise of online applications and one-click apply buttons, cover letters remain a critical part of the hiring process. According to multiple hiring surveys conducted in 2025, over <strong>65% of hiring managers</strong> still read cover letters, especially for mid-level and senior roles. In competitive industries like finance, consulting, marketing, and healthcare, a cover letter can be the deciding factor between an interview and a rejection email.
              </p>
              <p>
                Think of it this way: your resume answers "what have you done?" while your cover letter answers "why should we care?" It bridges the gap between your qualifications and the employer's specific needs, demonstrating not just competence but enthusiasm and cultural fit.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cover Letter vs Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Cover Letter vs. Resume: Key Differences</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900 uppercase tracking-wider text-xs">Aspect</th>
                  <th className="text-left py-4 px-4 font-bold text-indigo-600 uppercase tracking-wider text-xs">Cover Letter</th>
                  <th className="text-left py-4 px-4 font-bold text-cyan-600 uppercase tracking-wider text-xs">Resume</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 font-medium">
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-800">Purpose</td>
                  <td className="py-3 px-4">Explains <em>why</em> you're a great fit</td>
                  <td className="py-3 px-4">Lists <em>what</em> you've accomplished</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-800">Tone</td>
                  <td className="py-3 px-4">Conversational, narrative</td>
                  <td className="py-3 px-4">Formal, structured</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-800">Format</td>
                  <td className="py-3 px-4">Paragraphs with flowing text</td>
                  <td className="py-3 px-4">Bullet points and sections</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-800">Length</td>
                  <td className="py-3 px-4">3–4 paragraphs (one page)</td>
                  <td className="py-3 px-4">1–2 pages</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-slate-800">Customization</td>
                  <td className="py-3 px-4">Must be tailored per application</td>
                  <td className="py-3 px-4">Can be slightly adapted</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-800">Personality</td>
                  <td className="py-3 px-4">Shows motivation and cultural fit</td>
                  <td className="py-3 px-4">Demonstrates skills and experience</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Step by Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">How to Write a Cover Letter: Step-by-Step</h2>
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Research the Company and Role",
                content: "Before writing a single word, spend 15–20 minutes researching the company. Visit their website, read their 'About' page, check recent news, and review the job description carefully. Note the key skills, values, and qualifications they emphasize. This research forms the foundation of a tailored, compelling cover letter that resonates with the hiring manager."
              },
              {
                step: "2",
                title: "Write a Compelling Opening Paragraph",
                content: "Your opening paragraph needs to grab attention immediately. State the specific position you're applying for, mention how you discovered the opportunity, and include one powerful sentence about why you're excited or uniquely qualified. Avoid generic openings — instead of 'I am writing to express my interest,' try something like 'When I saw your listing for a Senior Product Manager, I knew my 5 years of experience scaling B2B SaaS platforms from $1M to $15M ARR made this a perfect fit.'"
              },
              {
                step: "3",
                title: "Showcase Your Relevant Achievements (Body Paragraphs)",
                content: "The body of your cover letter (1–2 paragraphs) is where you connect your experience to the job requirements. Pick 2–3 of your strongest achievements that directly relate to what the employer is looking for. Use specific numbers, percentages, and outcomes whenever possible. Don't simply repeat your resume — instead, provide context and tell the story behind your accomplishments. Explain the challenge you faced, the action you took, and the result you achieved."
              },
              {
                step: "4",
                title: "Demonstrate Cultural Fit",
                content: "Employers don't just hire skills — they hire people who will thrive in their environment. Reference the company's mission, values, or a recent initiative that aligns with your own professional philosophy. This shows genuine interest and signals that you've done your homework beyond a surface-level glance at the job listing."
              },
              {
                step: "5",
                title: "Close With a Strong Call to Action",
                content: "Your closing paragraph should reiterate your enthusiasm for the role and include a clear call to action. Express your eagerness to discuss how your background aligns with the team's goals. Provide your phone number and email for easy follow-up. End with a professional sign-off like 'Sincerely' or 'Best regards,' followed by your full name."
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 transition-colors">
                <tip.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{tip.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Common Mistakes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Common Cover Letter Mistakes to Avoid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { mistake: "Using a Generic Template", fix: "Customize every letter for each specific job. Hiring managers can spot mass-sent letters instantly." },
              { mistake: "Repeating Your Resume", fix: "Your cover letter should complement, not duplicate, your resume. Add context and personality." },
              { mistake: "Writing Too Much", fix: "Keep it to one page (3–4 paragraphs). Hiring managers spend less than 60 seconds on initial review." },
              { mistake: "Forgetting to Proofread", fix: "Typos and grammar errors signal carelessness. Read it aloud, use a tool like Grammarly, or ask a friend." },
              { mistake: "Being Too Humble or Too Boastful", fix: "Strike a balance — be confident about your achievements while remaining authentic and professional." },
              { mistake: "Ignoring the Job Description", fix: "Mirror the language and keywords from the job posting. This helps with both human readers and ATS software." }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="font-bold text-slate-900 text-sm">{item.mistake}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed ml-6">{item.fix}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SEO Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="max-w-4xl mx-auto text-slate-500 prose prose-slate mb-10"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
            Why Your Resume Needs a Cover Letter in 2026
          </h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            In the age of automated hiring and one-click applications, many job seekers question whether a <strong>cover letter</strong> is still necessary. The answer is a definitive yes — especially for roles that receive hundreds of applications. While Applicant Tracking Systems (ATS) filter resumes by keywords and formatting, the cover letter is the document that hiring managers read when they want to understand the person behind the qualifications.
          </p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            A great cover letter achieves three things simultaneously: it demonstrates your understanding of the company and role, it highlights the most relevant parts of your experience with context that a <strong>resume</strong> alone cannot provide, and it showcases your communication skills in a professional setting. For career changers, entry-level candidates, and those with employment gaps, a cover letter is particularly powerful — it provides the narrative space to address potential concerns proactively.
          </p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium">
            When paired with a <strong>professionally designed resume</strong> built using tools like CareerLeaf, a well-written cover letter creates a cohesive application package that positions you as a serious, prepared candidate. Our <strong>ATS-friendly resume templates</strong> ensure your resume passes automated filters, while your cover letter makes the human connection that leads to interview calls.
          </p>
          <p className="text-sm sm:text-base leading-relaxed font-medium">
            Ready to build the perfect resume to accompany your cover letter? Use our <strong>free resume builder</strong> to create a polished, professional resume in minutes — no signup required. Choose from modern templates, enter your details, and download a job-ready PDF instantly.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none" />

          <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Start With a Great Resume</h2>
          <p className="text-indigo-200 font-medium mb-8 max-w-xl mx-auto">
            Before writing your cover letter, make sure your resume is polished and professional. Build yours free with CareerLeaf.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/editor">
              <button className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-600 to-cyan-500 text-white text-lg font-bold rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.4)] active:scale-95 transition-all duration-300 flex items-center gap-2">
                Build Your Resume <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/templates">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/30 font-semibold rounded-xl backdrop-blur-md hover:bg-white/20 transition-all duration-300">
                Browse Templates
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoverLetterPage;
