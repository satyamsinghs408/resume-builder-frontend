import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Resume } from '../../types';

interface FileUploadProps {
  onUploadSuccess: (data: Resume) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Assuming backend runs on port 5000
      const res = await axios.post('http://localhost:5000/api/resumes/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      onUploadSuccess(res.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to parse resume. Please try entering details manually.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-8 relative overflow-hidden group ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept=".pdf" 
        className="hidden" 
      />
      
      {isUploading ? (
         <div className="flex flex-col items-center justify-center py-4">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
            <p className="text-gray-500 font-medium">Analyzing your resume...</p>
         </div>
      ) : (
        <>
            <div className="mb-3 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-1">Import from Resume</h3>
            <p className="text-sm text-gray-500">Drag & drop your existing PDF or <span className="text-blue-600 font-semibold underline decoration-blue-300 underline-offset-2">browse</span></p>
            <p className="text-xs text-gray-400 mt-3 bg-gray-100 inline-block px-2 py-1 rounded">Supports PDF only</p>
        </>
      )}
    </div>
  );
};

export default FileUpload;
