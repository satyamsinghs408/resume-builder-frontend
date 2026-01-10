import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorContextType {
  currentStep: number;
  totalSteps: number;
  setEditorSteps: (step: number, total: number) => void;
  clearEditorSteps: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const setEditorSteps = (step: number, total: number) => {
    setCurrentStep(step);
    setTotalSteps(total);
  };

  const clearEditorSteps = () => {
    setCurrentStep(0);
    setTotalSteps(0);
  };

  return (
    <EditorContext.Provider value={{ currentStep, totalSteps, setEditorSteps, clearEditorSteps }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
