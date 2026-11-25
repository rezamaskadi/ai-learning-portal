import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { resources } from '@/data/resources';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const resource = resources.find((r) => r.slug === params.slug);
  if (!resource) return { title: 'Resource Tidak Ditemukan — AI Creator Labs' };

  return {
    title: `${resource.title} — AI Creator Labs`,
    description: resource.description,
  };
}

export default function ResourceDetailPage({ params }: PageProps) {
  const resource = resources.find((r) => r.slug === params.slug);

  if (!resource) {
    notFound();
  }

  // Related resources in the same category
  const relatedResources = resources
    .filter((r) => r.category === resource.category && r.slug !== resource.slug)
    .slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-portal-muted flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">
          Beranda
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

      {/* Back Button */}
      <div>
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-purple-400/50 hover:bg-white/[0.08] transition-all duration-200"
        >
          <span>← Kembali ke Resources</span>
        </Link>
      </div>

      {/* Article / Resource Header */}
      <header className="flex flex-col gap-4 border-b border-portal-border/60 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-portal-accent bg-portal-accent/10 border border-portal-accent/25 px-3 py-1 rounded-full">
            {resource.category}
          </span>
          <span className="text-xs text-amber-300/90 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
            <span>ℹ️</span> Konten dummy — isi asli menyusul
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {resource.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
          {resource.description}
        </p>
      </header>

      {/* Main Body Content (4-6 Paragraphs Placeholder) */}
      <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed flex flex-col gap-6 text-base sm:text-lg">
        <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>✨</span> Ringkasan Materi & Panduan Praktis
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Panduan ini dirancang untuk memberikan pemahaman arsitektural komprehensif bagi praktisi AI yang sedang mengimplementasikan <strong>{resource.title}</strong> dalam skala produksi. Setiap modul disusun secara modular dan terukur.
          </p>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mt-4">
          1. Fondasi Konseptual dan Prinsip Desain
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Dalam arsitektur modern, implementasi yang efisien memerlukan pemisahan tanggung jawab yang jelas antara lapisan representasi pengetahuan dan orkestrasi model. Pendekatan ini memungkinkan fleksibilitas yang lebih besar dalam mengganti komponen tanpa mengorbankan stabilitas sistem inti.
        </p>

        <h3 className="font-serif text-2xl font-bold text-white mt-4">
          2. Rekomendasi Pola Implementasi di Lingkungan Produksi
        </h3>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
        </p>

        <div className="rounded-xl bg-[#0b0c1e] border border-white/[0.08] p-4 text-xs sm:text-sm font-mono text-purple-200">
          <div className="text-slate-400 mb-1">{'// Contoh arsitektur alur kerja'}</div>
          <div>pipeline = initialize_orchestrator(model=&quot;frontier-llm&quot;)</div>
          <div>result = pipeline.execute_step(task=&quot;{resource.slug}&quot;)</div>
          <div>verify_guardrails(result, strict_mode=True)</div>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mt-4">
          3. Evaluasi Kinerja dan Metrik Keberhasilan
        </h3>
        <p>
          Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Konten lengkap dan studi kasus riil untuk modul ini akan segera diperbarui pada rilis dokumentasi berikutnya.
        </p>
      </article>

      {/* Related Resources Section */}
      {relatedResources.length > 0 && (
        <section className="mt-8 pt-8 border-t border-portal-border/60">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Materi Terkait dalam Kategori Ini
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

      {/* Bottom Back CTA */}
      <div className="pt-6 border-t border-portal-border/30 flex justify-between items-center flex-wrap gap-4">
        <Link
          href="/resources"
          className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Kembali ke Semua Resources
        </Link>
        <Link
          href="/"
          className="text-xs text-portal-muted hover:text-white transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
