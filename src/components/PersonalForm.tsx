import React from 'react';
import { Resume } from '../types';

interface PersonalFormProps {
  resumeData: Resume;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ resumeData, handleChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          name="firstName" 
          placeholder="First Name" 
          value={resumeData.firstName} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input 
          name="lastName" 
          placeholder="Last Name" 
          value={resumeData.lastName} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input 
          name="email" 
          placeholder="Email" 
          value={resumeData.email} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input 
          name="phone" 
          placeholder="Phone" 
          value={resumeData.phone} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input 
          name="address" 
          placeholder="Address" 
          value={resumeData.address} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
        />
      </div>
    </div>
  );
};

export default PersonalForm;