import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import VibeSurfer from '../ThreeCube/VibeSurfer';
import './VibeSurferSection.css';

const VibeSurferSection = () => {
  return (
    <section className="vibe-surfer-section">
      <Canvas className="vibe-canvas" camera={{ position: [0, 2, 6] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5,5,5]} />
        <Suspense fallback={null}>
          <VibeSurfer />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default VibeSurferSection;
