'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { articles, allTags } from '@/data/articles';
import { TagSidebar } from '@/components/articles/TagSidebar';
import { ArticleList } from '@/components/articles/ArticleList';
import { Article } from '@/lib/types';

function ArticlesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const [activeTag, setActiveTag] = useState('All');

  // Calculate tag counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: articles.length,
    };
    allTags.forEach((t) => {
      if (t !== 'All') {
        counts[t] = articles.filter((a) => a.tags.includes(t)).length;
      }
    });
    return counts;
  }, []);

  // Filter based on activeTag AND queryParam
  const filteredArticles = useMemo(() => {
    let result = articles;

    if (activeTag !== 'All') {
      result = result.filter((a: Article) => a.tags.includes(activeTag));
    }

    if (queryParam.trim()) {
      const q = queryParam.trim().toLowerCase();
      result = result.filter(
        (a: Article) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeTag, queryParam]);

  const handleResetSearch = () => {
    router.push('/articles');
  };

  const handleResetAll = () => {
    setActiveTag('All');
    router.push('/articles');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Articles
        </h1>
        <p className="text-portal-muted text-base sm:text-lg">
          In-depth analysis, research papers breakdown, and engineering insights.
        </p>
      </div>

      {/* Search Status Banner if 'q' is active */}
      {queryParam.trim() && (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-purple-400">🔍</span>
            <span className="text-slate-200">
              Hasil untuk <strong className="text-white font-semibold">&ldquo;{queryParam}&rdquo;</strong>
              <span className="text-portal-muted ml-1.5">— {filteredArticles.length} artikel ditemukan</span>
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

      {/* Main layout with sidebar and articles */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <TagSidebar
          tags={allTags}
          activeTag={activeTag}
          onSelectTag={setActiveTag}
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
              <h3 className="text-lg font-semibold text-white mb-1">
                Tidak ada artikel yang cocok
              </h3>
              <p className="text-sm text-portal-muted max-w-md">
                {queryParam
                  ? `Tidak ada artikel yang cocok dengan pencarian "${queryParam}"${activeTag !== 'All' ? ` dalam tag "${activeTag}"` : ''}.`
                  : `Tidak ada artikel dalam topik "${activeTag}".`}
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
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-6xl mx-auto px-4 py-20 text-center text-portal-muted">
        Memuat articles...
      </div>
    }>
      <ArticlesContent />
    </Suspense>
  );
}
