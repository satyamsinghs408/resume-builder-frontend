import { FC } from 'react';

interface TemplatePreviewProps {
  template: 'classic' | 'modern' | 'minimalist' | 'executive' | 'creative';
  scale?: number;
}

const TemplatePreview: FC<TemplatePreviewProps> = ({ template, scale = 1 }) => {
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          bg: 'bg-white',
          sidebar: 'bg-slate-800',
          header: 'bg-slate-800',
          accent: 'bg-blue-500',
          text: 'text-slate-800'
        };
      case 'creative':
        return {
          bg: 'bg-white',
          sidebar: 'bg-white',
          header: 'bg-pink-600',
          accent: 'bg-pink-500',
          text: 'text-gray-800'
        };
      case 'executive':
        return {
          bg: 'bg-slate-50',
          sidebar: 'bg-transparent',
          header: 'bg-slate-900 border-b-4 border-blue-800',
          accent: 'bg-blue-800',
          text: 'text-slate-900'
        };
      case 'minimalist':
        return {
          bg: 'bg-white',
          sidebar: 'bg-transparent',
          header: 'bg-transparent border-b border-gray-200',
          accent: 'bg-gray-900',
          text: 'text-gray-900'
        };
      default: // classic
        return {
          bg: 'bg-white',
          sidebar: 'bg-gray-100',
          header: 'bg-white border-b border-gray-300',
          accent: 'bg-blue-600',
          text: 'text-gray-800'
        };
    }
  };

  const s = getTemplateStyles();

  return (
    <div 
      className={`relative shadow-lg overflow-hidden font-sans origin-top-left pointer-events-none select-none ${s.bg}`}
      style={{ 
        width: 210, // A4 ratio width
        height: 297, // A4 ratio height
        transform: `scale(${scale})`,
        marginBottom: `-${297 * (1 - scale)}px`, // Compensate for scale space
        marginRight: `-${210 * (1 - scale)}px`
      }}
    >
      {/* Modern Layout */}
      {template === 'modern' && (
        <div className="flex h-full">
          <div className={`w-1/3 ${s.sidebar} p-2 flex flex-col gap-2`}>
            <div className="w-12 h-12 rounded-full bg-slate-600 mx-auto mb-2 opacity-50"></div>
            <div className="h-1.5 w-3/4 bg-slate-600 rounded mx-auto"></div>
            <div className="h-1.5 w-1/2 bg-slate-600 rounded mx-auto mb-2"></div>
            <div className="h-px w-full bg-slate-700 my-1"></div>
            {[1, 2, 3, 4].map(i => <div key={i} className="h-1 w-full bg-slate-700/50 rounded"></div>)}
          </div>
          <div className="flex-1 p-3">
            <div className="h-4 w-3/4 bg-slate-200 rounded mb-2"></div>
            <div className="h-2 w-full bg-slate-100 rounded mb-1"></div>
            <div className="h-2 w-5/6 bg-slate-100 rounded mb-4"></div>
            
            <div className="h-2 w-1/3 bg-blue-100 rounded mb-2"></div>
             {[1, 2, 3].map(i => (
              <div key={i} className="mb-2">
                <div className="flex justify-between mb-1">
                  <div className="h-1.5 w-1/3 bg-slate-200 rounded"></div>
                  <div className="h-1.5 w-10 bg-slate-100 rounded"></div>
                </div>
                <div className="h-1 w-full bg-slate-50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Creative Layout */}
      {template === 'creative' && (
        <div className="h-full flex flex-col">
          <div className={`${s.header} h-16 p-3 flex items-center justify-between`}>
             <div className="w-10 h-10 bg-white/20 rounded-full"></div>
             <div className="flex-1 ml-3">
                <div className="h-2 w-1/2 bg-white/80 rounded mb-1"></div>
                <div className="h-1.5 w-1/3 bg-white/50 rounded"></div>
             </div>
          </div>
          <div className="flex-1 p-3 flex gap-3">
            <div className="w-1/3 py-2">
                <div className="h-1.5 w-1/2 bg-pink-100 rounded mb-2"></div>
                {[1, 2, 3].map(i => <div key={i} className="h-1 w-full bg-gray-100 rounded mb-1"></div>)}
            </div>
            <div className="flex-1 py-2">
                <div className="h-1.5 w-1/3 bg-gray-200 rounded mb-2"></div>
                {[1, 2, 3].map(i => <div key={i} className="h-1 w-full bg-gray-50 rounded mb-1"></div>)}
                <div className="h-1.5 w-1/3 bg-gray-200 rounded mb-2 mt-4"></div>
                {[1, 2].map(i => <div key={i} className="h-1 w-full bg-gray-50 rounded mb-1"></div>)}
            </div>
          </div>
        </div>
      )}

      {/* Minimalist Layout */}
      {template === 'minimalist' && (
        <div className="h-full p-4 flex flex-col">
          <div className="text-center border-b border-gray-100 pb-3 mb-3">
            <div className="h-3 w-1/2 bg-gray-800 mx-auto rounded mb-1.5"></div>
            <div className="h-1.5 w-1/3 bg-gray-400 mx-auto rounded"></div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
             {[1, 2, 3, 4].map(i => (
               <div key={i}>
                 <div className="h-1.5 w-1/4 bg-gray-300 rounded mb-1"></div>
                 <div className="h-1 w-full bg-gray-100 rounded mb-0.5"></div>
                 <div className="h-1 w-5/6 bg-gray-100 rounded"></div>
               </div>
             ))}
          </div>
        </div>
      )}

       {/* Executive Layout */}
       {template === 'executive' && (
        <div className="h-full flex flex-col bg-slate-50">
           <div className="bg-slate-900 p-4 border-t-4 border-blue-700">
              <div className="h-3 w-1/2 bg-white rounded mb-1"></div>
              <div className="h-1.5 w-1/3 bg-blue-200 rounded"></div>
           </div>
           <div className="p-4 grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-3">
                 {[1, 2, 3].map(i => (
                    <div key={i}>
                       <div className="h-2 w-1/3 bg-slate-300 rounded mb-1"></div>
                       <div className="h-1 w-full bg-slate-200 rounded mb-0.5"></div>
                       <div className="h-1 w-full bg-slate-200 rounded"></div>
                    </div>
                 ))}
              </div>
              <div className="border-l border-slate-200 pl-3 space-y-2">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-1 w-full bg-slate-300 rounded"></div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Classic (Default) */}
      {(template === 'classic' || !template) && (
        <div className="h-full p-4 flex flex-col">
             <div className="border-b-2 border-blue-600 pb-2 mb-3">
                <div className="h-3 w-1/2 bg-blue-900 rounded mb-1"></div>
                <div className="h-1.5 w-1/3 bg-gray-500 rounded"></div>
             </div>
             <div className="flex gap-4 h-full">
                 <div className="w-2/3 space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i}>
                            <div className="h-2 w-1/4 bg-gray-300 rounded mb-1"></div>
                            <div className="h-1 w-full bg-gray-100 rounded mb-0.5"></div>
                            <div className="h-1 w-5/6 bg-gray-100 rounded"></div>
                        </div>
                    ))}
                 </div>
                 <div className="w-1/3 bg-gray-50 p-2 rounded h-3/4">
                    <div className="h-2 w-1/2 bg-gray-300 rounded mb-2"></div>
                    {[1, 2, 3, 4, 5].map(i => (
                       <div key={i} className="h-1.5 w-full bg-gray-200 rounded mb-1"></div>
                    ))}
                 </div>
             </div>
        </div>
      )}

      {/* Glossy Overlay/Reflection */}
      <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TemplatePreview;
