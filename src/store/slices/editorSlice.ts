import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  currentStep: number;
  totalSteps: number;
  showMobilePreview: boolean;
}

const initialState: EditorState = {
  currentStep: 0,
  totalSteps: 4, // Default steps: Personal, Experience, Education, Templates
  showMobilePreview: false,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setTotalSteps: (state, action: PayloadAction<number>) => {
      state.totalSteps = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps - 1) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    resetEditor: (state) => {
      state.currentStep = 0;
      state.showMobilePreview = false;
    },
    toggleMobilePreview: (state) => {
      state.showMobilePreview = !state.showMobilePreview;
    },
    setMobilePreview: (state, action: PayloadAction<boolean>) => {
      state.showMobilePreview = action.payload;
    },
  },
});

export const { setStep, setTotalSteps, nextStep, prevStep, resetEditor, toggleMobilePreview, setMobilePreview } = editorSlice.actions;
export default editorSlice.reducer;
