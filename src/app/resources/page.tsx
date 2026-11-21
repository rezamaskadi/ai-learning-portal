'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { resources, resourceCategories } from '@/data/resources';
import { ResourceGrid } from '@/components/resources/ResourceGrid';
import { Resource } from '@/lib/types';

function ResourcesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [inputVal, setInputVal] = useState<string>(queryParam);

  useEffect(() => {
    setInputVal(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (categoryParam && resourceCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  // Filter based on selectedCategory AND queryParam q (with multi-term matching)
  const filteredResources = useMemo(() => {
    let result = resources;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((r: Resource) => r.category === selectedCategory);
    }

    // Filter by Search Query
    if (queryParam.trim()) {
      const rawQ = queryParam.trim().toLowerCase();
      const terms = rawQ.split(/\s+/).filter((t) => t.length > 1);

      result = result.filter((r: Resource) => {
        const fullText = `${r.title} ${r.description} ${r.category}`.toLowerCase();
        return (
          fullText.includes(rawQ) ||
          (terms.length > 0 && terms.some((term) => fullText.includes(term)))
        );
      });
    }

    return result;
  }, [selectedCategory, queryParam]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    const qStr = params.toString();
    router.push(qStr ? `/resources?${qStr}` : '/resources');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (inputVal.trim()) {
      params.set('q', inputVal.trim());
    } else {
      params.delete('q');
    }
    const qStr = params.toString();
    router.push(qStr ? `/resources?${qStr}` : '/resources');
  };

  const handleResetSearch = () => {
    setInputVal('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    const qStr = params.toString();
    router.push(qStr ? `/resources?${qStr}` : '/resources');
  };

  const handleResetAll = () => {
    setInputVal('');
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
          Panduan terkurasi, framework, dan blueprint arsitektur bagi praktisi AI.
        </p>
      </div>

      {/* In-page Search Bar on Resources */}
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="relative flex items-center rounded-xl bg-portal-card/60 border border-portal-border/80 focus-within:border-purple-400/80 px-4 py-2.5 backdrop-blur-sm shadow-sm transition-all">
            <svg
              className="w-4 h-4 text-purple-400 mr-2.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Cari resources berdasarkan judul, framework, topik..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="text-slate-400 hover:text-white text-xs px-2"
                title="Hapus pencarian"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="text-xs px-3 py-1 rounded-lg bg-purple-600/30 text-purple-200 hover:bg-purple-600/50 hover:text-white border border-purple-400/30 font-medium transition-all"
            >
              Cari
            </button>
          </div>
        </form>
      </div>

      {/* Search Status Banner if 'q' is active */}
      {queryParam.trim() && (
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-purple-400">🔍</span>
            <span className="text-slate-200">
              Hasil untuk <strong className="text-white font-semibold">&ldquo;{queryParam}&rdquo;</strong>
              <span className="text-portal-muted ml-1.5">— {filteredResources.length} item ditemukan</span>
              {selectedCategory !== 'All' && (
                <span className="text-purple-300 ml-1">(Kategori: {selectedCategory})</span>
              )}
            </span>
          </div>
          <button
            onClick={handleResetSearch}
            className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white border border-white/[0.1] transition-all"
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
              onClick={() => handleCategoryClick(category)}
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
