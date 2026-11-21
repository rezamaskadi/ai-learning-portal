import React from 'react';
import Link from 'next/link';
import { Resource } from '@/lib/types';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Link
      href={resource.url}
      className="group flex flex-col justify-between rounded-xl bg-portal-card border border-portal-border p-6 hover:border-portal-accent/60 hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(124,58,237,0.12)] cursor-pointer"
    >
      <div>
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-portal-accent bg-portal-accent/10 px-2.5 py-0.5 rounded-full border border-portal-accent/20 mb-3">
          {resource.category}
        </span>
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors mb-2">
          {resource.title}
        </h3>
        <p className="text-sm text-portal-muted leading-relaxed line-clamp-3">
          {resource.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-portal-border/40 flex items-center justify-between text-xs text-portal-muted group-hover:text-portal-accent transition-colors font-medium">
        <span>Lihat detail panduan</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
};
