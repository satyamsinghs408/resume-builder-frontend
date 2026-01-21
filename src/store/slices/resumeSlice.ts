import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeData, PersonalInfo, Experience, Education } from '../../types';

const initialState: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
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
  },
});

export const {
  setResumeData,
  updatePersonalInfo,
  addExperience,
  updateExperience,
  setExperience,
  deleteExperience,
  addEducation,
  updateEducation,
  setEducation,
  deleteEducation,
  setSkills,
} = resumeSlice.actions;

export default resumeSlice.reducer;
