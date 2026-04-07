import { MonitorSmartphone } from 'lucide-react';

interface AdSlotProps {
  position: 'hero' | 'templates' | 'footer';
  className?: string;
}

const AdSlot = ({ position, className = '' }: AdSlotProps) => {
  // Label changes based on position for the placeholder
  const labelMap = {
    'hero': 'Hero Ad Placeholder',
    'templates': 'Google AdSense Placeholder',
    'footer': 'Footer Ad Placeholder'
  };

  return (
    <div className={`w-full max-w-4xl mx-auto min-h-[90px] md:min-h-[120px] bg-slate-200/60 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden transition-all ${className}`} aria-label={`${position} Advertisement`}>
       {/* 
         TODO: When ready to integrate Google AdSense, 
         replace the placeholder content below with the standard AdSense snippet:
         <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
       */}
       
       <span className="text-[10px] sm:text-xs absolute top-2 right-2 uppercase tracking-widest bg-slate-300/50 px-2 py-0.5 rounded text-slate-500">
         Advertisement
       </span>
       <MonitorSmartphone className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 opacity-50" />
       <p className="text-xs sm:text-sm font-medium">{labelMap[position]} (Responsive)</p>
       <p className="text-[10px] sm:text-xs text-center px-2">Ad Unit will render here. UI prevents layout shift.</p>
    </div>
  );
};

export default AdSlot;
