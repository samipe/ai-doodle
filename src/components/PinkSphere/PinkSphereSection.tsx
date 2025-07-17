import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './PinkSphereSection.css';

const RotatingSphere = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#ff0088" />
    </mesh>
  );
};

const PinkSphereSection = () => {
  return (
    <section className="pink-sphere-section">
      <Canvas className="pink-sphere-canvas" dpr={1} camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <RotatingSphere />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default PinkSphereSection;
