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
    <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-12 flex flex-col gap-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-portal-muted flex-wrap">
        <Link href="/v2" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/v2/articles" className="hover:text-white transition-colors">
          Articles
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
          {article.title}
        </span>
      </nav>

      <div>
        <Link
          href="/v2/articles"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-portal-accent px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          ← Back to Articles
        </Link>
      </div>

      <header className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/v2/articles?tag=${encodeURIComponent(tag)}`}
                className="text-xs uppercase tracking-[0.15em] font-semibold text-portal-accent hover:text-white transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <span className="text-xs text-slate-300 border border-white/15 px-2.5 py-0.5 rounded-full">
            Preview outline · full essay upcoming
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.08]">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-portal-muted pt-1 tabular-nums">
          <span>By <strong className="text-white">AI Creator Labs Research</strong></span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readingTime}</span>
        </div>
      </header>

      <article className="text-slate-300 leading-relaxed flex flex-col gap-6 text-base sm:text-lg max-w-[68ch]">
        <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed italic border-l-2 border-portal-accent pl-4 py-1">
          &ldquo;{article.excerpt}&rdquo;
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
          Background &amp; Motivation
        </h2>
        <p>
          As language model capabilities expand, engineering teams are moving away from brittle ad-hoc prompts toward structured, observable architectures. Understanding the trade-offs between latency, cost, and reliability is essential before committing to a pattern in production.
        </p>

        <blockquote className="my-2 pl-4 pr-4 py-2 bg-white/[0.02] border-l-2 border-portal-accent text-slate-200 text-base italic">
          System reliability scales directly with the clarity of evaluation harnesses and the explicitness of runtime guardrails.
        </blockquote>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
          Key Takeaways
        </h2>
        <p>
          Start with the simplest architecture that satisfies your evaluation criteria, measure regressions continuously, and introduce complexity only where empirical benchmarks justify it. Full benchmarks and code walkthroughs will be added in the complete edition.
        </p>
      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-6 pt-8 border-t border-white/10">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/v2/articles/${rel.slug}`}
                className="group border-t border-white/15 pt-3 hover:border-portal-accent transition-colors block"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-portal-accent block mb-1">
                  {rel.tags[0]}
                </span>
                <h3 className="text-sm font-semibold text-white group-hover:text-portal-accent transition-colors line-clamp-2 mb-1">
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
    </div>
  );
}
