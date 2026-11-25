'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { v2Articles, v2AllTags } from '@/data/v2/articles';
import { TagSidebar } from '@/components/articles/TagSidebar';
import { ArticleList } from '@/components/articles/ArticleList';
import { matchesSearchQuery } from '@/lib/search';
import { Article } from '@/lib/types';

function V2ArticlesContent() {
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
    router.push(qStr ? `/articles?${qStr}` : '/articles');
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
    router.push(qStr ? `/articles?${qStr}` : '/articles');
  };

  const handleResetSearch = () => {
    setInputVal('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    const qStr = params.toString();
    router.push(qStr ? `/articles?${qStr}` : '/articles');
  };

  const handleResetAll = () => {
    setInputVal('');
    setActiveTag('All');
    router.push('/articles');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          {activeTag === 'All' ? 'Articles' : activeTag}
        </h1>
        <p className="text-portal-muted text-base sm:text-lg">
          {activeTag === 'All'
            ? 'In-depth analysis, research breakdowns, and practical AI engineering insights.'
            : `Showing ${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'} tagged under "${activeTag}".`}
        </p>
      </div>

      {/* In-page Search Bar */}
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
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="text-slate-400 hover:text-white text-xs px-2"
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="text-xs px-3 py-1 rounded-lg bg-purple-600/30 text-purple-200 hover:bg-purple-600/50 hover:text-white border border-purple-400/30 font-medium transition-all"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search Status Banner */}
      {queryParam.trim() && (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-purple-400">🔍</span>
            <span className="text-slate-200">
              Results for <strong className="text-white font-semibold">&ldquo;{queryParam}&rdquo;</strong>
              <span className="text-portal-muted ml-1.5">— {filteredArticles.length} articles found</span>
              {activeTag !== 'All' && (
                <span className="text-purple-300 ml-1">(Tag: {activeTag})</span>
              )}
            </span>
          </div>
          <button
            onClick={handleResetSearch}
            className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white border border-white/[0.1] transition-all"
          >
            ✕ Reset search
          </button>
        </div>
      )}

      {/* Main layout with sidebar and articles */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <TagSidebar
          tags={v2AllTags}
          activeTag={activeTag}
          onSelectTag={handleSelectTag}
          tagCounts={tagCounts}
        />

        {filteredArticles.length > 0 ? (
          <ArticleList articles={filteredArticles} />
        ) : (
          <div className="flex-1 w-full py-16 px-6 text-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-xl text-purple-400">
              📝
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">No matching articles</h3>
              <p className="text-sm text-portal-muted max-w-md">
                {queryParam
                  ? `No articles matched "${queryParam}"${activeTag !== 'All' ? ` under "${activeTag}"` : ''}.`
                  : `No articles found under "${activeTag}".`}
              </p>
            </div>
            <button
              onClick={handleResetAll}
              className="mt-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function V2ArticlesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-6xl mx-auto px-4 py-20 text-center text-portal-muted">
          Loading articles...
        </div>
      }
    >
      <V2ArticlesContent />
    </Suspense>
  );
}
