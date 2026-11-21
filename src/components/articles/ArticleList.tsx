import React from 'react';
import { Article } from '@/lib/types';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-portal-border/80 bg-portal-card/30">
        <p className="text-base text-slate-300 font-medium mb-1">
          No articles found for this topic.
        </p>
        <p className="text-xs text-portal-muted">
          Try selecting another tag or view all articles.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
