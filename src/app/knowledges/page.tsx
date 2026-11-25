'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { v2Videos } from '@/data/v2/videos';
import { VideoGrid } from '@/components/knowledges/VideoGrid';
import { SortDropdown, SortOption } from '@/components/knowledges/SortDropdown';
import { matchesSearchQuery, sortVideos, VideoSortOption } from '@/lib/search';
import { Video } from '@/lib/types';

const sortOptions: SortOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'duration-desc', label: 'Longest Duration' },
  { value: 'duration-asc', label: 'Shortest Duration' },
  { value: 'title-asc', label: 'Title (A — Z)' },
];

const videoTopics = [
  { label: 'All', query: '' },
  { label: 'AI Agents', query: 'LangGraph' },
  { label: 'RAG & Vectors', query: 'RAG' },
  { label: 'Fine-Tuning', query: 'Fine-Tuning' },
  { label: 'Prompting', query: 'Prompt' },
  { label: 'Voice AI', query: 'Voice' },
];

function V2KnowledgesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(queryParam);
  const [sortBy, setSortBy] = useState<VideoSortOption>('newest');

  useEffect(() => {
    setInputVal(queryParam);
  }, [queryParam]);

  const filteredVideos = useMemo(() => {
    const filtered = queryParam.trim()
      ? v2Videos.filter((v: Video) =>
          matchesSearchQuery([v.title, v.description, v.source], queryParam)
        )
      : v2Videos;

    return sortVideos(filtered, sortBy);
  }, [queryParam, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      router.push(`/knowledges?q=${encodeURIComponent(inputVal.trim())}`);
    } else {
      router.push('/knowledges');
    }
  };

  const handleTopicClick = (topicQuery: string) => {
    if (topicQuery) {
      router.push(`/knowledges?q=${encodeURIComponent(topicQuery)}`);
    } else {
      router.push('/knowledges');
    }
  };

  const handleResetSearch = () => {
    setInputVal('');
    router.push('/knowledges');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-portal-border/40 pb-6">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
            Knowledges
          </h1>
          <p className="text-portal-muted text-base sm:text-lg">
            Video masterclasses, teardowns, and practical AI architecture walkthroughs.
          </p>
        </div>

        <SortDropdown
          value={sortBy}
          onChange={(val) => setSortBy(val as VideoSortOption)}
          options={sortOptions}
          label="Sort by:"
        />
      </div>

      {/* Topic Pills & In-page Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-portal-card/40 border border-portal-border/60 p-4 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {videoTopics.map((topic) => {
            const normalizedQ = queryParam.trim().toLowerCase();
            const isActive =
              (!topic.query && !normalizedQ) ||
              (Boolean(topic.query) && normalizedQ === topic.query.toLowerCase());

            return (
              <button
                key={topic.label}
                onClick={() => handleTopicClick(topic.query)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-purple-600/30 text-white border-purple-400/50 shadow-[0_0_12px_rgba(167,139,250,0.3)] font-semibold'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 relative">
          <div className="relative flex items-center rounded-xl bg-[#0b0c1e] border border-white/[0.12] focus-within:border-purple-400/80 px-3 py-1.5">
            <svg
              className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0"
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
              placeholder="Search video tutorials..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
            />
            {inputVal && (
              <button
                type="button"
                onClick={handleResetSearch}
                className="text-slate-400 hover:text-white text-xs px-1"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search Status Banner */}
      {queryParam.trim() && (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-purple-400">🔍</span>
            <span className="text-slate-200">
              Showing videos for <strong className="text-white font-semibold">&ldquo;{queryParam}&rdquo;</strong>
              <span className="text-portal-muted ml-1.5">— {filteredVideos.length} videos found</span>
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

      {/* Video Grid or Empty State */}
      {filteredVideos.length > 0 ? (
        <VideoGrid videos={filteredVideos} />
      ) : (
        <div className="w-full py-16 px-6 text-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-xl text-purple-400">
            🎬
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">No matching videos</h3>
            <p className="text-sm text-portal-muted max-w-md">
              No videos matched &ldquo;{queryParam}&rdquo;. Try another keyword such as &ldquo;RAG&rdquo;, &ldquo;LangGraph&rdquo;, or &ldquo;Fine-Tuning&rdquo;.
            </p>
          </div>
          <button
            onClick={handleResetSearch}
            className="mt-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all"
          >
            Show All Videos
          </button>
        </div>
      )}
    </div>
  );
}

export default function V2KnowledgesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center text-portal-muted">
          Loading videos...
        </div>
      }
    >
      <V2KnowledgesContent />
    </Suspense>
  );
}
