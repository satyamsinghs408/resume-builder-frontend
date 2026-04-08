import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RealisticTemplatePreview from '../components/landing/RealisticTemplatePreview';

const industries: Array<{ name: string; tpl: 'classic' | 'modern' | 'minimalist' | 'executive' | 'creative'; data: any }> = [
  { 
    name: "Software Engineering", tpl: "modern", 
    data: { 
      name: "SARAH CHEN", role: "Full Stack Engineer", company: "Tech Giant Inc.", school: "UC Berkeley", email: "sarah.chen@email.com", phone: "(415) 555-0198", location: "San Francisco, CA", summary: "Innovative Full Stack Engineer with 6+ years of experience scaling consumer-facing applications in React and Node.js.",
      skills: ["React/Redux", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "AWS"],
      jobs: [
        { title: "Senior Full Stack Engineer", company: "Tech Giant Inc.", date: "2021 - Present", bullets: ["Architected a real-time collaborative dashboard using WebSocket and React, increasing user engagement by 45%.", "Mentored 4 junior engineers and implemented strict CI/CD guidelines that reduced breaking changes by 60%."] },
        { title: "Software Engineer", company: "StartUp LLC", date: "2018 - 2021", bullets: ["Developed and deployed 15+ RESTful APIs backing mobile applications with 1M+ active users.", "Optimized MongoDB aggregates decreasing query latencies by an average of 400ms."] }
      ],
      education: [{ degree: "B.S. Computer Science", school: "UC Berkeley", date: "2018" }]
    } 
  },
  { 
    name: "Product Marketing", tpl: "creative", 
    data: {
      name: "MARCUS WEBB", role: "Product Marketing Mgr", company: "Global Agency", school: "NYU Stern", email: "marcus.webb@email.com", phone: "(212) 555-0143", location: "New York, NY", summary: "Data-driven Product Marketing Manager adept at creating compelling GTM strategies and driving multi-million dollar product launches.",
      skills: ["GTM Strategy", "Market Research", "AB Testing", "Copywriting", "Sales Enablement"],
      jobs: [
        { title: "Senior PMM", company: "Global Agency", date: "2020 - Present", bullets: ["Led the GTM launch for the flagship SaaS product, resulting in $2.5M pipeline generation in Q1.", "Authored 25+ sales enablement assets including pitch decks, battlecards, and one-pagers."] },
        { title: "Marketing Specialist", company: "BrandWorks", date: "2016 - 2020", bullets: ["Managed a $50k/mo ad spend across LinkedIn and Google Ads, maintaining a CPA 15% below target.", "Increased blog organic traffic by 120% YoY through SEO-driven content strategies."] }
      ],
      education: [{ degree: "B.S. Marketing", school: "NYU Stern School of Business", date: "2016" }]
    }
  },
  { 
    name: "Sales Executive", tpl: "executive", 
    data: {
      name: "ELENA ROSTOV", role: "VP of Sales", company: "Enterprise Corp", school: "Univ. of Chicago", email: "elena.r@email.com", phone: "(312) 555-0182", location: "Chicago, IL", summary: "High-performing Sales Executive with over 12 years of experience exceeding enterprise SaaS quotas and expanding into new markets.",
      skills: ["B2B Enterprise Sales", "Contract Negotiation", "Salesforce CRM", "Account Management", "Revenue Forecasting"],
      jobs: [
        { title: "VP of Sales", company: "Enterprise Corp", date: "2019 - Present", bullets: ["Grew North American enterprise sales division from $10M to $35M in ARR over 3 years.", "Negotiated and closed 3 key Fortune 500 accounts averaging $1.5M ACV.", "Restructured SDR compensation plan, reducing turnover by 25%."] },
        { title: "Sales Director", company: "CloudTech", date: "2013 - 2019", bullets: ["Achieved 140% of quota in FY2018, recognized as President's Club top global performer.", "Managed a team of 15 Account Executives across 4 geographic regions."] }
      ],
      education: [{ degree: "MBA", school: "University of Chicago Booth", date: "2013" }]
    }
  },
  { 
    name: "Graphic Design", tpl: "minimalist", 
    data: {
      name: "LIAM NGUYEN", role: "Art Director", company: "Design Studio", school: "Pratt Institute", email: "liam.designs@email.com", phone: "(718) 555-0164", location: "Brooklyn, NY", summary: "Versatile Art Director focused on creating striking visual identities and packaging for boutique consumer brands.",
      skills: ["Art Direction", "Typography", "Packaging", "Adobe Illustrator", "Figma", "Branding"],
      jobs: [
        { title: "Art Director", company: "Design Studio", date: "2021 - Present", bullets: ["Directed full rebranding initiatives for 5 D2C brands, leading to an average 30% increase in conversion rates.", "Supervised photo shoots and collaborated with copywriters to ensure cohesive campaign messaging."] },
        { title: "Senior Graphic Designer", company: "Creative Co.", date: "2017 - 2021", bullets: ["Designed print and digital collateral for nationwide retail campaigns visible in 1,200+ stores.", "Pioneered a new internal design system, cutting asset generation time by half."] }
      ],
      education: [{ degree: "BFA Graphic Design", school: "Pratt Institute", date: "2017" }]
    }
  },
  { 
    name: "Financial Analyst", tpl: "classic", 
    data: {
      name: "PRIYA PATEL", role: "Senior Financial Analyst", company: "Wall St Bank", school: "Wharton", email: "ppatel@email.com", phone: "(212) 555-0199", location: "New York, NY", summary: "Detail-oriented Senior Financial Analyst specializing in financial modeling, risk assessment, and M&A evaluations.",
      skills: ["Financial Modeling", "DCF Valuation", "Bloomberg Terminal", "Excel/VBA", "SQL"],
      jobs: [
        { title: "Senior Analyst", company: "Wall St Bank", date: "2020 - Present", bullets: ["Built comprehensive DCF and LBO models to evaluate potential $500M+ tech sector acquisitions.", "Prepared monthly executive dashboard reports highlighting key variance analysis against budget.", "Streamlined data aggregation using Python, saving 15 hours of manual entry per month."] },
        { title: "Financial Analyst", company: "Investment Partners", date: "2018 - 2020", bullets: ["Assisted in the due diligence process for a highly publicized $2B retail merger.", "Analyzed historical trends to project future cash flows with 95% historical accuracy."] }
      ],
      education: [{ degree: "B.S. Economics", school: "Wharton School, UPenn", date: "2018" }]
    }
  },
  { 
    name: "Human Resources", tpl: "classic", 
    data: {
      name: "DAVID KIM", role: "HR Director", company: "Healthcare Partners", school: "Cornell Univ.", email: "dkim.hr@email.com", phone: "(607) 555-0102", location: "Ithaca, NY", summary: "Strategic HR Director dedicated to inclusive talent acquisition, employee retention, and corporate culture development.",
      skills: ["Talent Acquisition", "Employee Relations", "Workday HRIS", "Benefits Administration", "Conflict Resolution"],
      jobs: [
        { title: "Director of Human Resources", company: "Healthcare Partners", date: "2019 - Present", bullets: ["Redesigned onboarding process, reducing 90-day voluntary turnover from 15% to 4%.", "Managed successful migration to Workday HRIS for 1,500+ employees with zero critical errors.", "Spearheaded DEI initiatives that increased diverse management hires by 20%."] },
        { title: "HR Business Partner", company: "MedTech Solutions", date: "2014 - 2019", bullets: ["Served as primary liaison for 400+ employees regarding benefits, payroll, and conflict resolution.", "Oversaw annual performance review cycle ensuring 100% compliance across all departments."] }
      ],
      education: [{ degree: "M.S. Human Resource Management", school: "Cornell University", date: "2014" }]
    }
  },
  { 
    name: "Data Science", tpl: "modern", 
    data: {
      name: "AISHA BELLO", role: "Lead Data Scientist", company: "AI Startup", school: "Stanford", email: "aisha.data@email.com", phone: "(650) 555-0122", location: "Palo Alto, CA", summary: "Analytical Lead Data Scientist with expertise in predictive modeling and natural language processing to solve complex business problems.",
      skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Scikit-Learn", "AWS SageMaker"],
      jobs: [
        { title: "Lead Data Scientist", company: "AI Startup", date: "2021 - Present", bullets: ["Developed a custom NLP sentiment analysis model that improved customer service routing accuracy by 35%.", "Led a team of 3 data scientists, establishing peer-review standards for machine learning pipelines."] },
        { title: "Data Analyst", company: "E-Commerce Giant", date: "2018 - 2021", bullets: ["Designed dynamic Tableau dashboards utilized by C-suite for daily supply chain monitoring.", "Performed rigorous A/B testing on pricing models, resulting in a 4% lift in overall profit margins."] }
      ],
      education: [{ degree: "M.S. Data Science", school: "Stanford University", date: "2018" }]
    }
  },
  { 
    name: "Nursing", tpl: "minimalist", 
    data: {
      name: "THOMAS WRIGHT", role: "Registered Nurse (ICU)", company: "City Hospital", school: "Johns Hopkins", email: "twright.rn@email.com", phone: "(410) 555-0167", location: "Baltimore, MD", summary: "Compassionate and highly skilled Registered Nurse with 5 years of critical care experience handling high-acuity patients.",
      skills: ["Critical Care", "Advanced Cardiac Life Support (ACLS)", "Epic EMR", "Patient Education", "Phlebotomy"],
      jobs: [
        { title: "ICU Registered Nurse", company: "City Hospital", date: "2020 - Present", bullets: ["Provide direct, high-quality care to 2-3 critically ill patients per shift in a Level 1 Trauma Center.", "Collaborate closely with interdisciplinary teams to formulate and adjust patient care plans.", "Serve as preceptor for newly graduated nurses, ensuring strict adherence to safety protocols."] },
        { title: "Emergency Room Nurse", company: "County Medical", date: "2018 - 2020", bullets: ["Triaged 30+ incoming emergency patients per shift, accurately prioritizing based on severity.", "Assisted physicians in emergency procedures including intubation and central line placement."] }
      ],
      education: [{ degree: "B.S. Nursing (BSN)", school: "Johns Hopkins University", date: "2018" }]
    }
  },
  { 
    name: "Customer Support", tpl: "creative", 
    data: {
      name: "CARLOS MENDEZ", role: "Customer Success Lead", company: "SaaS Solutions", school: "Univ. of Texas", email: "cmendez.cx@email.com", phone: "(512) 555-0134", location: "Austin, TX", summary: "Empathetic Customer Success Lead proven to elevate net promoter scores (NPS) and drive adoption for enterprise software products.",
      skills: ["Zendesk", "Intercom", "Customer Onboarding", "De-escalation", "Churn Reduction"],
      jobs: [
        { title: "Customer Success Lead", company: "SaaS Solutions", date: "2021 - Present", bullets: ["Manage a portfolio of 50 enterprise clients, maintaining a 98% gross retention rate YoY.", "Conduct quarterly business reviews (QBRs) focusing on ROI and feature adoption.", "Created a comprehensive knowledge base that reduced Tier 1 support tickets by 20%."] },
        { title: "Support Representative", company: "TechHelp", date: "2017 - 2021", bullets: ["Resolved an average of 60+ technical support tickets daily with a 95% first-contact resolution rate.", "Recognized as 'Support Star of the Quarter' twice for outstanding customer feedback."] }
      ],
      education: [{ degree: "B.A. Communications", school: "University of Texas at Austin", date: "2017" }]
    }
  }
];

const ExamplesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-24 md:pt-32 pb-16">
      <div className="absolute top-0 left-0 w-125 h-125 bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Resume Examples by Industry</h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl">
            Browse our curated list of successful resumes. See exactly how professionals in your field format their experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div 
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition-all group cursor-pointer flex flex-col"
            >
              {/* Preview Box */}
              <div className="w-full aspect-[0.85] rounded-xl mb-5 relative border border-slate-200 shadow-inner overflow-hidden pointer-events-none bg-slate-100">
                <div className="w-full h-[500px] transform scale-[0.55] xl:scale-[0.55] origin-top-left absolute top-0 left-0 transition-transform duration-[2s] ease-in-out group-hover:-translate-y-[2%]" style={{ width: '181%' }}>
                  <RealisticTemplatePreview 
                    template={ind.tpl} 
                    overrideData={ind.data}
                  />
                </div>
                {/* Overlay shadow / fade */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-100/90 pointer-events-none"></div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">{ind.name} Example</h3>
              <p className="text-sm text-slate-500 font-medium mb-4 flex-1">View best practices for {ind.name.toLowerCase()} roles.</p>
              
              <Link to="/editor" className="text-cyan-600 font-bold text-sm flex items-center gap-1 group-hover:text-indigo-600 pt-2 border-t border-slate-100 w-full mt-auto">
                Use this layout <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-linear-to-r from-indigo-900 to-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
            <h2 className="text-3xl font-extrabold text-white mb-4 relative z-10">Don't see your industry?</h2>
            <p className="text-indigo-200 font-medium mb-8 relative z-10">Our AI-assisted builder adapts to any professional background.</p>
            <Link to="/editor" className="relative z-10">
              <button className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
                Create Your Resume
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;
