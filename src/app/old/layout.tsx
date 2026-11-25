import React from 'react';
import { PageShell } from '@/components/layout/PageShell';

export default function OldLayout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
