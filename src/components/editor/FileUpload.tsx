import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ResumeData } from '../../types';
import { useApi } from '../../context/ApiContext';

interface FileUploadProps {
  onUploadSuccess: (data: ResumeData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
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
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please upload a PDF file.',
        confirmButtonColor: '#3b82f6'
      });
      return;
    }

    // Show Loading Popup
    Swal.fire({
      title: 'Analyzing Resume...',
      text: 'Please wait while we extract your information.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post(endpoints.parseResume, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Success Popup
      Swal.fire({
        icon: 'success',
        title: 'Resume Parsed!',
        text: 'We successfully extracted your information.',
        timer: 2000,
        showConfirmButton: false
      });

      onUploadSuccess(res.data);
    } catch (error) {
      console.error('Upload failed:', error);
      
      let errorMessage = 'Failed to parse resume. Please try manually.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
         errorMessage = error.response.data.message;
         if (error.response.data.error) {
             errorMessage += `: ${error.response.data.error}`;
         }
      }

      Swal.fire({
        icon: 'error',
        title: 'Analysis Failed',
        text: errorMessage,
        confirmButtonColor: '#3b82f6'
      });
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-2xl p-2 text-center transition-all cursor-pointer mb-2 relative overflow-hidden group ${
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
      
      <div className="mb-3 text-blue-500 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">Import from Resume</h3>
      <p className="text-gray-500 mb-2">
        Drag & drop your existing PDF or{' '}
        <span className="text-blue-600 font-semibold underline decoration-blue-300 decoration-2 underline-offset-2">browse</span>
      </p>
      <span className="inline-flex items-center gap-2 text-xs text-gray-600 bg-gray-200 px-3 py-1.5 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        PDF format supported
      </span>
    </div>
  );
};

export default FileUpload;
