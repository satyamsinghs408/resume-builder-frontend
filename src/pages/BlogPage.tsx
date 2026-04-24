import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Lightbulb, Target, FileText, Shield, Briefcase, GraduationCap, TrendingUp, Users, CheckCircle, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const BlogPage = () => {
  const guides = [
    {
      icon: FileText,
      title: "How to Write a Resume in 2026",
      content: "Writing a great resume starts with choosing the right format. For most professionals, the reverse-chronological format works best — listing your most recent experience first. Start with a compelling professional summary that highlights your key achievements, then organize your experience with quantifiable bullet points. Use action verbs like 'spearheaded,' 'optimized,' and 'delivered' to describe your contributions. Keep your resume to one page if you have less than 10 years of experience, and always tailor it to the specific job description by mirroring their keywords naturally.",
      category: "Resume Writing"
    },
    {
      icon: Shield,
      title: "What Is an ATS and How Does It Work?",
      content: "An Applicant Tracking System (ATS) is software used by over 98% of Fortune 500 companies and 75% of mid-size employers to manage job applications. When you submit your resume online, the ATS parses it into a structured database, extracting your contact information, work history, skills, and education. Recruiters then search this database using keywords from the job description. If your resume doesn't contain those keywords or uses formatting the ATS can't read (like tables, headers/footers, or graphics), your application may never reach human eyes. To beat the ATS, use standard section headings, simple formatting, and relevant keywords from the job posting.",
      category: "ATS Guide"
    },
    {
      icon: Target,
      title: "10 Resume Mistakes That Get You Rejected",
      content: "The most common resume mistakes include: (1) Using a generic objective statement instead of a tailored summary. (2) Listing job duties instead of achievements — say 'Increased sales by 35%' not 'Responsible for sales.' (3) Including irrelevant work experience that doesn't support your target role. (4) Typos and grammatical errors — 77% of hiring managers say these are deal-breakers. (5) Using an unprofessional email address. (6) Missing contact information. (7) Inconsistent formatting and fonts. (8) Making it longer than necessary. (9) Not including keywords from the job description. (10) Using outdated formats like objectives or 'References available upon request.'",
      category: "Tips"
    },
    {
      icon: Lightbulb,
      title: "How to Write a Professional Summary",
      content: "Your professional summary is the first thing recruiters read, so make it count. It should be 2-4 sentences that capture your years of experience, core expertise, and biggest achievement. Formula: [Job Title] with [X years] of experience in [key skill areas]. Proven track record of [biggest measurable achievement]. For example: 'Senior Marketing Manager with 8+ years of experience in digital strategy and brand development. Led campaigns that generated $4.2M in pipeline revenue and grew organic traffic by 180% year-over-year.' Avoid vague phrases like 'hard-working team player' — instead, use specifics that demonstrate your value.",
      category: "Resume Writing"
    },
    {
      icon: Briefcase,
      title: "Best Resume Format: Which One Should You Use?",
      content: "There are three main resume formats: Chronological, Functional, and Combination. The chronological format lists experience from newest to oldest — it's the most popular and ATS-friendly choice, ideal for candidates with steady career progression. The functional format focuses on skills rather than timeline — useful for career changers or those with employment gaps, but many recruiters dislike it because it can hide work history. The combination format blends both, leading with a skills section followed by chronological work history — great for senior professionals. For 90% of job seekers, we recommend the chronological format as it's what both ATS software and hiring managers expect.",
      category: "Resume Writing"
    },
    {
      icon: GraduationCap,
      title: "How to Write a Resume With No Experience",
      content: "Landing your first job without experience feels like a catch-22, but your resume can still be compelling. Focus on transferable skills from internships, volunteer work, academic projects, and extracurricular activities. Lead with an education section highlighting your GPA (if above 3.0), relevant coursework, and academic achievements. Include a skills section with both technical and soft skills relevant to the role. Use any freelance work, personal projects, or certifications to demonstrate initiative. Frame everything in terms of impact: instead of 'Member of debate club,' write 'Led a 15-person debate team to regional finals, improving team ranking by 3 positions.' Everyone starts somewhere — the key is showing potential.",
      category: "Career Guide"
    },
    {
      icon: TrendingUp,
      title: "Resume Trends and What Recruiters Want in 2026",
      content: "Resume trends in 2026 reflect the evolving hiring landscape. Key trends include: Skills-based hiring is growing — more companies evaluate capabilities over degrees, so highlight certifications and practical skills prominently. AI-awareness matters — listing AI tools you use (ChatGPT, Copilot, Midjourney) shows adaptability. Remote work skills are valued — highlight async communication, self-management, and collaboration tools like Slack, Notion, and Jira. Clean, minimal design wins — over-designed resumes with graphics often fail ATS parsing. Quantification is non-negotiable — every bullet point should include numbers where possible. Finally, shorter is better — one-page resumes are preferred even for mid-career professionals.",
      category: "Industry Insights"
    },
    {
      icon: Users,
      title: "How to List Skills on Your Resume Effectively",
      content: "Your skills section should be strategically crafted, not a random list. Divide skills into categories: Technical Skills (programming languages, tools, software) and Professional Skills (project management, leadership, communication). Always prioritize skills mentioned in the job description — ATS systems scan for these exact keywords. Include proficiency levels for languages and technical tools when relevant. Avoid generic skills like 'Microsoft Office' or 'teamwork' unless the job specifically requires them. Instead, be specific: 'Advanced Excel (VLOOKUP, pivot tables, macros)' or 'Cross-functional team leadership (15+ stakeholders).' Aim for 8-12 relevant skills that directly support your target role.",
      category: "Resume Writing"
    },
    {
      icon: Zap,
      title: "How to Make Your Resume ATS-Friendly",
      content: "Making your resume ATS-compatible is essential in modern job searching. Follow these rules: Use standard section headings — 'Work Experience' not 'My Journey.' Avoid tables, columns, text boxes, headers, and footers — ATS parsers often skip these. Save as PDF unless the application specifically requests .docx. Use standard fonts like Arial, Calibri, or Times New Roman. Don't use images or icons for contact information. Include keywords naturally throughout your resume, not just in a skills section. Use conventional date formats (Jan 2023 – Present). Test your resume by copying all text and pasting into a plain text editor — if it reads correctly in order, an ATS can likely parse it too.",
      category: "ATS Guide"
    },
    {
      icon: CheckCircle,
      title: "Action Verbs That Make Your Resume Stand Out",
      content: "Strong action verbs transform bland resume bullets into powerful achievement statements. For leadership roles, use: Spearheaded, Orchestrated, Championed, Directed, Mentored. For technical roles: Engineered, Architected, Debugged, Automated, Deployed. For sales and marketing: Generated, Captured, Accelerated, Converted, Amplified. For operations: Streamlined, Optimized, Consolidated, Reduced, Standardized. For creative roles: Designed, Conceptualized, Produced, Curated, Illustrated. Always pair these verbs with measurable outcomes: 'Spearheaded a migration to cloud infrastructure, reducing hosting costs by 40% and improving uptime to 99.97%.' Avoid passive language like 'Was responsible for' or 'Helped with' — own your accomplishments with confidence.",
      category: "Resume Writing"
    },
    {
      icon: ArrowRight,
      title: "How to Follow Up After Submitting Your Resume",
      content: "Following up after submitting a job application shows initiative and genuine interest, but timing and tone are critical. Wait 5-7 business days after applying before sending a follow-up email. Keep it brief and professional: reference the specific position, restate your interest, and mention one key qualification. For example: 'I recently applied for the Product Manager role and wanted to reiterate my enthusiasm. My 4 years of experience launching B2B SaaS products align closely with your team's goals.' If you haven't heard back after two weeks, one additional follow-up is acceptable. Never follow up more than twice — persistence is valued, but over-contacting signals poor judgment. If you applied through a referral, ask your contact for a status update instead of emailing HR directly.",
      category: "Job Search"
    },
    {
      icon: FileText,
      title: "Resume Length: How Long Should Your Resume Be?",
      content: "The ideal resume length depends on your experience level. For entry-level candidates and professionals with less than 10 years of experience, a one-page resume is the gold standard. Recruiters prefer concise documents that highlight only the most relevant qualifications. For senior professionals, executives, or academics with 10+ years of experience, two pages are acceptable — but every line must earn its place. Never pad your resume with filler content just to reach a page count. If your resume spills onto a second page by just 2-3 lines, tighten your bullet points, reduce margins slightly (no less than 0.5 inches), or cut less relevant experiences. Remember: a focused one-page resume always outperforms a bloated two-page resume in recruiter attention and ATS ranking.",
      category: "Tips"
    },
    {
      icon: Lightbulb,
      title: "How to Explain Employment Gaps on Your Resume",
      content: "Employment gaps are more common and less stigmatized than ever, especially post-pandemic. The key is to address them proactively rather than trying to hide them. If you took time off for caregiving, health, education, or personal reasons, briefly note it in your experience timeline: 'Career Break (2024-2025) — Completed Google Data Analytics Certificate; volunteered as tech mentor for underserved youth.' Focus on what you did during the gap that kept your skills sharp or contributed to your growth. If the gap was due to a layoff, there's no shame in that — simply move on to highlighting your achievements. Never fabricate dates or fake positions to cover gaps, as background checks will catch this. Recruiters care far more about your skills and potential than a 6-month break in your timeline.",
      category: "Career Guide"
    },
    {
      icon: Users,
      title: "LinkedIn Profile vs Resume: Key Differences",
      content: "Your LinkedIn profile and resume serve different purposes and should not be identical. Your resume is a targeted, one-page document tailored to a specific job application. Your LinkedIn profile is a comprehensive professional brand that speaks to a broader audience. On LinkedIn, you can include a longer summary, list all your skills (not just the top 10), add multimedia like presentations and projects, and collect endorsements and recommendations. Your LinkedIn headline should be keyword-rich and describe your value proposition, not just your current job title — for example, 'Full-Stack Developer | React & Node.js | Building Scalable SaaS Products' performs better than 'Software Engineer at XYZ Corp.' Keep both updated, but customize your resume for each application while keeping LinkedIn as your permanent professional presence.",
      category: "Career Guide"
    },
    {
      icon: TrendingUp,
      title: "Remote Job Resume Tips: How to Highlight WFH Skills",
      content: "Remote work has become a permanent fixture of the job market, and employers hiring for remote roles look for specific competencies. On your resume, explicitly mention remote collaboration tools you've used: Slack, Zoom, Microsoft Teams, Notion, Jira, Asana, Confluence, and Figma are all valuable keywords. Highlight skills that demonstrate remote effectiveness: 'self-directed project management,' 'asynchronous communication across 3 time zones,' and 'independently managed a pipeline of 40+ accounts without in-person supervision.' If you've worked remotely before, mention it directly in your job title or description: 'Senior Analyst (Remote)' or 'Managed a fully distributed team of 8 engineers across US and EU time zones.' Quantify your remote productivity — 'Maintained 98% client satisfaction score while working 100% remotely for 2+ years' is compelling proof that you thrive outside a traditional office.",
      category: "Industry Insights"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <SEO
        title="Career Blog - Resume Tips, ATS Guides & Career Advice | CareerLeaf"
        description="Expert resume writing tips, ATS optimization guides, and career advice to help you land your dream job. Free guides from CareerLeaf."
        path="/blog"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Career Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Resume Tips & <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-cyan-500">Career Guides</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
            Expert advice on resume writing, beating ATS systems, and accelerating your career. Written by hiring professionals and career coaches.
          </p>
        </motion.div>

        {/* Guides Grid */}
        <div className="space-y-8 mb-16">
          {guides.map((guide, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 mt-1">
                  <guide.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold rounded-full border border-cyan-100">{guide.category}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">{guide.title}</h2>
                  <p className="text-slate-600 font-medium leading-relaxed">{guide.content}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* SEO Content */}
        <div className="max-w-4xl mx-auto prose prose-slate mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 tracking-tight">Free Resume Writing Resources and Career Advice</h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium text-slate-600">
            Welcome to the CareerLeaf <strong>career blog</strong> — your go-to resource for professional <strong>resume writing tips</strong>, Applicant Tracking System (ATS) optimization strategies, and actionable career advice. Whether you are a recent graduate preparing your first resume, a mid-career professional looking to advance, or an executive refining your personal brand, our guides are designed to give you a competitive edge in today's job market.
          </p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium text-slate-600">
            Every article on this page is written with practical, real-world hiring insights in mind. We draw from current recruitment practices, ATS technology research, and feedback from hundreds of hiring managers across industries including technology, finance, healthcare, marketing, and engineering. Our goal is to bridge the gap between what job seekers think recruiters want and what actually gets candidates hired.
          </p>
          <p className="mb-4 text-sm sm:text-base leading-relaxed font-medium text-slate-600">
            In addition to reading these guides, we encourage you to put the advice into practice using our <strong>free resume builder</strong>. CareerLeaf offers professionally designed, ATS-friendly templates that implement the best practices discussed in these articles — proper formatting, clean section headings, and optimized layouts that ensure your resume passes both automated screening and human review.
          </p>
          <p className="text-sm sm:text-base leading-relaxed font-medium text-slate-600">
            Bookmark this page and check back regularly as we continue to add new guides covering cover letters, interview preparation, salary negotiation, LinkedIn optimization, and more. Your career success starts with the right tools and the right knowledge — and both are free at CareerLeaf.
          </p>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight relative z-10">Ready to Apply These Tips?</h2>
          <p className="text-indigo-200 font-medium mb-8 relative z-10">Build a professional resume in minutes using our free, ATS-friendly templates.</p>
          <Link to="/editor" className="relative z-10">
            <button className="px-8 py-4 bg-linear-to-r from-indigo-600 to-cyan-500 text-white text-lg font-bold rounded-xl shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(6,182,212,0.4)] active:scale-95 transition-all duration-300 inline-flex items-center gap-2">
              Create Your Resume <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
