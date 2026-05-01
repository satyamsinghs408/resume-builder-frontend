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

  // Hide placeholder until AdSense is approved and configured
  if (!adSlot) {
    return null;
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
