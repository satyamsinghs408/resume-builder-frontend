import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


// Separate Handle Component if we want specific drag area
export function DragHandle({ listeners }: { listeners: any }) {
    return (
        <button type="button" {...listeners} className="cursor-move p-2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
        </button>
    );
}

// Revised SortableItem to match dnd-kit patterns better
export function SortableWrapper({ id, children }: { id: string, children: (listeners: any) => React.ReactNode }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
      } = useSortable({ id });
    
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative' as const, 
        zIndex: isDragging ? 50 : 'auto',
      };
    
      return (
        <div ref={setNodeRef} style={style} {...attributes}>
            {children(listeners)}
        </div>
      );
}
