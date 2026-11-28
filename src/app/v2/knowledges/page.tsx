'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { v2Videos } from '@/data/v2/videos';
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

function V2EditorialKnowledgesContent() {
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
      router.push(`/v2/knowledges?q=${encodeURIComponent(inputVal.trim())}`);
    } else {
      router.push('/v2/knowledges');
    }
  };

  const handleTopicClick = (topicQuery: string) => {
    if (topicQuery) {
      router.push(`/v2/knowledges?q=${encodeURIComponent(topicQuery)}`);
    } else {
      router.push('/v2/knowledges');
    }
  };

  const handleResetSearch = () => {
    setInputVal('');
    router.push('/v2/knowledges');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-12 flex flex-col gap-10">
      {/* Editorial Header + Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="max-w-xl">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white mb-3">
            Knowledges
          </h1>
          <p className="text-portal-muted text-base sm:text-lg leading-relaxed">
            Video masterclasses, teardowns, and practical AI architecture walkthroughs.
          </p>
        </div>

        <SortDropdown
          value={sortBy}
          onChange={(val) => setSortBy(val as VideoSortOption)}
          options={sortOptions}
          label="Sort:"
        />
      </div>

      {/* Topic Pills & Hairline Search Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {videoTopics.map((topic) => {
            const normalizedQ = queryParam.trim().toLowerCase();
            const isActive =
              (!topic.query && !normalizedQ) ||
              (Boolean(topic.query) && normalizedQ === topic.query.toLowerCase());

            return (
              <button
                key={topic.label}
                type="button"
                onClick={() => handleTopicClick(topic.query)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border ${
                  isActive
                    ? 'border-portal-accent bg-portal-purple/20 text-white'
                    : 'border-white/15 text-slate-300 hover:border-portal-accent/80 hover:text-white'
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSearchSubmit} className="w-full md:w-72 flex-shrink-0">
          <div className="flex items-center border-b border-white/20 focus-within:border-portal-accent py-1.5 gap-2 transition-colors">
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
              placeholder="Search videos..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
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
          </div>
        </form>
      </div>

      {/* Search Status */}
      {queryParam.trim() && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-3 text-sm">
          <span className="text-slate-200">
            Showing <strong className="text-white tabular-nums">{filteredVideos.length}</strong>{' '}
            {filteredVideos.length === 1 ? 'video' : 'videos'} for{' '}
            <strong className="text-white">&ldquo;{queryParam}&rdquo;</strong>
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

      {/* Editorial Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {filteredVideos.map((video, idx) => (
              <a
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3.5"
              >
                {/* Clean 16:9 Architectural Thumbnail */}
                <div className="relative aspect-video w-full rounded-lg bg-[#08091a] border border-white/10 group-hover:border-portal-accent/70 flex items-center justify-center overflow-hidden transition-colors">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:18px_18px]" />
                  <span className="absolute top-2.5 left-3 text-[11px] font-mono text-portal-muted tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="relative z-10 w-11 h-11 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 group-hover:border-portal-accent transition-all">
                    <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-slate-200 text-xs font-medium tabular-nums px-2 py-0.5 rounded border border-white/10">
                    {video.duration}
                  </span>
                </div>

                {/* Editorial Video Metadata */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-portal-accent font-semibold">
                    <span>{video.source || 'AI Creator Labs'}</span>
                    <span className="text-portal-muted group-hover:text-white transition-colors">
                      Watch on YouTube ↗
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-white group-hover:text-portal-accent transition-colors leading-snug line-clamp-2">
                    {video.title}
                  </h2>
                  {video.description && (
                    <p className="text-xs text-portal-muted line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>
              </a>
          ))}
        </div>
      ) : (
        <div className="py-16 px-6 text-center border border-dashed border-white/15 rounded-xl flex flex-col items-center gap-4">
          <h2 className="font-serif text-2xl font-bold text-white">No matching videos</h2>
          <p className="text-sm text-portal-muted max-w-md">
            No videos matched &ldquo;{queryParam}&rdquo;. Try another keyword such as &ldquo;RAG&rdquo;, &ldquo;LangGraph&rdquo;, or &ldquo;Fine-Tuning&rdquo;.
          </p>
          <button
            type="button"
            onClick={handleResetSearch}
            className="rounded-full border border-white/20 hover:border-portal-accent px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
          >
            Show all videos
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
        <div className="w-full max-w-6xl mx-auto px-5 py-20 text-center text-sm text-portal-muted">
          Loading videos...
        </div>
      }
    >
      <V2EditorialKnowledgesContent />
    </Suspense>
  );
}
