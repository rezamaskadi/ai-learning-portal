'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { resources, resourceCategories } from '@/data/resources';
import { ResourceGrid } from '@/components/resources/ResourceGrid';
import { Resource } from '@/lib/types';

function ResourcesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter based on selectedCategory AND queryParam q
  const filteredResources = useMemo(() => {
    let result = resources;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((r: Resource) => r.category === selectedCategory);
    }

    // Filter by Search Query
    if (queryParam.trim()) {
      const q = queryParam.trim().toLowerCase();
      result = result.filter(
        (r: Resource) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, queryParam]);

  const handleResetSearch = () => {
    router.push('/resources');
  };

  const handleResetAll = () => {
    setSelectedCategory('All');
    router.push('/resources');
  };

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

      {/* Search Status Banner if 'q' is active */}
      {queryParam.trim() && (
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-purple-400">🔍</span>
            <span className="text-slate-200">
              Hasil untuk <strong className="text-white font-semibold">&ldquo;{queryParam}&rdquo;</strong>
              <span className="text-portal-muted ml-1.5">— {filteredResources.length} item ditemukan</span>
            </span>
          </div>
          <button
            onClick={handleResetSearch}
            className="text-xs px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white border border-white/[0.1] transition-all"
          >
            ✕ Reset pencarian
          </button>
        </div>
      )}

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

      {/* Grid or Empty State */}
      {filteredResources.length > 0 ? (
        <ResourceGrid resources={filteredResources} />
      ) : (
        <div className="w-full py-16 px-6 text-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-xl text-purple-400">
            🔍
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Tidak ada hasil yang cocok
            </h3>
            <p className="text-sm text-portal-muted max-w-md">
              {queryParam
                ? `Tidak ada sumber daya yang cocok dengan pencarian "${queryParam}"${selectedCategory !== 'All' ? ` dalam kategori "${selectedCategory}"` : ''}.`
                : `Tidak ada sumber daya dalam kategori "${selectedCategory}".`}
            </p>
          </div>
          <button
            onClick={handleResetAll}
            className="mt-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-6xl mx-auto px-4 py-20 text-center text-portal-muted">
        Memuat resources...
      </div>
    }>
      <ResourcesContent />
    </Suspense>
  );
}
