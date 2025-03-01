import { useState } from 'react';
import { PhysicsState } from '../../types';
import './DebugInfo.css';

interface DebugInfoProps {
  state: PhysicsState;
}

const DebugInfo = ({ state }: DebugInfoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  // Convert angle from radians to degrees
  const angleDegrees = (state.angle * (180 / Math.PI)).toFixed(1);
  
  return (
    <>
      <button 
        className={`toggle-button toggle-debug ${isVisible ? 'active' : ''}`}
        onClick={toggleVisibility}
      >
        ?
      </button>
      
      <div className="debug-info" style={{ display: isVisible ? 'block' : 'none' }}>
        <h4>Debug Info</h4>
        Scroll: <span>{Math.round(state.lastScrollY)}</span><br />
        Velocity: <span>{state.scrollVelocity.toFixed(2)}</span><br />
        Angle: <span>{angleDegrees}</span>°<br />
        Acceleration: <span>{state.scrollAcceleration.toFixed(2)}</span>
      </div>
    </>
  );
};

export default DebugInfo;