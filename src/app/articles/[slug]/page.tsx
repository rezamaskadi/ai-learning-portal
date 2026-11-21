import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { articles } from '@/data/articles';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan — AI Creator Labs' };

  return {
    title: `${article.title} — AI Creator Labs`,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Related articles sharing at least one tag
  const relatedArticles = articles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.tags.some((t) => article.tags.includes(t))
    )
    .slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-portal-muted flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">
          Beranda
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

      {/* Back Button */}
      <div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-purple-400/50 hover:bg-white/[0.08] transition-all duration-200"
        >
          <span>← Kembali ke Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="flex flex-col gap-4 border-b border-portal-border/60 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-portal-accent/10 border border-portal-accent/20 text-portal-accent px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="text-xs text-amber-300/90 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
            <span>ℹ️</span> Konten dummy — isi asli menyusul
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {article.title}
        </h1>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-portal-muted pt-2">
          <span>Ditulis oleh <strong className="text-white">AI Creator Labs Research</strong></span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readingTime}</span>
        </div>
      </header>

      {/* Main Body Content (4-6 Paragraphs Lorem Ipsum with Technical Subheadings) */}
      <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed flex flex-col gap-6 text-base sm:text-lg">
        <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed italic border-l-4 border-purple-500 pl-4 py-1">
          &ldquo;{article.excerpt}&rdquo;
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-4">
          Latar Belakang dan Evolusi Pendekatan
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Perkembangan pesat model bahasa besar telah mengubah paradigma rekayasa perangkat lunak secara fundamental. Apa yang dulunya memerlukan pemodelan statistik berlapis kini dapat didefinisikan melalui instruksi terarah dan representasi konteks dinamis.
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-4">
          Tantangan Utama dan Analisis Arsitektural
        </h2>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
        </p>

        <blockquote className="my-2 p-4 rounded-xl bg-white/[0.03] border-l-2 border-purple-400 text-slate-200 text-base italic">
          Keandalan sistem otonom berbanding lurus dengan ketepatan batas pengawasan dan mekanisme evaluasi berkelanjutan yang diterapkan pada setiap tahap penalaran.
        </blockquote>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-4">
          Penerapan Praktis dan Pandangan Masa Depan
        </h2>
        <p>
          Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Artikel penuh dengan benchmark terperinci dan kode implementasi akan dipublikasikan secara lengkap pada seri mendatang.
        </p>
      </article>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-8 pt-8 border-t border-portal-border/60">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Artikel Terkait
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

      {/* Bottom Back CTA */}
      <div className="pt-6 border-t border-portal-border/30 flex justify-between items-center flex-wrap gap-4">
        <Link
          href="/articles"
          className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Kembali ke Semua Articles
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
