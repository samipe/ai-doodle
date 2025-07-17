import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
// Postprocessing disabled to keep bundle small
import { Mesh } from 'three'

interface CubeProps {
  position?: [number, number, number];
  color?: string;
  rotationSpeed?: number;
}

const Cube: React.FC<CubeProps> = ({ 
  position = [0, 0, 0], 
  color = '#ff3e00',
  rotationSpeed = 0.01
}) => {
  const meshRef = useRef<Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

interface CubeSceneProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  cubeColor?: string;
}

const CubeScene = ({ children, backgroundColor = '#111', cubeColor = '#ff3e00' }: CubeSceneProps) => {
  // Pre-define config to avoid unnecessary recalculations
  const glConfig = useMemo(() => ({
    powerPreference: 'high-performance',
    antialias: false, // Disable built-in antialias for perf
    precision: 'lowp', // Use lower precision for better performance
    depth: true
  }), []);

  return (
    <Canvas
      dpr={0.5} // Fixed low resolution as artistic choice
      gl={glConfig}
      frameloop="demand" // Only renders when needed
      style={{ background: backgroundColor }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Scene content */}
        <Cube color={cubeColor} />
        <Cube position={[-1.5, 0, 0]} color="#0099ff" rotationSpeed={0.02} />
        <Cube position={[1.5, 0, 0]} color="#44cc00" rotationSpeed={0.015} />
      </Suspense>
      {children}
    </Canvas>
  )
}

export default CubeScene;