import React from 'react';
import { videos } from '@/data/videos';
import { VideoGrid } from '@/components/knowledges/VideoGrid';

export default function KnowledgesPage() {
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

      {/* Video Grid */}
      <VideoGrid videos={videos} />
    </div>
  );
}
