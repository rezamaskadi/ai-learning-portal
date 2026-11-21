import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center max-w-2xl px-4">
      {/* Category / Super-title pill */}
      <span className="text-xs uppercase tracking-[0.3em] text-portal-accent font-medium mb-4 px-3 py-1 rounded-full bg-portal-accent/10 border border-portal-accent/20">
        AI Learning Portal
      </span>

      {/* Serif Hero Title with Italic Accent */}
      <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-sm">
        AI <span className="italic font-normal text-portal-accent">Creator</span> Labs
      </h1>

      {/* Subtitle */}
      <p className="text-portal-muted text-base sm:text-lg max-w-lg leading-relaxed">
        Explore curated resources, masterclass videos, and in-depth articles on artificial intelligence.
      </p>
    </div>
  );
};
