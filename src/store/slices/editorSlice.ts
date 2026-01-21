import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  currentStep: number;
  totalSteps: number;
}

const initialState: EditorState = {
  currentStep: 0,
  totalSteps: 4, // Default steps: Personal, Experience, Education, Templates
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
    },
  },
});

export const { setStep, setTotalSteps, nextStep, prevStep, resetEditor } = editorSlice.actions;
export default editorSlice.reducer;
