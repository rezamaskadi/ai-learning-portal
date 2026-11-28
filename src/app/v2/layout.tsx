import React from 'react';
import { V2EditorialShell } from '@/components/v2/V2EditorialShell';

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <V2EditorialShell>{children}</V2EditorialShell>;
}
