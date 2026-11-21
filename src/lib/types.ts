export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  url: string;
  content?: string[];
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;    // path to placeholder or gradient CSS
  duration: string;     // e.g. "12:34"
  description?: string;
  source?: string;      // e.g. "AI Creator Labs"
  youtubeUrl: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readingTime: string;  // e.g. "5 min read"
  date: string;         // ISO date string
  url: string;
  content?: string[];
}

export interface Shortcut {
  label: string;
  href: string;
}
