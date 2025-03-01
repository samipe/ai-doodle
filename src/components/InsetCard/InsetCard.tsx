import { CSSProperties } from 'react';
import './InsetCard.css';

interface InsetCardProps {
  style?: CSSProperties;
}

const InsetCard = ({ style }: InsetCardProps) => {
  // Create an array of particles with different positions
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: `${10 + i * 10}%`,
    top: `${20 + i * 10}%`,
    delay: `${i * 0.3}s`
  }));

  return (
    <section className="inset-section">
      <div className="content">
        <h1>ACCESS GRANTED</h1>
        <p>// Terminal access established to hovering card system</p>
      </div>
      
      <div className="inset-container">
        <div className="inset-hole"></div>
        <div className="inset-card" style={style}>
          <h3>SYSTEM_CORE//0xFF</h3>
          <p>This card breaks physics rules with scroll movement, floating in a digital void below the matrix surface.</p>
          <div className="code-element">[SYS:0x3F7A]</div>
          <div className="code-element">[PING:ACTIVE]</div>
        </div>
        
        <div className="particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="particle" 
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsetCard;