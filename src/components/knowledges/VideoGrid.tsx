import React from 'react';
import { Video } from '@/lib/types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {videos.map((vid) => (
        <VideoCard key={vid.id} video={vid} />
      ))}
    </div>
  );
};
