import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeData, PersonalInfo, Experience, Education, Project, Certification, Language } from '../../types';

const initialState: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    socialLinks: {
        linkedin: '',
        github: '',
        portfolio: '',
        twitter: ''
    }
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeData: (_state, action: PayloadAction<ResumeData>) => {
      return action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateSocialLinks: (state, action: PayloadAction<Partial<NonNullable<PersonalInfo['socialLinks']>>>) => {
        state.personalInfo.socialLinks = { ...state.personalInfo.socialLinks, ...action.payload };
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experience.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.experience[index] = action.payload;
      }
    },
    setExperience: (state, action: PayloadAction<Experience[]>) => {
      state.experience = action.payload;
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter((exp) => exp.id !== action.payload);
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.education.findIndex((edu) => edu.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = action.payload;
      }
    },
    setEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter((edu) => edu.id !== action.payload);
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
            state.projects[index] = action.payload;
        }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    addCertification: (state, action: PayloadAction<Certification>) => {
        state.certifications.push(action.payload);
    },
    updateCertification: (state, action: PayloadAction<Certification>) => {
        const index = state.certifications.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
            state.certifications[index] = action.payload;
        }
    },
    deleteCertification: (state, action: PayloadAction<string>) => {
        state.certifications = state.certifications.filter((c) => c.id !== action.payload);
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
        state.languages.push(action.payload);
    },
    updateLanguage: (state, action: PayloadAction<Language>) => {
        const index = state.languages.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
            state.languages[index] = action.payload;
        }
    },
    deleteLanguage: (state, action: PayloadAction<string>) => {
        state.languages = state.languages.filter((l) => l.id !== action.payload);
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setCertifications: (state, action: PayloadAction<Certification[]>) => {
      state.certifications = action.payload;
    },
    setLanguages: (state, action: PayloadAction<Language[]>) => {
      state.languages = action.payload;
    },
  },
});

export const {
  setResumeData,
  updatePersonalInfo,
  updateSocialLinks,
  addExperience,
  updateExperience,
  setExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  setEducation,
  deleteEducation,
  setSkills,
  addProject,
  updateProject,
  deleteProject,
  addCertification,
  updateCertification,
  deleteCertification,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  setProjects,
  setCertifications,
  setLanguages,
} = resumeSlice.actions;

export default resumeSlice.reducer;
