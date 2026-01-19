
import React, { useEffect, useRef, forwardRef } from 'react';

// --- Reusable Grid Item Component ---
const BioluminescentGridItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);

    // Effect to track mouse position and update CSS custom properties
    useEffect(() => {
        // Merge refs if needed or just use localRef for the effect
        const item = localRef.current;
        if (!item) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        };

        item.addEventListener('mousemove', handleMouseMove);

        return () => {
            item.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={(node) => {
                // Manage both refs
                localRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            className={`bio-item ${className || ''}`.trim()}
            {...props}
        >
            <div className="bio-item-content">
                {children}
            </div>
        </div>
    );
});
BioluminescentGridItem.displayName = "BioluminescentGridItem";


// --- Main Grid Container Component ---
export const BioluminescentGrid = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={`bio-grid ${className || ''}`.trim()} {...props}>
            {children}
        </div>
    );
});
BioluminescentGrid.displayName = "BioluminescentGrid";

export { BioluminescentGridItem };
