'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Background } from './Background';
import { ParticleLayer } from './ParticleLayer';
import { NavTabs } from './NavTabs';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between selection:bg-purple-600/40 selection:text-white">
      <Background />
      <ParticleLayer />

      {/* Header for sub-pages */}
      {!isHome && (
        <header className="relative z-20 w-full pt-8 pb-4 px-4 flex flex-col items-center border-b border-portal-border/40 backdrop-blur-sm bg-portal-darker/50">
          <Link
            href="/"
            className="group flex flex-col items-center mb-6 text-center hover:opacity-90 transition-opacity"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-portal-accent font-medium mb-1">
              AI Learning Portal
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors">
              AI <span className="italic font-normal text-portal-accent">Creator</span> Labs
            </span>
          </Link>
          <NavTabs />
        </header>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex-1 flex flex-col">
        {children}
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-portal-muted border-t border-portal-border/20">
        <p>© {new Date().getFullYear()} AI Creator Labs. Designed for continuous discovery.</p>
      </footer>
    </div>
  );
};
