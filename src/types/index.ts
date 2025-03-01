export type ThemeName = 'default' | 'vaporwave' | 'matrix' | 'light' | 'midnight';

export interface PhysicsParams {
  length: number;
  gravity: number;
  damping: number;
  maxAngle: number;
  scrollFactor: number;
  mass: number;
}

export interface PhysicsState {
  lastScrollY: number;
  scrollVelocity: number;
  lastScrollVelocity: number;
  scrollAcceleration: number;
  angle: number;
  angularVelocity: number;
}

export interface Transform {
  tabBar: string;
  insetCard: string;
  heroBanner: string;
}

export interface GyroscopeState {
  alpha: number;
  beta: number;
  gamma: number;
  enabled: boolean;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  size: number;
  color: string;
}