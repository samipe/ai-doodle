import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import './StarFieldSection.css';

const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pts = new Float32Array(3000);
    for (let i = 0; i < pts.length; i++) {
      pts[i] = (Math.random() - 0.5) * 20;
    }
    return pts;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} />
    </points>
  );
};

const StarFieldSection = () => {
  return (
    <section className="star-field-section">
      <Canvas camera={{ position: [0, 0, 5] }} className="star-field-canvas">
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default StarFieldSection;
