
import { useEffect, useState, useRef } from 'react';

const PageBreakLines = () => {
    const A4_HEIGHT_PX = 1123; // Standard A4 height in pixels at 96 DPI (297mm)
    const [numPages, setNumPages] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateHeight = () => {
            // Find the parent resume container
            const parent = containerRef.current?.parentElement;
            if (parent) {
                const height = parent.scrollHeight;
                const pages = Math.ceil(height / A4_HEIGHT_PX);
                setNumPages(Math.max(pages, 1));
            }
        };

        // Initial check
        // Small delay to allow React to render content first
        setTimeout(updateHeight, 100);

        // Observer for content changes (dynamic typing)
        const observer = new ResizeObserver(updateHeight);
        if (containerRef.current?.parentElement) {
            observer.observe(containerRef.current.parentElement);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-50">
            {Array.from({ length: numPages }).map((_, i) => (
                // Don't show line at valid page 0 top, start from page 1 break
                (i > 0) && (
                    <div 
                        key={i}
                        className="absolute w-full border-t-2 border-dashed border-red-400 opacity-60 flex items-center justify-end"
                        style={{ top: `${i * A4_HEIGHT_PX}px` }}
                    >
                         <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200 mr-2 -mt-3 shadow-xs">
                            End of Page {i}
                         </span>
                    </div>
                )
            ))}
            
            {/* Show valid area guide for current page bottom */}
            <div 
                className="absolute w-full border-b-2 border-dashed border-slate-300 opacity-30"
                 style={{ top: `${numPages * A4_HEIGHT_PX}px` }}
            ></div>
        </div>
    );
};

export default PageBreakLines;
