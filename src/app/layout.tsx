import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { V2PageShell } from '@/components/v2/V2PageShell';

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
        <V2PageShell>{children}</V2PageShell>
      </body>
    </html>
  );
}
