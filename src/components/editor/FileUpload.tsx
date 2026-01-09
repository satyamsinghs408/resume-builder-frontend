import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Resume } from '../../types';
import { useApi } from '../../context/ApiContext';

interface FileUploadProps {
  onUploadSuccess: (data: Resume) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { endpoints } = useApi();

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
      const res = await axios.post(endpoints.parseResume, formData, {
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
      className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer mb-8 relative overflow-hidden group ${
        isDragging 
          ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
          : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50/50'
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
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-semibold text-lg">Analyzing your resume...</p>
            <p className="text-gray-500 text-sm mt-1">This may take a few seconds</p>
         </div>
      ) : (
        <>
            <div className="mb-4 text-blue-500 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Import from Resume</h3>
            <p className="text-gray-500 mb-4">
              Drag & drop your existing PDF or{' '}
              <span className="text-blue-600 font-semibold underline decoration-blue-300 decoration-2 underline-offset-2">browse</span>
            </p>
            <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              PDF format supported
            </span>
        </>
      )}
    </div>
  );
};

export default FileUpload;
