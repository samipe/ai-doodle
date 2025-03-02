import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { usePhysics } from './hooks/usePhysics';
import { useGyroscope } from './hooks/useGyroscope';
import TabBar from './components/TabBar/TabBar';
import TerminalBanner from './components/TerminalBanner/TerminalBanner';
import Terminal3D from './components/Terminal3D/Terminal3D';
import InsetCard from './components/InsetCard/InsetCard';
import Controls from './components/Controls/Controls';
import DebugInfo from './components/DebugInfo/DebugInfo';
import Gyroscope from './components/Gyroscope/Gyroscope';
import './styles/global.css';

// App content component needs access to theme context
const AppContent = () => {
  const { currentTheme } = useTheme();
  const physics = usePhysics();
  const gyroscope = useGyroscope(currentTheme);
  
  const handleGyroToggle = (enabled: boolean) => {
    if (enabled) {
      gyroscope.enableGyroscope();
    } else {
      gyroscope.disableGyroscope();
    }
  };
  
  return (
    <div className={`app ${currentTheme !== 'default' ? `theme-${currentTheme}` : ''}`}>
      <TabBar style={{ transform: physics.transforms.tabBar }} />
      
      {/* New 3D Terminal Section */}
      <Terminal3D />
      
      <TerminalBanner style={{ transform: physics.transforms.heroBanner }} />
      
      <InsetCard style={{ transform: physics.transforms.insetCard }} />
      
      {/* Placeholder sections */}
      <section className="section">
        <div className="content">
          <h1>Scroll Down</h1>
          <p>This demo uses scroll velocity to drive a pendulum physics simulation, creating a natural-feeling animation for the floating tab bar.</p>
          <p>Notice how the tab bar responds to your scrolling with inertia and natural physics.</p>
        </div>
      </section>
      
      <Gyroscope 
        enabled={gyroscope.gyroState.enabled}
        alpha={gyroscope.gyroState.alpha}
        beta={gyroscope.gyroState.beta}
        gamma={gyroscope.gyroState.gamma}
        particles={gyroscope.particles}
        gridTransform={gyroscope.gridTransform}
        onToggle={handleGyroToggle}
      />
      
      <Controls 
        params={physics.params}
        onParamsChange={physics.updateParams}
      />
      
      <DebugInfo state={physics.state} />
    </div>
  );
};

// Wrapper component that provides the theme context
const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;