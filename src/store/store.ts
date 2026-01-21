import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice.ts';
import editorReducer from './slices/editorSlice.ts';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
