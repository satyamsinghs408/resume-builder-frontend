import React from 'react';

// Input Field
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string }>(
  ({ label, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-2 w-full group">
      {label && <label className="text-sm font-bold text-gray-600 tracking-wide uppercase group-focus-within:text-blue-600 transition-colors">{label}</label>}
      <input
        ref={ref}
        className={`
            px-4 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent 
            focus:border-blue-500 focus:bg-white focus:ring-0
            outline-none transition-all duration-200 
            text-gray-900 font-medium placeholder-gray-400
            hover:bg-gray-100
            ${className}
        `}
        {...props}
      />
    </div>
  )
);

// TextArea Field
export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }>(
  ({ label, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-2 w-full group">
      {label && <label className="text-sm font-bold text-gray-600 tracking-wide uppercase group-focus-within:text-blue-600 transition-colors">{label}</label>}
      <textarea
        ref={ref}
        className={`
            px-4 py-3.5 bg-gray-50 rounded-xl border-2 border-transparent 
            focus:border-blue-500 focus:bg-white focus:ring-0
            outline-none transition-all duration-200 
            text-gray-900 font-medium placeholder-gray-400 
            min-h-32 resize-y
            hover:bg-gray-100
            ${className}
        `}
        {...props}
      />
    </div>
  )
);
