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
    <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-12 flex flex-col gap-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-portal-muted flex-wrap">
        <Link href="/v2" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/v2/resources" className="hover:text-white transition-colors">
          Resources
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-medium truncate max-w-xs sm:max-w-md">
          {resource.title}
        </span>
      </nav>

      <div>
        <Link
          href="/v2/resources"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-portal-accent px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          ← Back to Resources
        </Link>
      </div>

      <header className="flex flex-col gap-4 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/v2/resources?category=${encodeURIComponent(resource.category)}`}
            className="text-xs uppercase tracking-[0.16em] font-semibold text-portal-accent hover:text-white transition-colors"
          >
            {resource.category}
          </Link>
          <span className="text-xs text-slate-300 border border-white/15 px-2.5 py-0.5 rounded-full">
            Preview outline · full curriculum upcoming
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.08]">
          {resource.title}
        </h1>

        <p className="text-base sm:text-lg text-portal-muted leading-relaxed max-w-[65ch]">
          {resource.description}
        </p>
      </header>

      <article className="text-slate-300 leading-relaxed flex flex-col gap-6 text-base sm:text-lg max-w-[68ch]">
        <div className="border-l-2 border-portal-accent pl-4 py-1">
          <p className="text-sm sm:text-base text-slate-200">
            Structured to give AI engineers and builders a production-ready mental model for{' '}
            <strong className="text-white">{resource.title}</strong>.
          </p>
        </div>

        <h2 className="font-serif text-2xl font-bold text-white mt-2">
          1. Core Principles &amp; Architecture
        </h2>
        <p>
          Modern AI workflows depend on clear boundaries between deterministic application logic and probabilistic model inference. Establishing explicit contracts for inputs, context windows, and fallback behavior prevents silent failures in production.
        </p>

        <h2 className="font-serif text-2xl font-bold text-white mt-2">
          2. Implementation Pattern
        </h2>
        <div className="rounded-xl bg-[#08091a] border border-white/10 p-4 text-xs sm:text-sm font-mono text-slate-200">
          <div className="text-portal-muted mb-1">{'// Example workflow blueprint'}</div>
          <div>const pipeline = createWorkflow(&quot;{resource.slug}&quot;);</div>
          <div>const result = await pipeline.run({'{ strictValidation: true }'});</div>
        </div>

        <h2 className="font-serif text-2xl font-bold text-white mt-2">
          3. Evaluation &amp; Next Steps
        </h2>
        <p>
          Before shipping changes, benchmark latency, token cost, and output accuracy against a curated evaluation set. Interactive templates and code exercises for this module will be published in an upcoming release.
        </p>
      </article>

      {relatedResources.length > 0 && (
        <section className="mt-6 pt-8 border-t border-white/10">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Related in {resource.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedResources.map((rel) => (
              <Link
                key={rel.id}
                href={`/v2/resources/${rel.slug}`}
                className="group border-t border-white/15 pt-3 hover:border-portal-accent transition-colors block"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-portal-accent block mb-1">
                  {rel.category}
                </span>
                <h3 className="text-sm font-semibold text-white group-hover:text-portal-accent transition-colors line-clamp-2 mb-1">
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
    </div>
  );
}
