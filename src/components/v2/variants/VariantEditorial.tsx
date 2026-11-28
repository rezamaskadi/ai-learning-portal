'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { v2Resources } from '@/data/v2/resources';
import { v2Videos } from '@/data/v2/videos';
import { v2Articles } from '@/data/v2/articles';
import { v2Shortcuts } from '@/data/v2/shortcuts';

export const VariantEditorial: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/v2/resources?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/v2/resources');
    }
  };

  const featuredResource = v2Resources[0];
  const featuredVideo = v2Videos[0];
  const featuredArticle = v2Articles[0];

  const toV2Href = (href: string) => (href.startsWith('/v2') ? href : `/v2${href}`);

  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 flex-1 flex flex-col justify-center">
      {/* Asymmetric 12-column Split Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        {/* Left 7 Columns: Editorial Thesis + Hairline Search + Topic Index */}
        <div className="lg:col-span-7 flex flex-col gap-7">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-[-0.03em] leading-[1.03] text-white">
            A quiet study room for{' '}
            <span className="italic font-normal text-portal-accent">applied AI</span>{' '}
            craft.
          </h1>

          <p className="text-base sm:text-lg text-portal-muted max-w-[54ch] leading-relaxed">
            Curated architecture blueprints, recorded masterclasses, and technical essays for builders shipping production AI systems—without the noise.
          </p>

          {/* Architectural Hairline Search Input */}
          <form onSubmit={handleSearch} className="w-full max-w-xl">
            <div className="flex items-center border-b border-white/20 focus-within:border-portal-accent transition-colors py-2.5 gap-3">
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides, video teardowns, or essays..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="text-xs font-semibold tracking-wider uppercase text-slate-200 hover:text-white px-3 py-1.5 rounded-md border border-white/15 hover:border-portal-accent/70 transition-colors flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Clean Capsule Shortcuts */}
          <div className="flex flex-col gap-2.5 pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Popular Topics
            </span>
            <div className="flex flex-wrap gap-2">
              {v2Shortcuts.map((shortcut) => (
                <Link
                  key={shortcut.label}
                  href={toV2Href(shortcut.href)}
                  className="rounded-full border border-white/15 hover:border-portal-accent/80 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  {shortcut.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Live Curriculum Ledger (Ruled Table, No Cards) */}
        <aside className="lg:col-span-5 border border-white/10 bg-[#08091a]/70 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Inside the Library
            </span>
            <span className="text-xs text-portal-muted tabular-nums">
              {v2Resources.length + v2Videos.length + v2Articles.length} entries
            </span>
          </div>

          <div className="divide-y divide-white/10">
            <Link
              href={toV2Href(featuredResource.url)}
              className="group py-4 flex flex-col gap-1.5 block"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-portal-accent font-semibold">
                <span>Resource · {featuredResource.category}</span>
                <span className="text-portal-muted group-hover:text-white transition-colors tabular-nums">
                  {v2Resources.length} guides →
                </span>
              </div>
              <h2 className="text-base font-semibold text-white group-hover:text-portal-accent transition-colors">
                {featuredResource.title}
              </h2>
              <p className="text-xs text-portal-muted line-clamp-2 leading-relaxed">
                {featuredResource.description}
              </p>
            </Link>

            <a
              href={featuredVideo.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-4 flex flex-col gap-1.5 block"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-portal-accent font-semibold">
                <span>Knowledge Video</span>
                <span className="text-slate-300 tabular-nums">
                  {featuredVideo.duration} · YouTube ↗
                </span>
              </div>
              <h2 className="text-base font-semibold text-white group-hover:text-portal-accent transition-colors">
                {featuredVideo.title}
              </h2>
              <p className="text-xs text-portal-muted line-clamp-2 leading-relaxed">
                {featuredVideo.description}
              </p>
            </a>

            <Link
              href={toV2Href(featuredArticle.url)}
              className="group py-4 flex flex-col gap-1.5 block"
            >
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-portal-accent font-semibold">
                <span>Article · {featuredArticle.tags[0]}</span>
                <span className="text-portal-muted group-hover:text-white transition-colors tabular-nums">
                  {featuredArticle.readingTime} →
                </span>
              </div>
              <h2 className="text-base font-semibold text-white group-hover:text-portal-accent transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-xs text-portal-muted line-clamp-2 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};
