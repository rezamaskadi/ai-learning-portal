'use client';

import React, { useState } from 'react';
import { resources, resourceCategories } from '@/data/resources';
import { ResourceGrid } from '@/components/resources/ResourceGrid';
import { Resource } from '@/lib/types';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredResources =
    selectedCategory === 'All'
      ? resources
      : resources.filter((r: Resource) => r.category === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Title & Subtitle */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Resources
        </h1>
        <p className="text-portal-muted text-base sm:text-lg">
          Curated guides, frameworks, and architecture blueprints for AI practitioners.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {resourceCategories.map((category: string) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${
                isActive
                  ? 'bg-purple-600/30 text-white border-purple-400/50 shadow-[0_0_15px_rgba(167,139,250,0.3)] font-semibold'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]'
                    : 'bg-transparent'
                }`}
              />
              <span>{category}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <ResourceGrid resources={filteredResources} />
    </div>
  );
}
