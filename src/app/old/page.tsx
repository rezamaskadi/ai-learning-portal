import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { NavTabs } from '@/components/layout/NavTabs';
import { ShortcutPills } from '@/components/home/ShortcutPills';
import { ChatInput } from '@/components/home/ChatInput';
import { shortcuts } from '@/data/shortcuts';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 gap-8 min-h-[calc(100vh-80px)]">
      <HeroSection />
      <NavTabs />
      <ShortcutPills shortcuts={shortcuts} />
      <ChatInput />
    </div>
  );
}
