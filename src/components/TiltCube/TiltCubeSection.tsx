import { useEffect, useRef } from 'react';
import './TiltCubeSection.css';

const TiltCubeSection = () => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: DeviceOrientationEvent) => {
      const beta = e.beta || 0;
      const gamma = e.gamma || 0;
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${beta}deg) rotateY(${gamma}deg)`;
      }
    };
    window.addEventListener('deviceorientation', handle);
    return () => window.removeEventListener('deviceorientation', handle);
  }, []);

  return (
    <section className="tilt-cube-section">
      <div className="tilt-cube" ref={cubeRef}>
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face left"></div>
        <div className="face right"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </section>
  );
};

export default TiltCubeSection;
