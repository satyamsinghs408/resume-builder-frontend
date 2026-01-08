import React from 'react';
import { Resume } from '../types';
import { Input } from './ui';

interface PersonalFormProps {
  resumeData: Resume;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ resumeData, handleChange }) => {
  return (
    <div className="animate-fadeIn">
      {/* Title is handled by Layout, but we can add a description if needed */}
      <p className="text-gray-500 mb-8">
        Let's start with the basics. Recruiters use this information to contact you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          name="firstName" 
          label="First Name"
          placeholder="e.g. John" 
          value={resumeData.firstName} 
          onChange={handleChange} 
        />
        <Input 
          name="lastName" 
          label="Last Name"
          placeholder="e.g. Doe" 
          value={resumeData.lastName} 
          onChange={handleChange} 
        />
        <Input 
          name="email" 
          label="Email Address"
          placeholder="john.doe@example.com" 
          value={resumeData.email} 
          onChange={handleChange} 
          type="email"
        />
        <Input 
          name="phone" 
          label="Phone Number"
          placeholder="+1 234 567 890" 
          value={resumeData.phone} 
          onChange={handleChange} 
        />
        <div className="md:col-span-2">
          <Input 
            name="address" 
            label="Address"
            placeholder="City, Country" 
            value={resumeData.address} 
            onChange={handleChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;