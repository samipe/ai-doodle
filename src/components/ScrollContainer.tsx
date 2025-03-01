import { ReactNode, useRef, useEffect } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
}

const ScrollContainer = ({ children, className = '' }: ScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let isScrolling = false;
    let scrollTimeout: number;
    
    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        container.style.scrollSnapType = 'none';
      }
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
        container.style.scrollSnapType = 'y mandatory';
        
        // Find the closest section to snap to
        const scrollTop = container.scrollTop;
        const height = container.clientHeight;
        const sectionIndex = Math.round(scrollTop / height);
        const targetScroll = sectionIndex * height;
        
        container.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }, 150);
    };
    
    container.addEventListener('scroll', handleScrollStart, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScrollStart);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`scroll-snap-container ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;