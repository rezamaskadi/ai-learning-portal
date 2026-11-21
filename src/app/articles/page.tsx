'use client';

import React, { useState, useMemo } from 'react';
import { articles, allTags } from '@/data/articles';
import { TagSidebar } from '@/components/articles/TagSidebar';
import { ArticleList } from '@/components/articles/ArticleList';

export default function ArticlesPage() {
  const [activeTag, setActiveTag] = useState('All');

  // Calculate tag counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: articles.length,
    };
    allTags.forEach((t) => {
      if (t !== 'All') {
        counts[t] = articles.filter((a) => a.tags.includes(t)).length;
      }
    });
    return counts;
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeTag === 'All') return articles;
    return articles.filter((a) => a.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Articles
        </h1>
        <p className="text-portal-muted text-base sm:text-lg">
          In-depth analysis, research papers breakdown, and engineering insights.
        </p>
      </div>

      {/* Main layout with sidebar and articles */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <TagSidebar
          tags={allTags}
          activeTag={activeTag}
          onSelectTag={setActiveTag}
          tagCounts={tagCounts}
        />
        <ArticleList articles={filteredArticles} />
      </div>
    </div>
  );
}
