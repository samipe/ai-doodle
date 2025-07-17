import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create cyber wave shader material
const cyberWaveShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color("#00aaff") },
    uColorB: { value: new THREE.Color("#0066cc") },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      
      // Apply wave animation
      vec3 pos = position;
      float wave = sin(pos.x * 2.0 + uTime * 2.0) * cos(pos.y * 2.0 + uTime) * 0.2;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;

    void main() {
      // Grid effect
      float gridX = step(0.95, mod(vUv.x * 20.0, 1.0));
      float gridY = step(0.95, mod(vUv.y * 20.0, 1.0));
      float grid = gridX + gridY;
      
      // Scanning line effect
      float scanline = step(0.97, sin(vUv.y * 100.0 - uTime * 3.0));
      
      // Pulse effect
      float pulse = sin(uTime) * 0.5 + 0.5;
      
      // Color mixing with pulse
      vec3 color = mix(uColorA, uColorB, vUv.x * vUv.y * pulse);
      
      // Add grid and scan lines
      color = mix(color, vec3(1.0), grid * 0.7);
      color += scanline * 0.5;
      
      // X-ray style opacity - more transparent at the center
      float edgeFade = vUv.x * (1.0 - vUv.x) * 4.0 * vUv.y * (1.0 - vUv.y) * 4.0;
      float opacity = 0.7 * edgeFade + grid * 0.3;
      
      gl_FragColor = vec4(color, opacity);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide
};

const VibeSurfer = () => {
  const waveRef = useRef<THREE.Mesh>(null!);
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const surferRef = useRef<THREE.Group>(null!);
  
  // Create shader material
  const waveMaterial = new THREE.ShaderMaterial(cyberWaveShader);
  
  useFrame((state, delta) => {
    // Animate wave shader
    if (waveMaterial.uniforms) {
      waveMaterial.uniforms.uTime.value += delta;
    }
    
    // Animate surfer
    if (surferRef.current) {
      const time = state.clock.elapsedTime;
      
      // Move surfer along the wave
      const xPos = Math.sin(time * 0.4) * 2;
      surferRef.current.position.x = xPos;
      
      // Follow the wave height
      const waveHeight = Math.sin(xPos * 2 + time * 2) * 0.2;
      surferRef.current.position.y = waveHeight + 0.5;
      
      // Add surfing tilt
      surferRef.current.rotation.z = Math.sin(time) * 0.1;
      
      // Slight forward lean
      surferRef.current.rotation.x = 0.2 + Math.sin(time * 2) * 0.05;
    }
  });
  
  return (
    <group position={[0, 0, 0]}>
      {/* Cyber Wave */}
      <mesh ref={waveRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[12, 12, 32, 32]} />
        <shaderMaterial ref={shaderRef} args={[cyberWaveShader]} />
      </mesh>
      
      {/* Surfer with Surfboard */}
      <group ref={surferRef} position={[0, 0.5, 0]}>
        {/* Surfboard */}
        <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.06, 2.0]} />
          <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.3} />
        </mesh>
        
        {/* Low-poly human figure */}
        <group position={[0, 0.3, 0]}>
          {/* Body */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.3, 0.5, 0.2]} />
            <meshStandardMaterial color="#00aadd" />
          </mesh>
          
          {/* Head */}
          <mesh position={[0, 0.7, 0]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial color="#ffddcc" />
          </mesh>
          
          {/* Arms */}
          <mesh position={[0.25, 0.3, 0]} rotation={[0.2, 0.1, -0.5]}>
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshStandardMaterial color="#00aadd" />
          </mesh>
          
          <mesh position={[-0.25, 0.3, 0]} rotation={[0.2, -0.1, 0.5]}>
            <boxGeometry args={[0.1, 0.4, 0.1]} />
            <meshStandardMaterial color="#00aadd" />
          </mesh>
          
          {/* Legs */}
          <mesh position={[0.1, -0.1, 0]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.12, 0.4, 0.12]} />
            <meshStandardMaterial color="#0077aa" />
          </mesh>
          
          <mesh position={[-0.1, -0.1, 0]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.12, 0.4, 0.12]} />
            <meshStandardMaterial color="#0077aa" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default VibeSurfer;