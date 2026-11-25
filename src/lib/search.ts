import { Video } from '@/lib/types';

/**
 * Matches a search query against an array of text fields.
 * Short tokens (<= 3 chars, e.g. "ai", "rag", "nlp") use word-boundary matching
 * to prevent false positives inside words like "training" or "detail".
 */
export function matchesSearchQuery(fields: (string | undefined)[], rawQuery: string): boolean {
  const trimmed = rawQuery.trim().toLowerCase();
  if (!trimmed) return true;

  const fullText = fields
    .filter((f): f is string => Boolean(f))
    .join(' ')
    .toLowerCase();

  if (fullText.includes(trimmed)) return true;

  const terms = trimmed.split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return true;

  return terms.some((term) => {
    if (term.length <= 3) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${escaped}\\b`, 'i').test(fullText);
    }
    return fullText.includes(term);
  });
}

/**
 * Parses "MM:SS" or "HH:MM:SS" duration strings into total seconds.
 */
export function parseDurationSeconds(duration: string): number {
  const parts = duration.split(':').map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return 0;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

export type VideoSortOption = 'newest' | 'duration-desc' | 'duration-asc' | 'title-asc';

/**
 * Returns a sorted copy of videos without mutating the input array.
 */
export function sortVideos(items: Video[], sortBy: VideoSortOption): Video[] {
  if (sortBy === 'duration-desc') {
    return [...items].sort((a, b) => parseDurationSeconds(b.duration) - parseDurationSeconds(a.duration));
  }
  if (sortBy === 'duration-asc') {
    return [...items].sort((a, b) => parseDurationSeconds(a.duration) - parseDurationSeconds(b.duration));
  }
  if (sortBy === 'title-asc') {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }
  return items;
}
