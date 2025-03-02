import { CSSProperties } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeName } from '../../types';
import './TabBar.css';

interface TabBarProps {
  style?: CSSProperties;
}

const TabBar = ({ style }: TabBarProps) => {
  const { currentTheme, switchTheme } = useTheme();
  
  const tabs: { name: string; theme: ThemeName }[] = [
    { name: 'Cyberpunk', theme: 'default' },
    { name: 'Vaporwave', theme: 'vaporwave' },
    { name: 'Matrix', theme: 'matrix' },
    { name: 'Light', theme: 'light' },
    { name: 'Midnight', theme: 'midnight' }
  ];
  
  return (
    <div className="tab-bar-container">
      <div className='tab-bar-overlay' style={style}>
        <div className="tab-gradient left"></div>
        <div className="tab-gradient right"></div>
      </div>
      <div className="tab-bar" style={style}>
        {tabs.map(tab => (
          <div 
            key={tab.theme}
            className={`tab ${currentTheme === tab.theme ? 'active' : ''}`}
            onClick={() => switchTheme(tab.theme)}
          >
            {tab.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;