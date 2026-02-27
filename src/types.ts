export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface SocialLinks {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
}

export interface Language {
    id: string;
    language: string;
    proficiency: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  summary?: string;
  socialLinks?: SocialLinks;
}

export interface ResumeData {
  _id?: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  lastImportTimestamp?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Keep User and AuthContextType as they are useful for Auth
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface TemplateProps {
  resumeData: ResumeData;
  theme?: ThemeConfig;
}

