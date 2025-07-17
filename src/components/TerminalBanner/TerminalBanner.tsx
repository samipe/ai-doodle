import { CSSProperties } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './TerminalBanner.css';

interface TerminalBannerProps {
  style?: CSSProperties;
}

const TerminalBanner = ({ style }: TerminalBannerProps) => {
  const { currentTheme } = useTheme();
  
  // Capitalize first letter
  const themeDisplayName = currentTheme === 'default' 
    ? 'Cyberpunk' 
    : currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
  
  return (
    <div className="terminal-banner terminal-scan-effect" style={style}>
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
          <span className="terminal-text">welcome.sh --interactive</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <span className="terminal-prompt">[SYS]</span>
          <span className="terminal-text">AI Doodle #0</span>
        </div>
        <div style={{ marginTop: '5px' }}>
          <span className="terminal-prompt">[INFO]</span>
          <span className="terminal-text">This playground was assembled with a little help from generative AI.</span>
        </div>
        <div style={{ marginTop: '20px' }}>
          <span className="terminal-prompt">$</span>
          <span className="terminal-text">Theme: {themeDisplayName}</span>
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </div>
  );
};

export default TerminalBanner;