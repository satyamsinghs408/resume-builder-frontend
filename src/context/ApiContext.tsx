import React, { createContext, useContext, ReactNode } from 'react';

interface ApiContextType {
  apiUrl: string;
  endpoints: {
    login: string;
    register: string;
    resumes: string;
    parseResume: string;
  };
}

// Get API URL from environment variable, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ApiContext = createContext<ApiContextType>({
  apiUrl: API_URL,
  endpoints: {
    login: `${API_URL}/api/users/login`,
    register: `${API_URL}/api/users/register`,
    resumes: `${API_URL}/api/resumes`,
    parseResume: `${API_URL}/api/resumes/parse`,
  },
});

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const value: ApiContextType = {
    apiUrl: API_URL,
    endpoints: {
      login: `${API_URL}/api/users/login`,
      register: `${API_URL}/api/users/register`,
      resumes: `${API_URL}/api/resumes`,
      parseResume: `${API_URL}/api/resumes/parse`,
    },
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;
