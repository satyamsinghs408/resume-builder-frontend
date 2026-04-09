import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: Array<object>;
  }
}

interface AdSlotProps {
  /** The ad slot ID from your AdSense account (e.g., "1234567890"). Leave empty for placeholder mode. */
  adSlot?: string;
  /** The ad format. Defaults to 'auto'. */
  adFormat?: string;
  /** Position label for the placeholder. */
  position: 'hero' | 'templates' | 'footer' | 'sidebar';
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Google AdSense Ad Slot Component
 *
 * HOW TO ACTIVATE:
 * 1. Replace `ca-pub-XXXXXXXXXXXXXXXX` in index.html with your real Publisher ID.
 * 2. Pass the `adSlot` prop with your Ad Unit ID to this component.
 *
 * While `adSlot` is empty, a styled placeholder is displayed instead.
 */
const AdSlot = ({ adSlot, adFormat = 'auto', position, className = '' }: AdSlotProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Only push the ad if we have a real adSlot and haven't already pushed
    if (adSlot && adRef.current && !isAdPushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }
  }, [adSlot]);

  // Labels for placeholder mode
  const labelMap: Record<string, string> = {
    'hero': 'Hero Ad Placement',
    'templates': 'Content Ad Placement',
    'footer': 'Footer Ad Placement',
    'sidebar': 'Sidebar Ad Placement',
  };

  // If no adSlot is provided, show placeholder
  if (!adSlot) {
    return (
      <div
        className={`w-full max-w-4xl mx-auto min-h-[90px] md:min-h-[120px] bg-slate-200/60 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden transition-all ${className}`}
        aria-label={`${position} Advertisement`}
      >
        <span className="text-[10px] sm:text-xs absolute top-2 right-2 uppercase tracking-widest bg-slate-300/50 px-2 py-0.5 rounded text-slate-500">
          Advertisement
        </span>
        <p className="text-xs sm:text-sm font-medium">{labelMap[position]} (Responsive)</p>
        <p className="text-[10px] sm:text-xs text-center px-2 mt-1">
          Ad unit will render here once AdSense is configured.
        </p>
      </div>
    );
  }

  // Real AdSense ad
  return (
    <div
      className={`w-full max-w-4xl mx-auto overflow-hidden ${className}`}
      aria-label={`${position} Advertisement`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;
