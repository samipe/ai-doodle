import { ReactNode, CSSProperties } from 'react';
import './PageBlock.css';

interface PageBlockProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  id?: string;
}

const PageBlock = ({ children, style, className = '', id }: PageBlockProps) => {
  return (
    <section 
      className={`page-block ${className}`} 
      style={style}
      id={id}
    >
      <div className="page-block-content">
        {children}
      </div>
    </section>
  );
};

export default PageBlock;