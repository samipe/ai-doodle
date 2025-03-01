import { ReactNode } from 'react';

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
}

const ScrollContainer = ({ children, className = '' }: ScrollContainerProps) => {
  return (
    <div className={`scroll-snap-container ${className}`}>
      {children}
    </div>
  );
};

export default ScrollContainer;