import { CSSProperties, useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import CubeScene from '../ThreeCube/CubeScene';
import './Terminal3d.css';

interface Terminal3DProps {
  style?: CSSProperties;
}

const Terminal3D = ({ style }: Terminal3DProps) => {
  const { currentTheme } = useTheme();
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const [text, setText] = useState('');
  
  // Typewriter effect
  useEffect(() => {
    const fullText = "Welcome to AI Doodle #0. This playground was assembled with a dash of generative AI magic.";
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      
      if (index > fullText.length) {
        clearInterval(timer);
        setIsTypewriterComplete(true);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  // Capitalize first letter
  const themeDisplayName = currentTheme === 'default' 
    ? 'Cyberpunk' 
    : currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
  
  return (
    <section className="terminal3d-section">
      <CubeScene>
        <div className="terminal3d-container">
          <div className="terminal3d-window terminal-scan-effect" style={style}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot"></div>
                <div className="terminal-dot"></div>
                <div className="terminal-dot"></div>
              </div>
            </div>
            <div className="terminal-content">
              <div>
                <span className="terminal-prompt">$</span>
                <span className="terminal-text">launch --3d --immersive</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <span className="terminal-prompt">[SYS]</span>
                <span className="terminal-text">AI Doodle #0</span>
              </div>
              <div style={{ marginTop: '5px' }}>
                <span className="terminal-prompt">[INFO]</span>
                <span className="terminal-text">{text}</span>
                {!isTypewriterComplete && <span className="terminal-cursor"></span>}
              </div>
              <div style={{ marginTop: '20px' }}>
                <span className="terminal-prompt">$</span>
                <span className="terminal-text">Theme: {themeDisplayName}</span>
                {isTypewriterComplete && <span className="terminal-cursor"></span>}
              </div>
            </div>
          </div>
        </div>
      </CubeScene>
    </section>
  );
};

export default Terminal3D;