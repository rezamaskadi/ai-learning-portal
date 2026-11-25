import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { v2Resources } from '@/data/v2/resources';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return v2Resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const resource = v2Resources.find((r) => r.slug === params.slug);
  if (!resource) return { title: 'Resource Not Found — AI Creator Labs' };

  return {
    title: `${resource.title} — AI Creator Labs`,
    description: resource.description,
  };
}

export default function V2ResourceDetailPage({ params }: PageProps) {
  const resource = v2Resources.find((r) => r.slug === params.slug);

  if (!resource) {
    notFound();
  }

  const relatedResources = v2Resources
    .filter((r) => r.category === resource.category && r.slug !== resource.slug)
    .slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-portal-muted flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/resources" className="hover:text-white transition-colors">
          Resources
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-xs sm:max-w-md">
          {resource.title}
        </span>
      </nav>

      <div>
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-purple-400/50 hover:bg-white/[0.08] transition-all duration-200"
        >
          <span>← Back to Resources</span>
        </Link>
      </div>

      <header className="flex flex-col gap-4 border-b border-portal-border/60 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-portal-accent bg-portal-accent/10 border border-portal-accent/25 px-3 py-1 rounded-full">
            {resource.category}
          </span>
          <span className="text-xs text-amber-300/90 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
            Preview outline — full curriculum coming soon
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {resource.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
          {resource.description}
        </p>
      </header>

      <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed flex flex-col gap-6 text-base sm:text-lg">
        <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>✨</span> Module Overview
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            This resource is designed to give AI engineers and builders a structured, production-ready mental model for <strong>{resource.title}</strong>.
          </p>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mt-4">
          1. Core Principles &amp; Architecture
        </h3>
        <p>
          Modern AI workflows depend on clear boundaries between deterministic application logic and probabilistic model inference. Establishing explicit contracts for inputs, context windows, and fallback behavior prevents silent failures in production.
        </p>

        <h3 className="font-serif text-2xl font-bold text-white mt-4">
          2. Implementation Pattern
        </h3>
        <div className="rounded-xl bg-[#0b0c1e] border border-white/[0.08] p-4 text-xs sm:text-sm font-mono text-purple-200">
          <div className="text-slate-400 mb-1">{'// Example workflow blueprint'}</div>
          <div>const pipeline = createWorkflow(&quot;{resource.slug}&quot;);</div>
          <div>const result = await pipeline.run({'{ strictValidation: true }'});</div>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mt-4">
          3. Evaluation &amp; Next Steps
        </h3>
        <p>
          Before shipping changes, benchmark latency, token cost, and output accuracy against a curated evaluation set. Full interactive examples and downloadable templates for this module will be published in an upcoming release.
        </p>
      </article>

      {relatedResources.length > 0 && (
        <section className="mt-8 pt-8 border-t border-portal-border/60">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Related in {resource.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedResources.map((rel) => (
              <Link
                key={rel.id}
                href={rel.url}
                className="p-4 rounded-xl bg-portal-card border border-portal-border hover:border-portal-accent/60 transition-all hover:-translate-y-1 block"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-portal-accent block mb-1">
                  {rel.category}
                </span>
                <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
                  {rel.title}
                </h3>
                <p className="text-xs text-portal-muted line-clamp-2">
                  {rel.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="pt-6 border-t border-portal-border/30 flex justify-between items-center flex-wrap gap-4">
        <Link
          href="/resources"
          className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Back to All Resources
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
