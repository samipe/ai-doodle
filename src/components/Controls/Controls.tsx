import { useState } from 'react';
import { PhysicsParams } from '../../types';
import './Controls.css';

interface ControlsProps {
  params: PhysicsParams;
  onParamsChange: (newParams: Partial<PhysicsParams>) => void;
}

const Controls = ({ params, onParamsChange }: ControlsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  const handleDampingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onParamsChange({ damping: value });
  };
  
  const handleGravityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onParamsChange({ gravity: value });
  };
  
  const handleScrollFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onParamsChange({ scrollFactor: value });
  };
  
  const handleMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onParamsChange({ mass: value });
  };
  
  const handleMaxAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueDeg = parseInt(e.target.value);
    onParamsChange({ maxAngle: (valueDeg * Math.PI) / 180 });
  };
  
  // Convert maxAngle from radians to degrees for display
  const maxAngleDegrees = Math.round((params.maxAngle * 180) / Math.PI);
  
  return (
    <>
      <button 
        className={`toggle-button toggle-controls ${isVisible ? 'active' : ''}`}
        onClick={toggleVisibility}
      >
        +
      </button>
      
      <div className="controls-panel" style={{ display: isVisible ? 'block' : 'none' }}>
        <h4>Physics Controls</h4>
        
        <div className="slider-control">
          <label>
            Damping <span>{params.damping.toFixed(2)}</span>
          </label>
          <input 
            type="range" 
            min="0.8" 
            max="0.99" 
            step="0.01" 
            value={params.damping}
            onChange={handleDampingChange}
          />
        </div>
        
        <div className="slider-control">
          <label>
            Gravity <span>{params.gravity.toFixed(4)}</span>
          </label>
          <input 
            type="range" 
            min="0.0005" 
            max="0.005" 
            step="0.0005" 
            value={params.gravity}
            onChange={handleGravityChange}
          />
        </div>
        
        <div className="slider-control">
          <label>
            Responsiveness <span>{params.scrollFactor.toFixed(3)}</span>
          </label>
          <input 
            type="range" 
            min="0.001" 
            max="0.05" 
            step="0.001" 
            value={params.scrollFactor}
            onChange={handleScrollFactorChange}
          />
        </div>
        
        <div className="slider-control">
          <label>
            Mass <span>{params.mass.toFixed(1)}</span>
          </label>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.1" 
            value={params.mass}
            onChange={handleMassChange}
          />
        </div>
        
        <div className="slider-control">
          <label>
            Max Angle <span>{maxAngleDegrees}°</span>
          </label>
          <input 
            type="range" 
            min="10" 
            max="90" 
            step="1" 
            value={maxAngleDegrees}
            onChange={handleMaxAngleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Controls;