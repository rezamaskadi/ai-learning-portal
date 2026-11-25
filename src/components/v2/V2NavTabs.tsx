'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function V2NavTabsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const tabs = [
    { label: 'RESOURCES', href: '/resources' },
    { label: 'KNOWLEDGES', href: '/knowledges' },
    { label: 'ARTICLES', href: '/articles' },
  ];

  return (
    <nav className="flex items-center justify-center gap-6 sm:gap-10 border-b border-portal-border/60 w-full max-w-xl mx-auto flex-wrap px-4">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        const href = q && q.trim() ? `${tab.href}?q=${encodeURIComponent(q.trim())}` : tab.href;

        return (
          <Link
            key={tab.href}
            href={href}
            className={`text-xs sm:text-sm font-semibold tracking-widest transition-all duration-200 pb-3 -mb-[1px] relative ${
              isActive
                ? 'text-white border-b-2 border-portal-accent'
                : 'text-portal-muted hover:text-white border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export const V2NavTabs: React.FC = () => {
  return (
    <Suspense
      fallback={
        <nav className="flex items-center justify-center gap-6 sm:gap-10 border-b border-portal-border/60 pb-3 w-full max-w-xl mx-auto flex-wrap px-4">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-portal-muted">RESOURCES</span>
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-portal-muted">KNOWLEDGES</span>
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-portal-muted">ARTICLES</span>
        </nav>
      }
    >
      <V2NavTabsContent />
    </Suspense>
  );
};
