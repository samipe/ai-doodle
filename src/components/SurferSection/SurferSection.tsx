import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import VibeSurfer from '../ThreeCube/VibeSurfer';
import './SurferSection.css';

const SurferSection = () => {
  return (
    <section className="surfer-section">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 60 }} className="surfer-canvas">
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 3, 2]} />
        <Suspense fallback={null}>
          <VibeSurfer />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default SurferSection;
