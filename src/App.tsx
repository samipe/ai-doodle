import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { usePhysics } from './hooks/usePhysics';
import { useGyroscope } from './hooks/useGyroscope';
import TabBar from './components/TabBar/TabBar';
import TerminalBanner from './components/TerminalBanner/TerminalBanner';
import Terminal3D from './components/Terminal3D/Terminal3D';
import VibeSurferSection from './components/VibeSurfer/VibeSurferSection';
import AudioVisualizerSection from './components/AudioVisualizer/AudioVisualizerSection';
import InsetCard from './components/InsetCard/InsetCard';
import Controls from './components/Controls/Controls';
import DebugInfo from './components/DebugInfo/DebugInfo';
import Gyroscope from './components/Gyroscope/Gyroscope';
import PinkSphereSection from './components/PinkSphere/PinkSphereSection';
import './styles/global.css';
import PageSection from './components/PageSection/PageSection';
import CubeScene from './components/ThreeCube/CubeScene';

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

      <PageSection bgEl={<CubeScene />} bgStyle='patterned'>
        <TerminalBanner style={{ transform: physics.transforms.heroBanner }} />
      </PageSection>

      <Terminal3D />

      <PinkSphereSection />

      <VibeSurferSection />

      <PageSection bgStyle='crazy'>
        <InsetCard style={{ transform: physics.transforms.insetCard }} />
      </PageSection>

      <AudioVisualizerSection />
      
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
