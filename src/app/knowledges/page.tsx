'use client';

import React, { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { videos } from '@/data/videos';
import { VideoGrid } from '@/components/knowledges/VideoGrid';
import { Video } from '@/lib/types';

function KnowledgesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const filteredVideos = useMemo(() => {
    if (!queryParam.trim()) return videos;
    const q = queryParam.trim().toLowerCase();
    return videos.filter(
      (v: Video) =>
        v.title.toLowerCase().includes(q) ||
        (v.description && v.description.toLowerCase().includes(q)) ||
        (v.source && v.source.toLowerCase().includes(q))
    );
  }, [queryParam]);

  const handleResetSearch = () => {
    router.push('/knowledges');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Title, Subtitle & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-portal-border/40 pb-6">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
            Knowledges
          </h1>
          <p className="text-portal-muted text-base sm:text-lg">
            Video masterclasses, teardowns, and deep architectural walkthroughs.
          </p>
        </div>

        {/* Decorative Sort Control */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-portal-muted">Sort by:</span>
          <div className="text-xs font-medium text-slate-200 bg-portal-card border border-portal-border px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-default select-none">
            <span>Newest First</span>
            <span className="text-[10px] text-portal-muted">▼</span>
          </div>
        </div>
      </div>

      {/* Search Status Banner if 'q' is active */}
      {queryParam.trim() && (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-purple-400">🔍</span>
            <span className="text-slate-200">
              Hasil video untuk <strong className="text-white font-semibold">&ldquo;{queryParam}&rdquo;</strong>
              <span className="text-portal-muted ml-1.5">— {filteredVideos.length} video ditemukan</span>
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

      {/* Video Grid or Empty State */}
      {filteredVideos.length > 0 ? (
        <VideoGrid videos={filteredVideos} />
      ) : (
        <div className="w-full py-16 px-6 text-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-xl text-purple-400">
            🎬
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Tidak ada video yang cocok
            </h3>
            <p className="text-sm text-portal-muted max-w-md">
              Tidak ada video yang cocok dengan pencarian &ldquo;{queryParam}&rdquo;.
            </p>
          </div>
          <button
            onClick={handleResetSearch}
            className="mt-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}

export default function KnowledgesPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-7xl mx-auto px-4 py-20 text-center text-portal-muted">
        Memuat video...
      </div>
    }>
      <KnowledgesContent />
    </Suspense>
  );
}
