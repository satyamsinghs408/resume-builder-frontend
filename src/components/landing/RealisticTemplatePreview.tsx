import { FC } from "react";

export interface RealisticResumeData {
  name: string;
  role: string;
  company: string;
  school: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  summary: string;
  jobs: {
    title: string;
    company: string;
    date: string;
    bullets: string[];
  }[];
  projects?: {
    name: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    date: string;
  }[];
}

export interface RealisticTemplatePreviewProps {
  template: "classic" | "modern" | "minimalist" | "executive" | "creative";
  overrideData?: RealisticResumeData;
}

const RealisticTemplatePreview: FC<RealisticTemplatePreviewProps> = ({
  template,
  overrideData,
}) => {
  // Realistic mock data
  const masterDefaultData: RealisticResumeData = {
    name: "ALEX RIVERA",
    role: "Senior Software Engineer",
    company: "Tech Giant Inc.",
    school: "University of California",
    email: "alex.rivera@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "Go",
      "System Architecture",
      "AWS",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "MongoDB",
      "Redis",
      "Agile/Scrum",
      "CI/CD",
      "TDD",
    ],
    summary:
      "Results-driven Senior Software Engineer with 8+ years of experience designing and developing highly scalable applications. Proven leader capable of managing cross-functional teams to deliver enterprise-grade solutions that drive massive revenue growth and system efficiency.",
    jobs: [
      {
        title: "Senior Software Engineer",
        company: "Tech Giant Inc.",
        date: "2020 - Present",
        bullets: [
          "Architected and deployed a highly available microservices infrastructure handling 10M+ daily requests with 99.99% uptime.",
          "Led a cross-functional team of 8 engineers and designers to launch a flagship product 2 months ahead of schedule.",
          "Optimized core database queries and indexing strategies, reducing average load times by 45% and saving $50k annually in server compute costs.",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "Innovative Web Solutions",
        date: "2016 - 2020",
        bullets: [
          "Developed and maintained client-facing web applications using React and Node.js, growing the active user base from 10k to 500k.",
          "Implemented robust continuous integration and deployment (CI/CD) pipelines, reducing deployment time by 50% and eliminating manual regression errors.",
          "Mentored 5 junior developers, improving team velocity by 30% over a 6-month period.",
        ],
      },
      {
        title: "Software Engineer I",
        company: "DataStream Analytics",
        date: "2014 - 2016",
        bullets: [
          "Built a robust data ingestion pipeline processing 500GB of unstructured data daily.",
          "Collaborated with product managers to define and build MVP features resulting in a successful $5M Series A funding round.",
        ],
      },
    ],
    projects: [
      {
        name: "Open Source Contributor - React",
        description:
          "Contributed bug fixes and performance enhancements to the core React repository.",
      },
      {
        name: "DevConnect Platform",
        description:
          "Created an internal developer portal reducing onboarding time by 40%.",
      },
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        school: "Stanford University",
        date: "2016",
      },
      {
        degree: "B.S. Software Engineering",
        school: "University of California",
        date: "2014",
      },
    ],
  };

  const data = overrideData || masterDefaultData;

  return (
    <div className="w-full h-[700px] sm:h-[650px] bg-white origin-top-left flex flex-col pointer-events-none select-none text-[8px] leading-tight text-slate-800 shadow-sm border border-slate-100 font-sans">
      {template === "modern" && (
        <div className="flex h-full">
          <div className="w-1/3 bg-slate-900 text-slate-300 p-4 flex flex-col gap-4">
            <div>
              <h1 className="text-white text-base font-bold mb-1 tracking-wider uppercase">
                {data.name}
              </h1>
              <div className="text-cyan-400 font-semibold uppercase text-[9px]">
                {data.role}
              </div>
            </div>
            <div>
              <div className="text-white font-bold border-b border-slate-700 pb-1 mb-2">
                CONTACT
              </div>
              <div className="space-y-1">
                <div>{data.email}</div>
                <div>{data.phone}</div>
                <div>{data.location}</div>
              </div>
            </div>
            <div>
              <div className="text-white font-bold border-b border-slate-700 pb-1 mb-2">
                SKILLS
              </div>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-800 px-1.5 py-0.5 rounded text-[7px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-2/3 p-5">
            <div className="font-bold text-slate-900 border-b-2 border-cyan-500 pb-1 mb-3">
              EXPERIENCE
            </div>
            {data.jobs.map((job, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{job.title}</span>
                  <span className="text-slate-500 shrink-0">{job.date}</span>
                </div>
                <div className="text-cyan-600 font-medium mb-1">
                  {job.company}
                </div>
                <ul className="list-disc pl-3 text-slate-600 space-y-1 mt-1">
                  {job.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}

            {data.projects && (
              <>
                <div className="font-bold text-slate-900 border-b-2 border-cyan-500 pb-1 mb-3 mt-4">
                  PROJECTS
                </div>
                {data.projects.map((proj, i) => (
                  <div key={i} className="mb-3">
                    <div className="font-bold text-slate-800">{proj.name}</div>
                    <div className="text-slate-600 mt-0.5">
                      {proj.description}
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="font-bold text-slate-900 border-b-2 border-cyan-500 pb-1 mb-3 mt-4">
              EDUCATION
            </div>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{edu.degree}</span>
                  <span className="text-slate-500">{edu.date}</span>
                </div>
                <div className="text-slate-600">{edu.school}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {template === "classic" && (
        <div className="h-full p-6 flex flex-col font-serif">
          <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
            <h1 className="text-xl font-bold text-slate-900 tracking-widest uppercase">
              {data.name}
            </h1>
            <div className="text-slate-600 text-[10px] mt-1">
              {data.role} | {data.email} | {data.phone} | {data.location}
            </div>
          </div>
          <p className="text-slate-700 text-center mb-5 italic px-4 leading-relaxed">
            {data.summary}
          </p>
          <div className="mb-4">
            <h2 className="font-bold text-slate-900 uppercase tracking-widest text-[9px] mb-2 border-b border-slate-300">
              Professional Experience
            </h2>
            {data.jobs.map((job, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between font-bold text-slate-800">
                  <span className="text-[9px]">
                    {job.company} - {job.title}
                  </span>
                  <span>{job.date}</span>
                </div>
                <ul className="list-disc pl-4 text-slate-700 space-y-1 mt-1.5">
                  {job.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {data.projects && (
            <div className="mb-4">
              <h2 className="font-bold text-slate-900 uppercase tracking-widest text-[9px] mb-2 border-b border-slate-300">
                Projects
              </h2>
              {data.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <div className="font-bold text-slate-800 text-[9px]">
                    {proj.name}
                  </div>
                  <div className="text-slate-700 leading-tight mt-0.5">
                    {proj.description}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            <h2 className="font-bold text-slate-900 uppercase tracking-widest text-[9px] mb-2 border-b border-slate-300">
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{edu.school}</span>
                  <span>Graduated: {edu.date}</span>
                </div>
                <div className="text-slate-700 italic">{edu.degree}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {template === "minimalist" && (
        <div className="h-full p-8 flex flex-col font-sans font-light text-slate-600">
          <div className="mb-8">
            <h1 className="text-2xl font-light text-slate-900 tracking-tight uppercase">
              {data.name}
            </h1>
            <div className="text-slate-500 font-medium text-[9px] mt-1">
              {data.role}
            </div>
          </div>

          <div className="flex gap-8 h-full">
            <div className="w-1/4 space-y-6">
              <div>
                <h3 className="text-slate-900 font-medium text-[8px] uppercase tracking-widest mb-2">
                  Contact
                </h3>
                <div className="space-y-1">
                  <div>{data.email}</div>
                  <div>{data.phone}</div>
                  <div>{data.location}</div>
                </div>
              </div>
              <div>
                <h3 className="text-slate-900 font-medium text-[8px] uppercase tracking-widest mb-2">
                  Skills
                </h3>
                <div className="space-y-1">
                  {data.skills.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-3/4 space-y-6">
              <div>
                <h3 className="text-slate-900 font-medium text-[8px] uppercase tracking-widest mb-3">
                  Experience
                </h3>
                {data.jobs.map((job, i) => (
                  <div key={i} className="mb-4">
                    <div className="text-slate-900 font-medium">
                      {job.title}
                    </div>
                    <div className="text-slate-500 mb-2">
                      {job.company} • {job.date}
                    </div>
                    <p className="leading-relaxed">{job.bullets.join(" ")}</p>
                  </div>
                ))}

                {data.projects && (
                  <>
                    <h3 className="text-slate-900 font-medium text-[8px] uppercase tracking-widest mb-3 mt-4">
                      Projects
                    </h3>
                    {data.projects.map((proj, i) => (
                      <div key={i} className="mb-3">
                        <div className="text-slate-900 font-medium">
                          {proj.name}
                        </div>
                        <p className="leading-relaxed text-slate-600 mt-1">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </>
                )}

                <h3 className="text-slate-900 font-medium text-[8px] uppercase tracking-widest mb-3 mt-4">
                  Education
                </h3>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <div className="text-slate-900 font-medium">
                      {edu.degree}
                    </div>
                    <div className="text-slate-500">
                      {edu.school} • {edu.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {template === "executive" && (
        <div className="h-full bg-slate-50 flex flex-col font-sans">
          <div className="bg-slate-900 text-white p-6 border-t-4 border-indigo-600">
            <h1 className="text-xl font-bold uppercase tracking-widest mb-1">
              {data.name}
            </h1>
            <div className="text-indigo-300 font-semibold text-[10px] uppercase tracking-wide">
              {data.role}
            </div>
          </div>
          <div className="p-6">
            <div className="text-slate-800 font-bold border-b border-slate-300 pb-1 mb-3 uppercase tracking-widest">
              Core Competencies
            </div>
            <div className="grid grid-cols-3 gap-2 text-slate-600 mb-6 font-medium">
              {data.skills.map((s) => (
                <div key={s}>• {s}</div>
              ))}
            </div>

            <div className="text-slate-800 font-bold border-b border-slate-300 pb-1 mb-3 uppercase tracking-widest">
              Professional Experience
            </div>
            {data.jobs.map((job, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-bold text-slate-900 text-[10px]">
                    {job.company} — {job.title}
                  </span>
                  <span className="text-slate-500 font-medium">{job.date}</span>
                </div>
                <ul className="list-disc pl-4 text-slate-700 space-y-1.5 mt-2">
                  {job.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}

            {data.projects && (
              <>
                <div className="text-slate-800 font-bold border-b border-slate-300 pb-1 mb-3 mt-2 uppercase tracking-widest">
                  Selected Projects
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {data.projects.map((proj, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 p-2 bg-white shadow-xs"
                    >
                      <div className="font-bold text-slate-900 text-[9px]">
                        {proj.name}
                      </div>
                      <div className="text-slate-600 mt-1 leading-tight">
                        {proj.description}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="text-slate-800 font-bold border-b border-slate-300 pb-1 mb-3 mt-0 uppercase tracking-widest">
              Education
            </div>
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-end mb-2">
                <span className="font-bold text-slate-900 text-[9px]">
                  {edu.degree}
                </span>
                <span className="text-slate-500 font-medium">
                  {edu.school}, {edu.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {template === "creative" && (
        <div className="h-full flex flex-col font-sans">
          <div className="bg-white p-6 pb-0 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tighter mb-[-4px] uppercase">
                {data.name}
              </h1>
              <div className="text-emerald-500 font-bold text-[11px] uppercase tracking-widest">
                {data.role}
              </div>
            </div>
            <div className="text-right text-slate-500 space-y-0.5">
              <div>{data.email}</div>
              <div>{data.phone}</div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="h-1 w-full bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full mb-6"></div>

            <div className="flex gap-6">
              <div className="w-1/3 space-y-6">
                <div>
                  <h2 className="font-bold text-slate-900 mb-2">EXPERTISE</h2>
                  <div className="space-y-2">
                    {data.skills.slice(0, 4).map((s, i) => (
                      <div key={s}>
                        <div className="flex justify-between mb-0.5">
                          <span>{s}</span>
                          <span className="font-bold text-emerald-500">
                            {95 - i * 4}%
                          </span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400"
                            style={{ width: `${95 - i * 4}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-2/3 space-y-5">
                <div>
                  <h2 className="font-bold text-slate-900 mb-2">EXPERIENCE</h2>
                  {data.jobs.map((job, i) => (
                    <div
                      key={i}
                      className={`mb-3 relative pl-3 border-l-2 ${i === 0 ? "border-emerald-100" : "border-slate-100"} pb-2`}
                    >
                      <div
                        className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${i === 0 ? "bg-emerald-400" : "bg-slate-300"}`}
                      ></div>
                      <div className="font-bold text-slate-800">
                        {job.title}
                      </div>
                      <div
                        className={`${i === 0 ? "text-emerald-600" : "text-slate-500"} font-medium text-[7px] mb-1`}
                      >
                        {job.company} | {job.date}
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {job.bullets[0]}
                      </p>
                    </div>
                  ))}

                  {data.projects && (
                    <>
                      <h2 className="font-bold text-slate-900 mb-2 mt-4">
                        PROJECTS
                      </h2>
                      <div className="grid grid-cols-1 gap-2 border-l-2 border-slate-100 pl-3">
                        {data.projects.map((proj, i) => (
                          <div key={i} className="mb-2">
                            <div className="font-bold text-slate-800">
                              {proj.name}
                            </div>
                            <div className="text-slate-500 leading-relaxed mt-0.5">
                              {proj.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <h2 className="font-bold text-slate-900 mb-2 mt-4">
                    EDUCATION
                  </h2>
                  <div className="border-l-2 border-slate-100 pl-3">
                    {data.education.map((edu, i) => (
                      <div key={i} className="mb-2">
                        <div className="font-bold text-slate-800">
                          {edu.degree}
                        </div>
                        <div className="text-slate-500">
                          {edu.school} | {edu.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealisticTemplatePreview;
