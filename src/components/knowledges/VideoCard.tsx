import React from 'react';
import { Video } from '@/lib/types';

interface VideoCardProps {
  video: Video;
}

const gradientVariants: Record<string, string> = {
  'vid-1': 'from-purple-900/80 via-indigo-900/70 to-blue-900/80',
  'vid-2': 'from-blue-900/80 via-slate-900/70 to-indigo-950/80',
  'vid-3': 'from-violet-950/80 via-purple-900/70 to-fuchsia-950/80',
  'vid-4': 'from-indigo-950/80 via-blue-900/70 to-cyan-950/80',
  'vid-5': 'from-slate-900/80 via-purple-950/70 to-blue-950/80',
  'vid-6': 'from-purple-950/80 via-indigo-900/70 to-slate-900/80',
  'vid-7': 'from-blue-950/80 via-cyan-900/70 to-indigo-950/80',
  'vid-8': 'from-violet-900/80 via-blue-950/70 to-slate-950/80',
  'vid-9': 'from-indigo-900/80 via-fuchsia-950/70 to-purple-950/80',
  'vid-10': 'from-blue-900/80 via-indigo-950/70 to-violet-900/80',
};

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const gradient =
    gradientVariants[video.id] ||
    'from-purple-900/80 via-indigo-900/70 to-blue-900/80';

  return (
    <div className="group rounded-xl overflow-hidden bg-portal-card border border-portal-border hover:border-portal-accent/60 hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm flex flex-col justify-between">
      <div>
        <div
          className={`relative aspect-video w-full bg-gradient-to-br ${gradient} flex items-center justify-center p-4 overflow-hidden border-b border-portal-border/40`}
        >
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 w-12 h-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white/90 group-hover:scale-110 group-hover:bg-purple-600/60 group-hover:border-purple-300/60 transition-all duration-200">
            <svg
              className="w-5 h-5 fill-current translate-x-0.5"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-slate-200 text-xs font-semibold px-2 py-0.5 rounded border border-white/10">
            {video.duration}
          </span>
        </div>

        <div className="p-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-portal-accent block mb-1">
            {video.source || 'AI Creator Labs'}
          </span>
          <h3 className="text-base font-semibold text-white group-hover:text-purple-200 transition-colors line-clamp-2 leading-snug mb-2">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-xs text-portal-muted line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
