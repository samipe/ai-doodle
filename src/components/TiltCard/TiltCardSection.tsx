import { useRef } from 'react';
import './TiltCardSection.css';

const TiltCardSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    cardRef.current!.style.transform = `rotateX(${-y * 20}deg) rotateY(${x * 20}deg)`;
  };

  const reset = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <section className="tilt-card-section">
      <div
        className="tilt-card-wrapper"
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        <div className="tilt-card" ref={cardRef}>
          <h2>Move Your Mouse</h2>
          <p>This card tilts toward your cursor.</p>
        </div>
      </div>
    </section>
  );
};

export default TiltCardSection;
