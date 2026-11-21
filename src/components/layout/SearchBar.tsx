'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function SearchBarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(currentQuery);

  // Synchronize input value with URL search params (e.g. back/forward, tab switch)
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const getPlaceholder = () => {
    if (pathname.startsWith('/resources')) return 'Cari resources, panduan, arsitektur...';
    if (pathname.startsWith('/knowledges')) return 'Cari video tutorial, masterclass...';
    if (pathname.startsWith('/articles')) return 'Cari artikel teknis, riset, topik...';
    return 'Cari di seluruh portal AI...';
  };

  const getTargetBase = () => {
    if (pathname.startsWith('/resources')) return '/resources';
    if (pathname.startsWith('/knowledges')) return '/knowledges';
    if (pathname.startsWith('/articles')) return '/articles';
    return '/resources';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = getTargetBase();
    if (query.trim()) {
      router.push(`${target}?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(target);
    }
  };

  const handleClear = () => {
    setQuery('');
    const target = getTargetBase();
    router.push(target);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full group">
      <div className="relative flex items-center rounded-xl bg-[#0d0e22]/90 backdrop-blur-md border border-white/[0.12] group-hover:border-purple-400/50 group-focus-within:border-purple-400/80 px-3.5 py-2 shadow-sm transition-all duration-200">
        {/* Search icon */}
        <svg
          className="w-4 h-4 text-purple-400 mr-2.5 flex-shrink-0 group-focus-within:text-purple-300 transition-colors"
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

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400/70 focus:outline-none"
        />

        {/* Clear or Submit action */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-slate-400 hover:text-white p-1 rounded-full text-xs hover:bg-white/[0.1] transition-colors mr-1"
            title="Hapus pencarian"
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-600/30 text-purple-200 hover:bg-purple-600/50 hover:text-white border border-purple-400/30 transition-all flex-shrink-0"
        >
          Cari
        </button>
      </div>
    </form>
  );
}

export const SearchBar: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="w-full h-9 rounded-xl bg-white/[0.04] border border-white/[0.08]" />
    }>
      <SearchBarContent />
    </Suspense>
  );
};
