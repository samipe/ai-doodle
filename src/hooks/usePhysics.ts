import { useState, useEffect, useRef } from 'react';
import { PhysicsParams, PhysicsState, Transform } from '../types';

const defaultParams: PhysicsParams = {
  length: 120,
  gravity: 0.002,
  damping: 0.96,
  maxAngle: Math.PI / 5, // 36 degrees
  scrollFactor: 0.01,
  mass: 2.5
};

export function usePhysics(initialParams: Partial<PhysicsParams> = {}) {
  const params = useRef<PhysicsParams>({
    ...defaultParams,
    ...initialParams
  });

  const [state, setState] = useState<PhysicsState>({
    lastScrollY: 0,
    scrollVelocity: 0,
    lastScrollVelocity: 0,
    scrollAcceleration: 0,
    angle: 0,
    angularVelocity: 0
  });

  const [transforms, setTransforms] = useState<Transform>({
    tabBar: '',
    insetCard: '',
    heroBanner: ''
  });

  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const updateScrollVelocity = () => {
    setState(prevState => {
      const currentScrollY = window.scrollY;
      const lastScrollVelocity = prevState.scrollVelocity;
      const scrollVelocity = currentScrollY - prevState.lastScrollY;
      const scrollAcceleration = scrollVelocity - lastScrollVelocity;
      
      return {
        ...prevState,
        lastScrollY: currentScrollY,
        scrollVelocity,
        lastScrollVelocity,
        scrollAcceleration
      };
    });
  };

  const updateParams = (newParams: Partial<PhysicsParams>) => {
    params.current = { ...params.current, ...newParams };
  };

  const updatePendulum = (deltaTime: number) => {
    setState(prevState => {
      // Calculate physics
      const accelerationImpulse = prevState.scrollAcceleration * params.current.scrollFactor;
      const prevAngularVel = prevState.angularVelocity;
      
      // Apply acceleration impulse with mass factor
      let angularVelocity = prevState.angularVelocity + 
        (accelerationImpulse / params.current.mass);
      
      // Calculate gravitational force
      const gravityForce = Math.sin(prevState.angle) * params.current.gravity * deltaTime;
      
      // Apply gravitational force
      angularVelocity -= gravityForce;
      
      // Apply damping
      angularVelocity *= params.current.damping;
      
      // Add rebound effect on direction changes
      if (prevAngularVel * angularVelocity < 0 && Math.abs(prevAngularVel) > 0.005) {
        angularVelocity *= 1.2;
      }
      
      // Update angle
      let angle = prevState.angle + angularVelocity;
      
      // Limit angle to max range
      angle = Math.max(
        -params.current.maxAngle,
        Math.min(params.current.maxAngle, angle)
      );
      
      return {
        ...prevState,
        angle,
        angularVelocity
      };
    });

    // Calculate and update transforms
    setState(prevState => {
      const { angle } = prevState;
      
      // Calculate 3D transforms
      const rotateX = -angle * (180 / Math.PI);
      const translateY = -Math.sin(angle) * 30;
      const translateZ = Math.abs(Math.sin(angle)) * -20;
      
      // Set transforms
      setTransforms({
        tabBar: `
          rotateX(${rotateX}deg)
          translate3d(0, ${translateY}px, ${translateZ}px)
        `,
        insetCard: `
          translate3d(0, ${-Math.sin(angle) * 10}px, ${Math.abs(Math.sin(angle)) * -20}px)
          rotateX(${Math.sin(angle) * 3}deg)
          rotateZ(${Math.sin(angle) * 1.5}deg)
        `,
        heroBanner: `
          translate3d(0, ${-Math.sin(angle) * 5}px, 0)
          rotateZ(${Math.sin(angle) * 0.8}deg)
        `
      });
      
      return prevState;
    });
  };

  const animate = (time: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = time;
    }
    
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    updateScrollVelocity();
    updatePendulum(deltaTime);
    
    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleScroll = () => {
      // The physics calculations happen in animation frame
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    state,
    params: params.current,
    transforms,
    updateParams
  };
}