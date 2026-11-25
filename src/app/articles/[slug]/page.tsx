import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { v2Articles } from '@/data/v2/articles';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return v2Articles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = v2Articles.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found — AI Creator Labs' };

  return {
    title: `${article.title} — AI Creator Labs`,
    description: article.excerpt,
  };
}

export default function V2ArticleDetailPage({ params }: PageProps) {
  const article = v2Articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = v2Articles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.tags.some((t) => article.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-portal-muted flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-white transition-colors">
          Articles
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-xs sm:max-w-md">
          {article.title}
        </span>
      </nav>

      <div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-purple-400/50 hover:bg-white/[0.08] transition-all duration-200"
        >
          <span>← Back to Articles</span>
        </Link>
      </div>

      <header className="flex flex-col gap-4 border-b border-portal-border/60 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles?tag=${encodeURIComponent(tag)}`}
                className="bg-portal-accent/10 border border-portal-accent/20 text-portal-accent hover:bg-portal-accent/20 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <span className="text-xs text-amber-300/90 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
            Preview outline — full article coming soon
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-portal-muted pt-2">
          <span>By <strong className="text-white">AI Creator Labs Research</strong></span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readingTime}</span>
        </div>
      </header>

      <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed flex flex-col gap-6 text-base sm:text-lg">
        <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed italic border-l-4 border-purple-500 pl-4 py-1">
          &ldquo;{article.excerpt}&rdquo;
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-4">
          Background &amp; Motivation
        </h2>
        <p>
          As language model capabilities expand, engineering teams are moving away from brittle ad-hoc prompts toward structured, observable architectures. Understanding the trade-offs between latency, cost, and reliability is essential before committing to a pattern in production.
        </p>

        <blockquote className="my-2 p-4 rounded-xl bg-white/[0.03] border-l-2 border-purple-400 text-slate-200 text-base italic">
          System reliability scales directly with the clarity of evaluation harnesses and the explicitness of runtime guardrails.
        </blockquote>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-4">
          Key Takeaways
        </h2>
        <p>
          Start with the simplest architecture that satisfies your evaluation criteria, measure regressions continuously, and introduce complexity only where empirical benchmarks justify it. Full benchmarks and code walkthroughs will be added in the complete edition.
        </p>
      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-8 pt-8 border-t border-portal-border/60">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={rel.url}
                className="p-4 rounded-xl bg-portal-card border border-portal-border hover:border-portal-accent/60 transition-all hover:-translate-y-1 block"
              >
                <div className="flex flex-wrap gap-1 mb-2">
                  {rel.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] text-portal-accent bg-portal-accent/10 px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
                  {rel.title}
                </h3>
                <p className="text-xs text-portal-muted line-clamp-2">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="pt-6 border-t border-portal-border/30 flex justify-between items-center flex-wrap gap-4">
        <Link
          href="/articles"
          className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Back to All Articles
        </Link>
        <Link
          href="/"
          className="text-xs text-portal-muted hover:text-white transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
