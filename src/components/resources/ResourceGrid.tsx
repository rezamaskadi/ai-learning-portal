import React from 'react';
import { Resource } from '@/lib/types';
import { ResourceCard } from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-16 text-portal-muted">
        <p className="text-base">No resources found matching this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {resources.map((res) => (
        <ResourceCard key={res.id} resource={res} />
      ))}
    </div>
  );
};
