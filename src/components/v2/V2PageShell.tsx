'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Background } from '@/components/layout/Background';
import { V2ParticleLayer } from './V2ParticleLayer';
import { V2NavTabs } from './V2NavTabs';

interface V2PageShellProps {
  children: React.ReactNode;
}

export const V2PageShell: React.FC<V2PageShellProps> = ({ children }) => {
  const pathname = usePathname();
  if (pathname.startsWith('/old') || pathname.startsWith('/v2')) {
    return <>{children}</>;
  }
  const isHome = pathname === '/';

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-purple-600/40 selection:text-white">
      <Background />
      <V2ParticleLayer />

      {!isHome && (
        <header className="relative z-20 w-full pt-7 pb-0 px-4 flex flex-col items-center border-b border-portal-border/40 backdrop-blur-sm bg-portal-darker/60 gap-4">
          <Link
            href="/"
            className="group flex flex-col items-center text-center hover:opacity-90 transition-opacity"
            title="Return to Home"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-portal-accent font-medium mb-1">
              AI Learning Portal
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white transition-colors">
              AI <span className="italic font-normal text-portal-accent">Creator</span> Labs
            </span>
          </Link>

          <V2NavTabs />
        </header>
      )}

      <main className="relative z-10 w-full flex-1 flex flex-col">
        {children}
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-portal-muted border-t border-portal-border/20">
        <p>© {new Date().getFullYear()} AI Creator Labs. Designed for continuous discovery.</p>
      </footer>
    </div>
  );
};
