import React, { createContext, useContext, ReactNode } from 'react';

interface ApiContextType {
  apiUrl: string;
  endpoints: {
    login: string;
    register: string;
    resumes: string;
    parseResume: string;
    contact: string;
    feedback: string;
  };
}

// Get API URL dynamically based on current hostname
const API_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  const hostname = window.location.hostname;
  
  // Regex to check if hostname is an IP address
  const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname);

  // If we are accessing via an IP (network or localhost), 
  // and we are NOT explicitly forcing a non-local URL, 
  // or we just want to ensure network devices can reach the backend.
  if (isIP && hostname !== '127.0.0.1') {
    return `http://${hostname}:5000`;
  }
  
  return envUrl || 'http://localhost:5000';
})();

const ApiContext = createContext<ApiContextType>({
  apiUrl: API_URL,
  endpoints: {
    login: `${API_URL}/api/users/login`,
    register: `${API_URL}/api/users/register`,
    resumes: `${API_URL}/api/resumes`,
    parseResume: `${API_URL}/api/resumes/parse`,
    contact: `${API_URL}/api/contact`,
    feedback: `${API_URL}/api/feedback`,
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
      contact: `${API_URL}/api/contact`,
      feedback: `${API_URL}/api/feedback`,
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
