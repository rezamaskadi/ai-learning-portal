import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { V2NavTabs } from '@/components/v2/V2NavTabs';
import { ShortcutPills } from '@/components/home/ShortcutPills';
import { V2ChatInput } from '@/components/v2/V2ChatInput';
import { v2Shortcuts } from '@/data/v2/shortcuts';

export default function V2HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 gap-8 min-h-[calc(100vh-80px)]">
      <HeroSection />
      <V2NavTabs />
      <ShortcutPills shortcuts={v2Shortcuts} />
      <V2ChatInput />
    </div>
  );
}
