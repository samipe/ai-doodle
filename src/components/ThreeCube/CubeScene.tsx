import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
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
  noiseIntensity?: number;
  noiseBlendFunction?: BlendFunction;
  vignetteEnabled?: boolean;
  backgroundColor?: string;
  cubeColor?: string;
}

export const CubeScene: React.FC<CubeSceneProps> = ({
  noiseIntensity = 0.2,
  noiseBlendFunction = BlendFunction.OVERLAY,
  vignetteEnabled = true,
  backgroundColor = '#111',
  cubeColor = '#ff3e00'
}) => {
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
        
        {/* Post-processing effects */}
        <EffectComposer 
          enabled 
          multisampling={0} // Disable multisampling for performance
          frameBufferType={16} // Use HALF_FLOAT buffer type for better performance
        >
          <Noise 
            opacity={noiseIntensity} 
            blendFunction={noiseBlendFunction}
            premultiply // Optimize blend operation
          />
          {vignetteEnabled && (
            <Vignette
              offset={0.3}
              darkness={0.7}
              blendFunction={BlendFunction.NORMAL}
            />
          )}
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

export default CubeScene;