import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import './StarFieldSection.css';

const StarFieldSection = () => {
  return (
    <section className="star-field-section">
      <Canvas className="star-field-canvas" camera={{ position: [0, 0, 1] }}>
        <Stars radius={50} depth={20} count={5000} factor={4} fade speed={1} />
      </Canvas>
    </section>
  );
};

export default StarFieldSection;
