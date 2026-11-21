'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavTabs: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { label: 'RESOURCES', href: '/resources' },
    { label: 'KNOWLEDGES', href: '/knowledges' },
    { label: 'ARTICLES', href: '/articles' },
  ];

  return (
    <nav className="flex items-center justify-center gap-6 sm:gap-10 border-b border-portal-border/60 pb-3 w-full max-w-xl mx-auto flex-wrap px-4">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`text-xs sm:text-sm font-semibold tracking-widest transition-all duration-200 pb-1 relative ${
              isActive
                ? 'text-white border-b-2 border-portal-accent'
                : 'text-portal-muted hover:text-white'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};
