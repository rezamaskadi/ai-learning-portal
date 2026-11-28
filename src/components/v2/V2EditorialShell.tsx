'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Background } from '@/components/layout/Background';
import { V2ParticleLayer } from './V2ParticleLayer';

function EditorialHeaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const tabs = [
    { label: 'RESOURCES', href: '/v2/resources' },
    { label: 'KNOWLEDGES', href: '/v2/knowledges' },
    { label: 'ARTICLES', href: '/v2/articles' },
  ];

  return (
    <header className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <Link
          href="/v2"
          className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          title="Return to /v2 Home"
        >
          AI <span className="italic font-normal text-portal-accent">Creator</span> Labs
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            const href =
              q && q.trim() ? `${tab.href}?q=${encodeURIComponent(q.trim())}` : tab.href;

            return (
              <Link
                key={tab.href}
                href={href}
                className={`text-xs font-semibold tracking-[0.18em] uppercase transition-colors pb-1 border-b ${
                  isActive
                    ? 'text-white border-portal-accent'
                    : 'text-portal-muted hover:text-white border-transparent'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

interface V2EditorialShellProps {
  children: React.ReactNode;
}

export const V2EditorialShell: React.FC<V2EditorialShellProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-purple-600/40 selection:text-white">
      <Background />
      <V2ParticleLayer />

      <Suspense
        fallback={
          <header className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <span className="font-serif text-lg sm:text-xl font-bold text-white">
                AI Creator Labs
              </span>
            </div>
          </header>
        }
      >
        <EditorialHeaderContent />
      </Suspense>

      <main className="relative z-10 w-full flex-1 flex flex-col">{children}</main>

      <footer className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-6">
        <div className="border-t border-white/10 pt-5 flex flex-wrap items-center justify-between gap-4 text-xs text-portal-muted">
          <p>© {new Date().getFullYear()} AI Creator Labs · Editorial Edition</p>
          <div className="flex items-center gap-5">
            <Link href="/v2/resources" className="hover:text-white transition-colors">
              Resources
            </Link>
            <Link href="/v2/knowledges" className="hover:text-white transition-colors">
              Knowledges
            </Link>
            <Link href="/v2/articles" className="hover:text-white transition-colors">
              Articles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
