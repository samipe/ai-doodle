import { useState, useEffect, useCallback } from 'react';
import { GyroscopeState, Particle, ThemeName } from '../types';

export function useGyroscope(currentTheme: ThemeName) {
  const [gyroState, setGyroState] = useState<GyroscopeState>({
    alpha: 0,
    beta: 0,
    gamma: 0,
    enabled: false
  });

  const [particles, setParticles] = useState<Particle[]>([]);
  const [gridTransform, setGridTransform] = useState('');

  const createParticles = useCallback(() => {
    const particleCount = 50;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = Math.random() * 500 - 250;
      
      // Random size
      const size = Math.random() * 5 + 2;
      
      // Theme-based colors
      let color = '';
      switch (currentTheme) {
        case 'vaporwave':
          const hue = Math.random() > 0.5 ? '300' : '180'; // pink or cyan
          color = `hsl(${hue}, 100%, 50%)`;
          break;
        case 'matrix':
          const brightness = Math.floor(Math.random() * 40) + 60;
          color = `hsl(120, 100%, ${brightness}%)`;
          break;
        case 'light':
          color = 'hsl(210, 80%, 60%)';
          break;
        case 'midnight':
          const isAccent = Math.random() > 0.8;
          const midnightHue = isAccent ? 36 : 210; // orange accent or blue
          color = `hsl(${midnightHue}, 100%, 50%)`;
          break;
        default:
          // Default/cyberpunk
          color = `hsl(${Math.random() > 0.5 ? '330' : '180'}, 100%, 50%)`;
      }
      
      newParticles.push({
        id: i,
        x, y, z,
        vx: 0, vy: 0, vz: 0,
        originalX: x,
        originalY: y,
        originalZ: z,
        size,
        color
      });
    }
    
    setParticles(newParticles);
  }, [currentTheme]);

  const updateParticles = useCallback(() => {
    if (!gyroState.enabled) return;
    
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        // Calculate velocity changes based on device orientation
        let vx = particle.vx + gyroState.gamma * 0.01;
        let vy = particle.vy + gyroState.beta * 0.01;
        let vz = particle.vz + gyroState.alpha * 0.01;
        
        // Apply damping
        vx *= 0.95;
        vy *= 0.95;
        vz *= 0.95;
        
        // Update position with velocity
        let x = particle.x + vx;
        let y = particle.y + vy;
        let z = particle.z + vz;
        
        // Add restitution force to pull back to original position
        const dx = particle.originalX - x;
        const dy = particle.originalY - y;
        const dz = particle.originalZ - z;
        
        vx += dx * 0.001;
        vy += dy * 0.001;
        vz += dz * 0.001;
        
        // Constrain to bounds
        if (x < 0 || x > 100) vx *= -0.7;
        if (y < 0 || y > 100) vy *= -0.7;
        if (z < -500 || z > 500) vz *= -0.7;
        
        return {
          ...particle,
          x, y, z,
          vx, vy, vz
        };
      })
    );
    
    // Update grid transform
    setGridTransform(`
      rotateX(${gyroState.beta * 0.5}deg) 
      rotateY(${gyroState.gamma * 0.5}deg) 
      rotateZ(${gyroState.alpha * 0.1}deg)
      translateZ(50px)
    `);
  }, [gyroState]);

  const handleOrientationEvent = useCallback((event: DeviceOrientationEvent) => {
    if (!gyroState.enabled) return;
    
    setGyroState(prev => ({
      ...prev,
      alpha: event.alpha || 0,
      beta: event.beta || 0,
      gamma: event.gamma || 0
    }));
  }, [gyroState.enabled]);

  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        // @ts-ignore - TypeScript doesn't know about this method
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          enableGyroscope();
        } else {
          alert('Permission to access device motion was denied.');
          return false;
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        alert('Error requesting permission. Make sure you\'re using a secure (HTTPS) connection.');
        return false;
      }
    } else {
      // No permission needed or not available
      enableGyroscope();
    }
    return true;
  }, []);

  const enableGyroscope = useCallback(() => {
    if (particles.length === 0) {
      createParticles();
    }
    
    setGyroState(prev => ({ ...prev, enabled: true }));
    window.addEventListener('deviceorientation', handleOrientationEvent);
  }, [particles.length, createParticles, handleOrientationEvent]);

  const disableGyroscope = useCallback(() => {
    setGyroState(prev => ({ ...prev, enabled: false }));
    window.removeEventListener('deviceorientation', handleOrientationEvent);
  }, [handleOrientationEvent]);

  useEffect(() => {
    // Animation loop for updating particles
    let animationFrame: number;
    
    if (gyroState.enabled) {
      const animate = () => {
        updateParticles();
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [gyroState.enabled, updateParticles]);

  // Recreate particles when theme changes
  useEffect(() => {
    if (gyroState.enabled) {
      createParticles();
    }
  }, [currentTheme, gyroState.enabled, createParticles]);

  return {
    gyroState,
    particles,
    gridTransform,
    enableGyroscope: requestPermission,
    disableGyroscope
  };
}