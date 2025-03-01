import { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ThreeCube from './ThreeCube';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeName } from '../../types';

const getThemeFogColor = (theme: ThemeName): string => {
  switch (theme) {
    case 'vaporwave':
      return '#000066';
    case 'matrix':
      return '#001100';
    case 'light':
      return '#f0f0f0';
    case 'midnight':
      return '#050d16';
    default: // Cyberpunk
      return '#0a0a0a';
  }
};

interface CubeSceneProps {
  children?: ReactNode;
}

const CubeScene = ({ children }: CubeSceneProps) => {
  const { currentTheme } = useTheme();
  const fogColor = getThemeFogColor(currentTheme);
  
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <fog attach="fog" args={[fogColor, 5, 25]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0099" />
        
        <ThreeCube wireframe={true} size={4} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
      {children}
    </div>
  );
};

export default CubeScene;