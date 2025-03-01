import { memo } from 'react';
import { Particle } from '../../types';
import './Gyroscope.css';

interface GyroscopeProps {
  enabled: boolean;
  alpha: number;
  beta: number;
  gamma: number;
  particles: Particle[];
  gridTransform: string;
  onToggle: (enabled: boolean) => void;
}

const Gyroscope = ({
  enabled,
  alpha,
  beta,
  gamma,
  particles,
  gridTransform,
  onToggle
}: GyroscopeProps) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked);
  };
  
  return (
    <section className={`gyro-section ${enabled ? 'active' : ''}`}>
      <div className="gyro-visualization">
        <div className="gyro-particle-container">
          {particles.map(particle => (
            <div 
              key={particle.id}
              className="gyro-particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 8px ${particle.color}`,
                transform: `translateZ(${particle.z}px)`
              }}
            />
          ))}
        </div>
        <div 
          className="gyro-grid" 
          style={{ transform: gridTransform }}
        ></div>
      </div>
      
      <div className="gyro-content">
        <h2>Device Motion Visualizer</h2>
        <p>Experience your device's movement translated into digital space</p>
        
        <div className="toggle-container">
          <input 
            type="checkbox" 
            id="gyro-toggle" 
            checked={enabled} 
            onChange={handleToggle}
          />
          <label htmlFor="gyro-toggle" className="gyro-toggle-label">
            <div className="toggle-track">
              <div className="toggle-indicator">
                <div className="checkmark">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                  </svg>
                </div>
                <div className="cross">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <span className="toggle-label-text">Enable Gyroscope</span>
          </label>
        </div>
        
        <div className="gyro-status" style={{ display: enabled ? 'block' : 'none' }}>
          <div className="gyro-values">
            <div>α (alpha): <span>{Math.round(alpha)}°</span></div>
            <div>β (beta): <span>{Math.round(beta)}°</span></div>
            <div>γ (gamma): <span>{Math.round(gamma)}°</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Use memo to prevent unnecessary re-renders from particle animations
export default memo(Gyroscope);