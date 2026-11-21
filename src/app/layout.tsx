import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { PageShell } from '@/components/layout/PageShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'AI Creator Labs — Learning Portal',
  description: 'Explore curated resources, knowledges, and articles on AI and creativity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable} font-sans`}>
      <body className="antialiased bg-portal-darker text-slate-100 min-h-screen font-sans">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
