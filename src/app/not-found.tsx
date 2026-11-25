import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="inline-block text-xs uppercase tracking-[0.25em] text-portal-accent font-semibold mb-3 px-3.5 py-1 rounded-full bg-portal-accent/10 border border-portal-accent/20">
        404 Error
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-portal-muted max-w-md text-base sm:text-lg mb-8 leading-relaxed">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:scale-105 active:scale-95 transition-all"
      >
        <span>← Return to Home</span>
      </Link>
    </div>
  );
}
