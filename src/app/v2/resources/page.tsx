'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { v2Resources, v2ResourceCategories } from '@/data/v2/resources';
import { matchesSearchQuery } from '@/lib/search';
import { Resource } from '@/lib/types';

function V2EditorialResourcesContent() {
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
    if (categoryParam && v2ResourceCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const filteredResources = useMemo(() => {
    let result = v2Resources;

    if (selectedCategory !== 'All') {
      result = result.filter((r: Resource) => r.category === selectedCategory);
    }

    if (queryParam.trim()) {
      result = result.filter((r: Resource) =>
        matchesSearchQuery([r.title, r.description, r.category], queryParam)
      );
    }

    return result;
  }, [selectedCategory, queryParam]);

  const showGrouped = selectedCategory === 'All' && !queryParam.trim();
  const categoryOrder = v2ResourceCategories.filter((c) => c !== 'All');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    const qStr = params.toString();
    router.push(qStr ? `/v2/resources?${qStr}` : '/v2/resources');
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
    router.push(qStr ? `/v2/resources?${qStr}` : '/v2/resources');
  };

  const handleResetSearch = () => {
    setInputVal('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    const qStr = params.toString();
    router.push(qStr ? `/v2/resources?${qStr}` : '/v2/resources');
  };

  const handleResetAll = () => {
    setInputVal('');
    setSelectedCategory('All');
    router.push('/v2/resources');
  };

  const renderItem = (item: Resource) => (
    <Link
      key={item.id}
      href={`/v2/resources/${item.slug}`}
      className="group border-t border-white/15 pt-4 pb-2 flex flex-col justify-between gap-4 hover:border-portal-accent transition-colors"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-portal-accent font-semibold">
          <span>{item.category}</span>
          <span className="text-portal-muted group-hover:text-white transition-colors">→</span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-portal-accent transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-portal-muted leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-12 flex flex-col gap-10">
      {/* Editorial Header + Hairline Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="max-w-xl">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white mb-3">
            Resources
          </h1>
          <p className="text-portal-muted text-base sm:text-lg leading-relaxed">
            Curated guides, frameworks, and architecture blueprints for AI practitioners.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 flex-shrink-0">
          <div className="flex items-center border-b border-white/20 focus-within:border-portal-accent py-2 gap-2.5 transition-colors">
            <svg
              className="w-4 h-4 text-portal-accent flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search guides or frameworks..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="text-xs text-slate-300 hover:text-white px-1"
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white transition-colors"
            >
              Find
            </button>
          </div>
        </form>
      </div>

      {/* Category Filter Row + Search Status */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {v2ResourceCategories.map((category: string) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border ${
                  isActive
                    ? 'border-portal-accent bg-portal-purple/20 text-white'
                    : 'border-white/15 text-slate-300 hover:border-portal-accent/80 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {queryParam.trim() && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-3 text-sm">
            <span className="text-slate-200">
              Showing <strong className="text-white tabular-nums">{filteredResources.length}</strong>{' '}
              {filteredResources.length === 1 ? 'result' : 'results'} for{' '}
              <strong className="text-white">&ldquo;{queryParam}&rdquo;</strong>
              {selectedCategory !== 'All' && (
                <span className="text-portal-accent ml-1">in {selectedCategory}</span>
              )}
            </span>
            <button
              type="button"
              onClick={handleResetSearch}
              className="text-xs font-medium text-portal-muted hover:text-white transition-colors"
            >
              Reset search ✕
            </button>
          </div>
        )}
      </div>

      {/* Ruled Editorial Content */}
      {filteredResources.length === 0 ? (
        <div className="py-16 px-6 text-center border border-dashed border-white/15 rounded-xl flex flex-col items-center gap-4">
          <h2 className="font-serif text-2xl font-bold text-white">No matching resources</h2>
          <p className="text-sm text-portal-muted max-w-md">
            {queryParam
              ? `No resources matched "${queryParam}"${selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}.`
              : `No resources found in "${selectedCategory}".`}
          </p>
          <button
            type="button"
            onClick={handleResetAll}
            className="rounded-full border border-white/20 hover:border-portal-accent px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Reset all filters
          </button>
        </div>
      ) : showGrouped ? (
        <div className="flex flex-col gap-12">
          {categoryOrder.map((cat, idx) => {
            const groupItems = filteredResources.filter((r) => r.category === cat);
            if (groupItems.length === 0) return null;
            return (
              <section key={cat} className="flex flex-col gap-5">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2.5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-portal-accent tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-white">{cat}</h2>
                  </div>
                  <span className="text-xs text-portal-muted tabular-nums">
                    {groupItems.length} guides
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                  {groupItems.map(renderItem)}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {filteredResources.map(renderItem)}
        </div>
      )}
    </div>
  );
}

export default function V2ResourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-6xl mx-auto px-5 py-20 text-center text-sm text-portal-muted">
          Loading resources...
        </div>
      }
    >
      <V2EditorialResourcesContent />
    </Suspense>
  );
}
