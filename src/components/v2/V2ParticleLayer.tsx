'use client';

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export const V2ParticleLayer: React.FC = () => {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  if (!init || reducedMotion) return null;

  const options: ISourceOptions = {
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 60,
    particles: {
      number: {
        value: isMobile ? 15 : 40,
        density: { enable: true, width: 800, height: 800 },
      },
      color: { value: ['#a78bfa', '#93c5fd', '#ffffff'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: { enable: true, speed: 0.5, sync: false },
      },
      size: { value: { min: 1, max: 2.5 } },
      move: {
        enable: true,
        speed: 0.4,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <Particles id="tsparticles-v2" className="w-full h-full" options={options} />
    </div>
  );
};
