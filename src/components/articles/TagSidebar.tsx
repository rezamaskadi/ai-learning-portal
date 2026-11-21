'use client';

import React from 'react';

interface TagSidebarProps {
  tags: string[];
  activeTag: string;
  onSelectTag: (tag: string) => void;
  tagCounts: Record<string, number>;
}

export const TagSidebar: React.FC<TagSidebarProps> = ({
  tags,
  activeTag,
  onSelectTag,
  tagCounts,
}) => {
  return (
    <div className="w-full md:w-60 flex-shrink-0">
      {/* Mobile: Horizontal scrollable pills with glass styling */}
      <div className="md:hidden flex overflow-x-auto gap-2 pb-3 scrollbar-none">
        {tags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-purple-600/30 text-white border border-purple-400/50 shadow-[0_0_15px_rgba(167,139,250,0.3)] font-semibold'
                  : 'bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              <span>{tag}</span>
              {tagCounts[tag] !== undefined && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive
                      ? 'bg-purple-400/30 text-purple-200'
                      : 'bg-white/[0.08] text-slate-400'
                  }`}
                >
                  {tagCounts[tag]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop: Premium glassmorphic sidebar with glow highlights */}
      <div className="hidden md:flex flex-col gap-1.5 sticky top-24 rounded-2xl p-4 bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]">
        {/* Header with subtle icon */}
        <div className="flex items-center gap-2 px-3 py-2 mb-1 border-b border-white/[0.06]">
          <svg
            className="w-3.5 h-3.5 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Filter by Tag
          </span>
        </div>

        {/* Tags List */}
        <div className="flex flex-col gap-1">
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className={`group relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/25 via-purple-500/15 to-transparent text-white border border-purple-400/40 shadow-[0_0_20px_rgba(167,139,250,0.18)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                {/* Left active glowing indicator bar */}
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-400 shadow-[0_0_8px_#c084fc] scale-110'
                        : 'bg-transparent group-hover:bg-slate-500/50'
                    }`}
                  />
                  <span className="tracking-normal">{tag}</span>
                </div>

                {/* Count Badge */}
                {tagCounts[tag] !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30 shadow-[0_0_10px_rgba(167,139,250,0.2)]'
                        : 'bg-white/[0.06] text-slate-400 border border-white/[0.06] group-hover:text-slate-200 group-hover:bg-white/[0.1]'
                    }`}
                  >
                    {tagCounts[tag]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
