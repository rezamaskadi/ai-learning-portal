'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { v2Articles, v2AllTags } from '@/data/v2/articles';
import { matchesSearchQuery } from '@/lib/search';
import { Article } from '@/lib/types';

function V2EditorialArticlesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';
  const tagParam = searchParams.get('tag') || 'All';

  const [activeTag, setActiveTag] = useState<string>(tagParam);
  const [inputVal, setInputVal] = useState<string>(queryParam);

  useEffect(() => {
    setInputVal(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (tagParam && v2AllTags.includes(tagParam)) {
      setActiveTag(tagParam);
    } else {
      setActiveTag('All');
    }
  }, [tagParam]);

  const tagCounts = useMemo(() => {
    const searched = queryParam.trim()
      ? v2Articles.filter((a: Article) =>
          matchesSearchQuery([a.title, a.excerpt, ...a.tags], queryParam)
        )
      : v2Articles;

    const counts: Record<string, number> = { All: searched.length };
    v2AllTags.forEach((t) => {
      if (t !== 'All') {
        counts[t] = searched.filter((a) => a.tags.includes(t)).length;
      }
    });
    return counts;
  }, [queryParam]);

  const filteredArticles = useMemo(() => {
    let result = v2Articles;

    if (activeTag !== 'All') {
      result = result.filter((a: Article) => a.tags.includes(activeTag));
    }

    if (queryParam.trim()) {
      result = result.filter((a: Article) =>
        matchesSearchQuery([a.title, a.excerpt, ...a.tags], queryParam)
      );
    }

    return result;
  }, [activeTag, queryParam]);

  const handleSelectTag = (tag: string) => {
    setActiveTag(tag);
    const params = new URLSearchParams(searchParams.toString());
    if (tag === 'All') {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    const qStr = params.toString();
    router.push(qStr ? `/v2/articles?${qStr}` : '/v2/articles');
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
    router.push(qStr ? `/v2/articles?${qStr}` : '/v2/articles');
  };

  const handleResetSearch = () => {
    setInputVal('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    const qStr = params.toString();
    router.push(qStr ? `/v2/articles?${qStr}` : '/v2/articles');
  };

  const handleResetAll = () => {
    setInputVal('');
    setActiveTag('All');
    router.push('/v2/articles');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-12 flex flex-col gap-10">
      {/* Editorial Header + Hairline Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="max-w-xl">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white mb-3">
            {activeTag === 'All' ? 'Articles' : activeTag}
          </h1>
          <p className="text-portal-muted text-base sm:text-lg leading-relaxed">
            {activeTag === 'All'
              ? 'In-depth analysis, research breakdowns, and practical AI engineering insights.'
              : `Showing ${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'} tagged under "${activeTag}".`}
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
              placeholder="Search articles or topics..."
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

      {/* Search Status Banner */}
      {queryParam.trim() && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-3 text-sm">
          <span className="text-slate-200">
            Showing <strong className="text-white tabular-nums">{filteredArticles.length}</strong>{' '}
            {filteredArticles.length === 1 ? 'article' : 'articles'} for{' '}
            <strong className="text-white">&ldquo;{queryParam}&rdquo;</strong>
            {activeTag !== 'All' && (
              <span className="text-portal-accent ml-1">under {activeTag}</span>
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

      {/* 12-Col Editorial Tag Rail + Ruled Article Feed */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Tag Index */}
        <aside className="md:col-span-3">
          {/* Mobile Horizontal Tag Pills */}
          <div className="md:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {v2AllTags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSelectTag(tag)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border flex items-center gap-1.5 ${
                    isActive
                      ? 'border-portal-accent bg-portal-purple/20 text-white'
                      : 'border-white/15 text-slate-300 hover:border-portal-accent/80 hover:text-white'
                  }`}
                >
                  <span>{tag}</span>
                  <span className="text-[11px] text-portal-muted tabular-nums">
                    {tagCounts[tag] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Ruled Vertical Topic List */}
          <div className="hidden md:flex flex-col sticky top-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 pb-3 border-b border-white/10">
              Browse by Topic
            </span>
            <div className="divide-y divide-white/[0.07]">
              {v2AllTags.map((tag) => {
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSelectTag(tag)}
                    className={`w-full flex items-center justify-between py-2.5 text-sm transition-colors text-left ${
                      isActive
                        ? 'text-portal-accent font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{tag}</span>
                    <span className="text-xs text-portal-muted tabular-nums">
                      {tagCounts[tag] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Ruled Article Feed */}
        <div className="md:col-span-9">
          {filteredArticles.length > 0 ? (
            <div className="divide-y divide-white/10 border-t border-white/10">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/v2/articles/${article.slug}`}
                  className="group py-6 flex flex-col gap-3 block"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-portal-muted tabular-nums">
                    <div className="flex flex-wrap items-center gap-2">
                      {article.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] uppercase tracking-[0.14em] font-semibold text-portal-accent"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span>
                      {article.readingTime} · {article.date}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-portal-accent transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-sm text-portal-muted leading-relaxed max-w-[65ch]">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 px-6 text-center border border-dashed border-white/15 rounded-xl flex flex-col items-center gap-4">
              <h2 className="font-serif text-2xl font-bold text-white">No matching articles</h2>
              <p className="text-sm text-portal-muted max-w-md">
                {queryParam
                  ? `No articles matched "${queryParam}"${activeTag !== 'All' ? ` under "${activeTag}"` : ''}.`
                  : `No articles found under "${activeTag}".`}
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="rounded-full border border-white/20 hover:border-portal-accent px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function V2ArticlesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-6xl mx-auto px-5 py-20 text-center text-sm text-portal-muted">
          Loading articles...
        </div>
      }
    >
      <V2EditorialArticlesContent />
    </Suspense>
  );
}
