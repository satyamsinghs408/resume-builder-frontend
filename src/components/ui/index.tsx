import React from 'react';

// Input Field
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full group">
      {label && <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase group-focus-within:text-emerald-600 transition-colors">{label}</label>}
      <input
        ref={ref}
        className={`
            px-4 py-3 bg-slate-50 rounded-lg border 
            ${error ? 'border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10'}
            outline-none transition-all duration-200 
            text-slate-900 font-medium placeholder-slate-400
            hover:border-slate-300
            ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium animate-fadeIn">{error}</span>}
    </div>
  )
);

// TextArea Field
export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full group">
      {label && <label className="text-xs font-semibold text-slate-500 tracking-wide uppercase group-focus-within:text-emerald-600 transition-colors">{label}</label>}
      <textarea
        ref={ref}
        className={`
            px-4 py-3 bg-slate-50 rounded-lg border 
            ${error ? 'border-red-400 bg-red-50/50' : 'border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10'}
            outline-none transition-all duration-200 
            text-slate-900 font-medium placeholder-slate-400 
            min-h-32 resize-y
            hover:border-slate-300
            ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium animate-fadeIn">{error}</span>}
    </div>
  )
);
