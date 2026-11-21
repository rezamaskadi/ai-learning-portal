import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      href={article.url}
      className="group block rounded-xl bg-portal-card border border-portal-border p-6 hover:border-portal-accent/60 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(124,58,237,0.1)] cursor-pointer"
    >
      <div className="flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-purple-200 transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-portal-muted leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Tags, Reading time & Date */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-portal-border/40 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-portal-accent/10 border border-portal-accent/20 text-portal-accent px-2 py-0.5 rounded-full text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-portal-muted text-[11px] font-medium">
            <span>{article.readingTime}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
