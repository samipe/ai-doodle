import { ReactNode, CSSProperties, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './PageSection.css';

export type BgStyle = 'plain' | 'colorful' | 'patterned' | 'animated' | 'crazy';

interface PageSectionProps {
  children: ReactNode;
  bgStyle?: BgStyle;
  bgEl?: ReactNode;
  style?: CSSProperties;
  className?: string;
  id?: string;
}

const PageSection = ({ children, bgStyle = 'plain', bgEl = null, style, className = '', id }: PageSectionProps) => {
  const { currentTheme } = useTheme();
  
  useEffect(() => {
    // Handle iOS Safari dynamic height
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);
  
  const themeClass = `theme-${currentTheme}`;
  const backgroundClass = `bg-${bgStyle}`;
  
  return (
    <section 
      className={`page-section ${backgroundClass} ${themeClass} ${className}`} 
      style={style}
      id={id}
    >
      <div className='page-section-bg-slot'>{bgEl}</div>
      <div className="page-section-content">
        {children}
      </div>
    </section>
  );
};

export default PageSection;