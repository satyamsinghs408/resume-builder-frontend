import { z } from 'zod';

export const SocialLinksSchema = z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
    twitter: z.string().optional(),
});

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().optional(),
  summary: z.string().optional(),
  socialLinks: SocialLinksSchema.optional(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().optional(),
}).refine((data) => {
  if (data.current) return true;
  if (!data.endDate) return false;
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const EducationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'School name is required'),
  degree: z.string().min(1, 'Degree is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().optional(),
}).refine((data) => {
  if (data.current) return true;
  if (!data.endDate) return false;
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'Project title is required'),
    description: z.string().min(1, 'Description is required'),
    technologies: z.array(z.string()),
    link: z.string().optional(),
});

export const CertificationSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Certification name is required'),
    issuer: z.string().min(1, 'Issuer is required'),
    date: z.string().min(1, 'Date is required'),
    link: z.string().optional(),
});

export const LanguageSchema = z.object({
    id: z.string(),
    language: z.string().min(1, 'Language is required'),
    proficiency: z.string().min(1, 'Proficiency is required'),
});

export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()),
  projects: z.array(ProjectSchema),
  certifications: z.array(CertificationSchema),
  languages: z.array(LanguageSchema),
});

export type PersonalInfoFormData = z.infer<typeof PersonalInfoSchema>;
export type ExperienceFormData = z.infer<typeof ExperienceSchema>;
export type EducationFormData = z.infer<typeof EducationSchema>;
export type ProjectFormData = z.infer<typeof ProjectSchema>;
export type CertificationFormData = z.infer<typeof CertificationSchema>;
export type LanguageFormData = z.infer<typeof LanguageSchema>;
