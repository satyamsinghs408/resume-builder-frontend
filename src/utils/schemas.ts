import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().optional(),
  summary: z.string().optional(),
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

export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()),
});

export type PersonalInfoFormData = z.infer<typeof PersonalInfoSchema>;
export type ExperienceFormData = z.infer<typeof ExperienceSchema>;
export type EducationFormData = z.infer<typeof EducationSchema>;
