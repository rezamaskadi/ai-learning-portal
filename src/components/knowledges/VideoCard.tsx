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
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl overflow-hidden bg-portal-card border border-portal-border hover:border-portal-accent/60 hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm flex flex-col justify-between cursor-pointer block hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)]"
      title={`Tonton "${video.title}" di YouTube`}
    >
      <div>
        {/* 16:9 Thumbnail with CSS Gradient, Play Icon & YouTube Indicator */}
        <div
          className={`relative aspect-video w-full bg-gradient-to-br ${gradient} flex items-center justify-center p-4 overflow-hidden border-b border-portal-border/40`}
        >
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Central Play Badge */}
          <div className="relative z-10 w-12 h-12 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white/95 group-hover:scale-110 group-hover:bg-red-600/80 group-hover:border-red-400/80 transition-all duration-200 shadow-lg">
            <svg
              className="w-5 h-5 fill-current translate-x-0.5"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          {/* YouTube Pill Badge on Top Left */}
          <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-sm">
            <svg className="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>YouTube</span>
          </div>

          {/* Duration Badge */}
          <span className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-slate-200 text-xs font-semibold px-2 py-0.5 rounded border border-white/10">
            {video.duration}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-portal-accent block mb-1">
            {video.source || 'AI Creator Labs'}
          </span>
          <h3 className="text-base font-semibold text-white group-hover:text-purple-200 transition-colors line-clamp-2 leading-snug mb-2">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-xs text-portal-muted line-clamp-2 leading-relaxed mb-3">
              {video.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer link cue */}
      <div className="px-4 pb-4 pt-1 flex items-center justify-between text-xs text-purple-400 group-hover:text-purple-300 font-medium border-t border-portal-border/30">
        <span>Tonton di YouTube</span>
        <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
      </div>
    </a>
  );
};
