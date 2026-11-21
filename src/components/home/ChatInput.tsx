'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ChatInputContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/resources?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/resources');
    }
  };

  return (
    <div className="w-full max-w-2xl px-4">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Ambient background glow on focus/hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-purple-600/30 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-500" />

        {/* Inner glass input container */}
        <div className="relative flex items-center rounded-2xl bg-[#0b0c1e]/85 backdrop-blur-xl border border-white/[0.12] group-hover:border-purple-400/40 group-focus-within:border-purple-400/80 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-300">
          {/* Sparkle icon */}
          <div className="flex items-center justify-center mr-3 text-purple-400 group-focus-within:text-purple-300 group-focus-within:scale-110 transition-all duration-200">
            <svg
              className="w-5 h-5 drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </div>

          {/* Functional Text Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about AI or search topics..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400/70 focus:outline-none selection:bg-purple-600/40"
          />

          {/* Right side controls: keyboard shortcut hint & submit button */}
          <div className="flex items-center gap-2 ml-2">
            {!query && (
              <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-md select-none">
                ↵ Enter
              </span>
            )}
            <button
              type="submit"
              className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${
                query.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_16px_rgba(124,58,237,0.5)] scale-105 hover:scale-110 active:scale-95'
                  : 'bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] border border-white/[0.08]'
              }`}
              title="Submit search"
            >
              <svg
                className="w-4 h-4 translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export const ChatInput: React.FC = () => {
  return (
    <Suspense fallback={<div className="w-full max-w-2xl px-4 h-14" />}>
      <ChatInputContent />
    </Suspense>
  );
};
