import React from 'react';
import Link from 'next/link';
import { Shortcut } from '@/lib/types';

interface ShortcutPillsProps {
  shortcuts: Shortcut[];
}

export const ShortcutPills: React.FC<ShortcutPillsProps> = ({ shortcuts }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-2xl px-4">
      {shortcuts.map((shortcut) => (
        <Link
          key={shortcut.label}
          href={shortcut.href}
          className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium tracking-wide text-slate-200 hover:text-white bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-md border border-white/[0.12] hover:border-purple-400/60 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_24px_rgba(167,139,250,0.25)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 select-none"
        >
          {/* Subtle glowing topic dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/50 group-hover:bg-purple-300 group-hover:shadow-[0_0_8px_#c084fc] transition-all duration-200" />
          <span>{shortcut.label}</span>
        </Link>
      ))}
    </div>
  );
};
