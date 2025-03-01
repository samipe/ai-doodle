import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { usePhysics } from './hooks/usePhysics';
import { useGyroscope } from './hooks/useGyroscope';
import TabBar from './components/TabBar/TabBar';
import PageSection from './components/PageSection/PageSection';
import ScrollContainer from './components/ScrollContainer';
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
      
      <ScrollContainer>
        <PageSection bgStyle="plain" id="section1">
          <h1>Welcome</h1>
          <p>This demo uses scroll velocity to drive a pendulum physics simulation.</p>
        </PageSection>
        
        <PageSection bgStyle="colorful" id="section2">
          <h1>Colorful Section</h1>
          <p>This section has a colorful gradient background.</p>
        </PageSection>
        
        <PageSection bgStyle="patterned" id="section3">
          <h1>Patterned Section</h1>
          <p>This section has a patterned background.</p>
        </PageSection>
        
        <PageSection bgStyle="animated" id="section4">
          <h1>Animated Section</h1>
          <p>This section has a subtly animated background.</p>
        </PageSection>
        
        <PageSection bgStyle="crazy" id="section5">
          <h1>Crazy Section</h1>
          <p>This section has a more elaborate animated background.</p>
        </PageSection>
      </ScrollContainer>
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