import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeName } from '../../types';
import * as THREE from 'three';

const getThemeColors = (theme: ThemeName): { emissive: string, color: string, intensity: number } => {
  switch (theme) {
    case 'vaporwave':
      return { emissive: '#ff00ff', color: '#00ffff', intensity: 0.5 };
    case 'matrix':
      return { emissive: '#00ff00', color: '#003300', intensity: 0.7 };
    case 'light':
      return { emissive: '#3498db', color: '#e0e0e0', intensity: 0.3 };
    case 'midnight':
      return { emissive: '#1e88e5', color: '#0a1929', intensity: 0.4 };
    default: // Cyberpunk
      return { emissive: '#ff0099', color: '#0a0a0a', intensity: 0.6 };
  }
};

interface ThreeCubeProps {
  wireframe?: boolean;
  size?: number;
  rotationSpeed?: number;
}

const ThreeCube = ({ 
  wireframe = true, 
  size = 5,
  rotationSpeed = 0.01
}: ThreeCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const { currentTheme } = useTheme();
  
  // Update material based on current theme
  useEffect(() => {
    if (materialRef.current) {
      const { emissive, color, intensity } = getThemeColors(currentTheme);
      materialRef.current.emissive = new THREE.Color(emissive);
      materialRef.current.color = new THREE.Color(color);
      materialRef.current.emissiveIntensity = intensity;
    }
  }, [currentTheme]);
  
  // Rotate cube on each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * 0.5;
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.z += rotationSpeed * 0.25;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[size, size, size]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        ref={materialRef} 
        wireframe={wireframe}
        transparent={true}
        opacity={0.7}
      />
    </mesh>
  );
};

export default ThreeCube;