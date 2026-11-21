# AI Creator Labs — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a premium, dark-themed learning portal landing page for AI Creator Labs with three content sections (Resources, Knowledges, Articles) — all powered by static data, fully responsive, and visually consistent.

**Architecture:** Next.js 14+ App Router with Tailwind CSS. All content is static/hardcoded in TypeScript data files. The site uses client-side tab navigation between three content pages. A particle animation layer and blurred background overlay create the premium aesthetic. No external CMS or API.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, tsparticles (lightweight particle effects), Google Fonts (Playfair Display for serif headings, Inter for body text)

**Spec:** This plan implements the AI Creator Labs portal spec provided in conversation.

## Global Constraints

- Next.js 14+ with App Router (`app/` directory)
- TypeScript strict mode
- Tailwind CSS v3+ — no other CSS frameworks
- No copyrighted images, logos, or fonts without license — use freely-licensed Google Fonts and either CSS gradients or royalty-free images
- Do NOT copy colors, logos, or identity from reference sites (aihero.dev, creatorscience.com) — use original blue-purple dark theme
- All text must pass WCAG AA contrast ratio (4.5:1) against dark backgrounds
- Responsive: no horizontal scroll, no clipped elements, no overlapping content on screens 320px–1920px
- Lightweight: no heavy libraries beyond tsparticles; lazy-load where possible
- Zero external API calls — all data is static TypeScript

## Review Focus

1. **Mobile nav overflow** — Three tab buttons + capsule pills on a 320px screen could overflow horizontally; verify horizontal scroll is suppressed and pills wrap gracefully.
2. **Particle performance on low-end devices** — tsparticles on mobile Safari could cause jank; verify frame rate stays above 30fps or particles are disabled on small screens.
3. **Contrast on blurred backgrounds** — Text over a blurred/overlay background may lose readability in certain regions; verify all text areas have a solid or semi-opaque backdrop behind them.
4. **Tab state on direct URL access** — Navigating directly to `/resources` should show the Resources tab as active, not default to home with no tab selected.
5. **Empty states** — If a tag in Articles has no articles, or a filter yields no results, the page should show a clear empty-state message, not a blank area.

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout: fonts, metadata, background, particles
│   ├── page.tsx                      # Home/landing page
│   ├── resources/
│   │   └── page.tsx                  # Resources grid page
│   ├── knowledges/
│   │   └── page.tsx                  # Video library page
│   └── articles/
│       └── page.tsx                  # Articles by tag page
├── components/
│   ├── layout/
│   │   ├── Background.tsx            # Dark blurred background + cool-toned overlay
│   │   ├── ParticleLayer.tsx         # Floating light particle animation
│   │   ├── NavTabs.tsx               # Three-tab navigation (Resources, Knowledges, Articles)
│   │   └── PageShell.tsx             # Shared page wrapper (background + nav + content)
│   ├── home/
│   │   ├── HeroSection.tsx           # Label + title + subtitle
│   │   ├── ShortcutPills.tsx         # Capsule shortcut buttons
│   │   └── ChatInput.tsx             # Decorative chat-style input
│   ├── resources/
│   │   ├── ResourceCard.tsx          # Individual resource card
│   │   └── ResourceGrid.tsx          # Responsive grid of resource cards
│   ├── knowledges/
│   │   ├── VideoCard.tsx             # Individual video card with thumbnail + duration
│   │   └── VideoGrid.tsx             # Responsive grid of video cards
│   └── articles/
│       ├── TagSidebar.tsx            # List of selectable tags
│       ├── ArticleCard.tsx           # Individual article card
│       └── ArticleList.tsx           # Filtered list of articles by selected tag
├── data/
│   ├── resources.ts                  # Static resource entries (12–16 items)
│   ├── videos.ts                     # Static video entries (8–12 items)
│   ├── articles.ts                   # Static article entries with tags (10–15 items)
│   └── shortcuts.ts                  # Popular topic shortcuts for home page pills
├── lib/
│   └── types.ts                      # Shared TypeScript interfaces
└── styles/
    └── globals.css                   # Tailwind directives, custom CSS variables, font imports
```

---

### Task 1: Project Scaffolding & Global Visual Foundation

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `tsconfig.json` (via `create-next-app`)
- Create: `src/styles/globals.css`
- Create: `src/lib/types.ts`
- Create: `src/app/layout.tsx`
- Create: `src/components/layout/Background.tsx`
- Create: `src/components/layout/ParticleLayer.tsx`
- Create: `src/components/layout/PageShell.tsx`

**Interfaces:**
- Consumes: nothing (first task)
- Produces:
  - `<PageShell>` component wrapping `{children}` with background + particles
  - `Resource`, `Video`, `Article`, `Shortcut` TypeScript interfaces in `lib/types.ts`
  - Tailwind theme extended with custom color palette (`portal-dark`, `portal-purple`, `portal-blue`, accent colors)
  - Google Fonts loaded: Playfair Display (serif) + Inter (sans-serif)

- [x] **Step 1: Scaffold the Next.js project**

Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` (in the project root)

Confirm: dev server starts with `npm run dev`

- [x] **Step 2: Install tsparticles**

Run: `npm install @tsparticles/react @tsparticles/slim`

- [x] **Step 3: Define shared TypeScript interfaces in `src/lib/types.ts`**

```typescript
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;    // path to placeholder or gradient CSS
  duration: string;     // e.g. "12:34"
  description?: string;
  source?: string;      // e.g. "AI Creator Labs"
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  readingTime: string;  // e.g. "5 min read"
  date: string;         // ISO date string
  url: string;
}

export interface Shortcut {
  label: string;
  href: string;
}
```

- [x] **Step 4: Configure Tailwind theme & global styles**

In `tailwind.config.ts`, extend with:
- Colors: `portal: { dark: '#0a0a1a', darker: '#050510', purple: '#7c3aed', blue: '#3b82f6', accent: '#a78bfa', muted: '#94a3b8', card: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' }`
- Font families: `serif: ['Playfair Display', 'serif']`, `sans: ['Inter', 'sans-serif']`

In `src/styles/globals.css`: import Google Fonts via `@import`, set `body` background to `portal-darker`, default text color to white/near-white.

- [x] **Step 5: Build `Background.tsx` — full-viewport dark layer with blurred gradient overlay**

A fixed, full-screen `div` behind all content. Uses CSS: radial gradients in blue-purple tones, `filter: blur(80px)`, overlaid with a semi-transparent dark layer (`bg-portal-dark/80`). No external images required — pure CSS gradients.

- [x] **Step 6: Build `ParticleLayer.tsx` — subtle floating light particles**

Client component (`"use client"`). Uses `@tsparticles/react` with slim preset. Config: 30–50 small white/blue particles, opacity 0.3–0.6, slow random movement (speed 0.3–0.8), no click/hover interactivity, `z-index: 1`. Must be non-blocking — load particles lazily. Add a check: if viewport width < 768px, reduce particle count to 15 or disable entirely for performance.

- [x] **Step 7: Build `PageShell.tsx` — shared wrapper**

Accepts `children`. Renders: `<Background />` → `<ParticleLayer />` → `<main className="relative z-10">` wrapping `{children}`. This is the base layout for every page.

- [x] **Step 8: Wire up `layout.tsx`**

Root layout loads fonts (Playfair Display + Inter via `next/font/google`), sets `<html lang="en" className="dark">`, wraps `{children}` in `<PageShell>`. Sets metadata: title "AI Creator Labs", description.

- [x] **Step 9: Verify visual foundation**

Run: `npm run dev` — confirm:
- Dark background with blurred purple/blue gradient visible
- Particles floating smoothly
- No horizontal scrollbar on mobile viewport (320px via DevTools)
- Font applied (inspect element confirms Playfair Display / Inter)

- [x] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: project scaffolding with dark theme, particles, and global layout"
```

---

### Task 2: Navigation Tabs Component

**Files:**
- Create: `src/components/layout/NavTabs.tsx`

**Interfaces:**
- Consumes: Next.js `usePathname()` for active state
- Produces: `<NavTabs />` component rendering three horizontal uppercase tab buttons (RESOURCES, KNOWLEDGES, ARTICLES) with:
  - Active tab: thin bottom border (`border-b-2 border-portal-accent`)
  - Hover: text brightens (`hover:text-white transition-colors`)
  - Links to `/resources`, `/knowledges`, `/articles`
  - Centered horizontal layout, responsive (no overflow on mobile)

- [x] **Step 1: Build `NavTabs.tsx`**

Client component. Uses `next/link` and `usePathname()`. Three tabs as `<Link>` elements, uppercase, tracking-wide, small font. Active tab detected by `pathname.startsWith('/resources')` etc. Home page (`/`) shows no active tab. Tabs wrap on very narrow screens via `flex-wrap`.

- [x] **Step 2: Integrate into `PageShell.tsx`**

Add `<NavTabs />` inside `PageShell`, positioned below where the hero section will go (or at the top for sub-pages). NavTabs shows on all pages.

- [x] **Step 3: Create stub pages for routing**

Create minimal `src/app/resources/page.tsx`, `src/app/knowledges/page.tsx`, `src/app/articles/page.tsx` — each returning a `<div>` with the page name as placeholder text.

- [x] **Step 4: Verify navigation**

Run: `npm run dev` — confirm:
- Three tabs visible, centered, uppercase
- Clicking each tab navigates to correct route
- Active tab shows underline
- Hover brightens text
- On 320px viewport, tabs don't cause horizontal scroll
- Navigating to `/resources` directly (not from home) still shows active tab correctly

- [x] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add NavTabs with active state and sub-page routing"
```

---

### Task 3: Home Page — Hero, Shortcuts, Chat Input

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/ShortcutPills.tsx`
- Create: `src/components/home/ChatInput.tsx`
- Create: `src/data/shortcuts.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Shortcut` interface from `lib/types.ts`, `<NavTabs />` from Task 2
- Produces:
  - `<HeroSection />`: small label ("AI Learning Portal"), portal name "AI Creator Labs" in serif, brief subtitle
  - `<ShortcutPills />`: horizontal row of capsule buttons with thin borders, wrapping on mobile
  - `<ChatInput />`: decorative input field styled like a chat box, non-functional (placeholder text like "Ask anything about AI...")
  - Full home page composition: Hero → NavTabs → ShortcutPills → ChatInput

- [x] **Step 1: Create shortcut data in `src/data/shortcuts.ts`**

8–10 entries: `{ label: "Prompt Engineering", href: "/resources" }`, `{ label: "AI Agents", href: "/resources" }`, `{ label: "LLM Fine-tuning", href: "/resources" }`, `{ label: "RAG Systems", href: "/knowledges" }`, `{ label: "AI Ethics", href: "/articles" }`, `{ label: "Computer Vision", href: "/resources" }`, `{ label: "NLP Basics", href: "/knowledges" }`, `{ label: "Generative AI", href: "/articles" }`.

- [x] **Step 2: Build `HeroSection.tsx`**

Centered layout. Elements top-to-bottom:
1. Small uppercase label in muted color: "AI LEARNING PORTAL" (tracking-widest, text-xs)
2. Portal name "AI Creator Labs" in `font-serif text-5xl md:text-7xl font-bold text-white` (Playfair Display)
3. Subtitle in muted color: one line describing the portal, e.g. "Explore curated resources, videos, and articles on AI"

- [x] **Step 3: Build `ShortcutPills.tsx`**

Accepts `shortcuts: Shortcut[]`. Renders a flex-wrap centered row of `<Link>` capsules: `rounded-full border border-portal-border px-4 py-1.5 text-sm text-portal-muted hover:text-white hover:border-portal-accent transition-all`. Each links to its `href`.

- [x] **Step 4: Build `ChatInput.tsx`**

A purely decorative div styled as an input area. Rounded-2xl, dark semi-transparent background (`bg-white/5`), thin border, a placeholder text in muted color ("Ask anything about AI..."), and a small send icon (use a simple SVG arrow or ▶ character). `pointer-events-none` or `cursor-default` to signal non-functionality. Max width ~600px, centered.

- [x] **Step 5: Compose `page.tsx` (home)**

Stack vertically with generous spacing: `<HeroSection />` → `<NavTabs />` → `<ShortcutPills shortcuts={shortcuts} />` → `<ChatInput />`. Centered, padded, `min-h-screen flex flex-col items-center justify-center gap-8`.

- [x] **Step 6: Verify home page**

Run: `npm run dev` — confirm:
- Small label visible above title
- "AI Creator Labs" in serif font, large and prominent
- Three nav tabs below title
- Capsule pills wrap gracefully on mobile
- Chat input is visible, styled, non-interactive
- All text readable against dark background (check contrast)
- No horizontal scroll at 320px
- Overall impression: calm, premium, like an exclusive learning space

- [x] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: home page with hero, shortcut pills, and decorative chat input"
```

---

### Task 4: Static Data Files

**Files:**
- Create: `src/data/resources.ts`
- Create: `src/data/videos.ts`
- Create: `src/data/articles.ts`

**Interfaces:**
- Consumes: `Resource`, `Video`, `Article` interfaces from `lib/types.ts`
- Produces:
  - `resources: Resource[]` — 12–16 items across 4 categories ("Prompt Engineering", "AI Agents", "Machine Learning", "Tools & Frameworks")
  - `videos: Video[]` — 8–12 items with placeholder thumbnails (CSS gradient strings or `/placeholder-*.svg`), realistic titles and durations
  - `articles: Article[]` — 10–15 items tagged with 4–6 tags ("Getting Started", "Deep Dives", "Tutorials", "Industry Trends", "Research", "Best Practices"), each with excerpt and reading time

- [x] **Step 1: Create `src/data/resources.ts`**

Export `const resources: Resource[]` with 14 entries. Use realistic AI-learning titles: "Introduction to Prompt Engineering", "Building AI Agents with LangChain", "Fine-tuning LLMs: A Practical Guide", etc. Each has a 1–2 sentence description and a category. URLs point to `"#"` (placeholder).

- [x] **Step 2: Create `src/data/videos.ts`**

Export `const videos: Video[]` with 10 entries. Thumbnails use placeholder values (will be rendered as gradient cards). Durations realistic: "12:34", "8:15", "23:47", etc. Titles match AI learning content.

- [x] **Step 3: Create `src/data/articles.ts`**

Export `const articles: Article[]` with 12 entries. Each has 1–3 tags from the tag set. Excerpts are 1–2 sentences. Reading times vary: "3 min read" to "12 min read". Dates span the last 6 months.

Also export `const allTags: string[]` derived from unique tags across all articles.

- [x] **Step 4: Verify data files**

Run: `npx tsc --noEmit` — confirm no TypeScript errors in data files.

- [x] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add static data for resources, videos, and articles"
```

---

### Task 5: Resources Page

**Files:**
- Create: `src/components/resources/ResourceCard.tsx`
- Create: `src/components/resources/ResourceGrid.tsx`
- Modify: `src/app/resources/page.tsx`

**Interfaces:**
- Consumes: `Resource` from `lib/types.ts`, `resources` from `data/resources.ts`, `<NavTabs />` from Task 2
- Produces:
  - `<ResourceCard resource={Resource} />`: card with title, description, category badge, hover effect (slight lift + border glow), links to `resource.url`
  - `<ResourceGrid resources={Resource[]} />`: responsive CSS Grid — 1 col mobile, 2 col tablet, 3 col desktop
  - Full `/resources` page with page title, optional category filter pills, and resource grid

- [x] **Step 1: Build `ResourceCard.tsx`**

Card layout: `rounded-xl bg-portal-card border border-portal-border p-6`. Top: category as a small colored badge (`text-xs uppercase tracking-wide text-portal-accent`). Middle: title in `text-lg font-semibold text-white`. Bottom: description in `text-sm text-portal-muted`. Hover: `hover:border-portal-accent/50 hover:translate-y-[-2px] transition-all duration-200`. Wrapped in `<a>` or `<Link>` to `resource.url`.

- [x] **Step 2: Build `ResourceGrid.tsx`**

Accepts `resources: Resource[]`. Renders a `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` of `<ResourceCard>` components.

- [x] **Step 3: Build the Resources page**

`src/app/resources/page.tsx`: renders a centered container with:
1. Page title: "Resources" in serif font (`text-4xl font-serif`)
2. Brief subtitle in muted text
3. Category filter pills (optional): horizontal row of capsule buttons for each unique category, with "All" selected by default. Use client-side state (`useState`) to filter the grid.
4. `<ResourceGrid resources={filtered} />`

Include `<NavTabs />` at top (or rely on it from layout — adjust PageShell if needed so NavTabs is always visible on sub-pages).

- [x] **Step 4: Verify Resources page**

Run: `npm run dev` → navigate to `/resources`:
- Grid of 14 cards visible
- Cards show title, description, category badge
- Hover effect works (lift + border glow)
- Category filter pills work if implemented
- Responsive: 1 column at 320px, 2 at 768px, 3 at 1024px+
- NavTabs shows "Resources" as active
- Can navigate back to home via clicking the logo/title or browser back

- [x] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: resources page with card grid and category filter"
```

---

### Task 6: Knowledges Page (Video Library)

**Files:**
- Create: `src/components/knowledges/VideoCard.tsx`
- Create: `src/components/knowledges/VideoGrid.tsx`
- Modify: `src/app/knowledges/page.tsx`

**Interfaces:**
- Consumes: `Video` from `lib/types.ts`, `videos` from `data/videos.ts`, `<NavTabs />` from Task 2
- Produces:
  - `<VideoCard video={Video} />`: card with gradient thumbnail area, duration badge overlay, title below
  - `<VideoGrid videos={Video[]} />`: responsive grid — 1 col mobile, 2 col tablet, 3–4 col desktop
  - Full `/knowledges` page with page title, sort control (decorative), and video grid

- [x] **Step 1: Build `VideoCard.tsx`**

Card layout: `rounded-xl overflow-hidden bg-portal-card border border-portal-border`. Top: thumbnail area — 16:9 aspect ratio div with a CSS gradient background (blue-to-purple variations per card, using `video.id` to vary the gradient). Duration badge: absolutely positioned bottom-right of thumbnail, `bg-black/70 text-white text-xs px-2 py-0.5 rounded`. Below thumbnail: `p-4` with title in `text-base font-medium text-white` and optional source line in `text-xs text-portal-muted`. Hover: subtle scale (`hover:scale-[1.02]`) + border accent.

- [x] **Step 2: Build `VideoGrid.tsx`**

Accepts `videos: Video[]`. Renders a `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` of `<VideoCard>` components.

- [x] **Step 3: Build the Knowledges page**

`src/app/knowledges/page.tsx`: renders:
1. Page title: "Knowledges" in serif font
2. Subtitle: "Video tutorials and learning content from AI Creator Labs"
3. Sort control (decorative): a small "Newest first ▼" button, non-functional
4. `<VideoGrid videos={videos} />`

- [x] **Step 4: Verify Knowledges page**

Run: `npm run dev` → navigate to `/knowledges`:
- Grid of 10 video cards visible
- Each has a gradient thumbnail, duration badge, and title
- Responsive grid: 1→2→3→4 columns across breakpoints
- NavTabs shows "Knowledges" as active
- Hover effects smooth

- [x] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: knowledges page with video card grid"
```

---

### Task 7: Articles Page (Tag-Based Grouping)

**Files:**
- Create: `src/components/articles/TagSidebar.tsx`
- Create: `src/components/articles/ArticleCard.tsx`
- Create: `src/components/articles/ArticleList.tsx`
- Modify: `src/app/articles/page.tsx`

**Interfaces:**
- Consumes: `Article` from `lib/types.ts`, `articles` and `allTags` from `data/articles.ts`, `<NavTabs />` from Task 2
- Produces:
  - `<TagSidebar tags={string[]} activeTag={string | null} onSelect={(tag) => void} />`: vertical list (desktop) or horizontal scrollable row (mobile) of tag buttons; active tag highlighted
  - `<ArticleCard article={Article} />`: horizontal card with title, excerpt, tags, reading time, and date
  - `<ArticleList articles={Article[]} />`: vertical list of article cards
  - Full `/articles` page: tag sidebar/bar + filtered article list, with "All" showing everything

- [x] **Step 1: Build `TagSidebar.tsx`**

Client component. Desktop (md+): vertical list on the left, `w-48`, each tag is a button with count of articles in that tag. Mobile: horizontal scrollable row (`flex overflow-x-auto gap-2 pb-2`) of pill-style buttons. Active tag: `bg-portal-accent/20 text-portal-accent border-portal-accent`. Includes an "All" option at the top.

- [x] **Step 2: Build `ArticleCard.tsx`**

Card layout: horizontal on desktop (`flex flex-row`), stacked on mobile. Left: text content — title (`text-lg font-semibold text-white`), excerpt (`text-sm text-portal-muted line-clamp-2`), bottom row of tags as tiny pills + reading time + date. Full card is a link. Hover: same card hover as ResourceCard (lift + border glow).

- [x] **Step 3: Build `ArticleList.tsx`**

Accepts `articles: Article[]`. Renders vertical stack (`flex flex-col gap-4`) of `<ArticleCard>`. If `articles` is empty, renders an empty-state message: "No articles found for this topic." centered in muted text.

- [x] **Step 4: Build the Articles page**

`src/app/articles/page.tsx`: client component. State: `activeTag: string | null` (null = "All"). Layout: on desktop, two-column (`flex flex-row gap-8`) — `<TagSidebar>` on left, `<ArticleList>` on right filling remaining space. On mobile, `<TagSidebar>` horizontal on top, `<ArticleList>` below. Filtering: when `activeTag` is set, filter articles where `article.tags.includes(activeTag)`.

- [x] **Step 5: Verify Articles page**

Run: `npm run dev` → navigate to `/articles`:
- Tags visible (sidebar on desktop, horizontal bar on mobile)
- Clicking a tag filters articles immediately
- "All" shows all articles
- Empty state appears when selecting a tag with no articles (if applicable)
- Article cards show title, excerpt, tags, reading time
- NavTabs shows "Articles" as active
- Responsive layout works at all breakpoints

- [x] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: articles page with tag-based filtering"
```

---

### Task 8: Navigation Polish & Home Return

**Files:**
- Modify: `src/components/layout/PageShell.tsx`
- Modify: `src/components/layout/NavTabs.tsx`
- Modify: `src/components/home/HeroSection.tsx`

**Interfaces:**
- Consumes: all components from previous tasks
- Produces:
  - Portal name "AI Creator Labs" in NavTabs/header area that links back to home (`/`)
  - Consistent page structure: on sub-pages (resources/knowledges/articles), show a compact header with logo + NavTabs at top, content below
  - On home page, show full hero; on sub-pages, show compact header only

- [x] **Step 1: Add home link to NavTabs area**

In `NavTabs.tsx` or `PageShell.tsx`, add a clickable "AI Creator Labs" title/logo above the tabs that links to `/`. On sub-pages, this appears as a compact header element. On home (`/`), the full `<HeroSection>` serves this purpose, so the compact header is hidden.

- [x] **Step 2: Adjust PageShell for sub-page layout**

PageShell should detect if it's on the home page (via `usePathname()`) and adjust:
- Home: full-height centered hero layout
- Sub-pages: compact top header (logo + tabs) + scrollable content area with max-width container (`max-w-6xl mx-auto px-4`)

- [x] **Step 3: Verify navigation flow**

Run: `npm run dev` → test full flow:
- Home → click Resources → Resources page loads, tab active, logo links home
- Resources → click Knowledges → Knowledges page loads, correct tab active
- Knowledges → click "AI Creator Labs" header → returns to home
- Direct URL `/articles` → Articles page, correct tab, logo present
- Browser back/forward works correctly
- Mobile: same flow, all elements accessible

- [x] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: navigation polish with home return and consistent page layout"
```

---

### Task 9: Responsive Design Pass & Final Polish

**Files:**
- Modify: multiple component files as needed for responsive fixes
- Modify: `src/styles/globals.css` if needed

**Interfaces:**
- Consumes: all previous tasks
- Produces: fully responsive, polished landing page passing all acceptance criteria

- [x] **Step 1: Mobile audit (320px, 375px, 414px)**

Using browser DevTools, check every page at three mobile widths:
- No horizontal scrollbar
- Text readable, not too small (minimum 14px body)
- Cards stack to single column
- Capsule pills wrap (don't overflow)
- NavTabs don't overflow
- Chat input doesn't exceed viewport
- Tag sidebar becomes horizontal scroll on mobile
- Particles reduced or disabled

Fix any issues found.

- [x] **Step 2: Tablet audit (768px, 1024px)**

Check all pages:
- Two-column grids active
- Comfortable spacing
- NavTabs centered and clean
- Articles page sidebar visible alongside content

Fix any issues found.

- [x] **Step 3: Desktop audit (1280px, 1920px)**

Check all pages:
- Content constrained to max-width (not stretching edge-to-edge)
- Three or four column grids
- Generous whitespace
- Particles visible and smooth

Fix any issues found.

- [x] **Step 4: Contrast & accessibility check**

Verify WCAG AA contrast for:
- Hero title on dark background
- Muted subtitle text
- Card text on card background
- Tab text (active and inactive)
- Capsule pill text

Adjust colors if any fail.

- [x] **Step 5: Performance check**

Run: `npm run build && npm run start` — confirm:
- Build succeeds with no errors
- Pages load in < 2 seconds on throttled connection (DevTools → Slow 3G)
- No layout shift (CLS)
- Particles don't cause frame drops

- [x] **Step 6: Commit**

```bash
git add -A
git commit -m "fix: responsive design pass and accessibility polish"
```

---

### Task 10: Final Verification & Production Build

**Files:**
- No new files

**Interfaces:**
- Consumes: entire project
- Produces: verified, production-ready build

- [x] **Step 1: Full acceptance criteria checklist**

Manually verify every point from the spec:

- [x] Small label above title ✓
- [x] Portal name "AI Creator Labs" in serif font ✓
- [x] Three nav tabs: Resources, Knowledges, Articles ✓
- [x] Capsule shortcut pills ✓
- [x] Decorative chat-style input ✓
- [x] Dark background with blurred visual ✓
- [x] Particle effects, subtle ✓
- [x] All text readable ✓
- [x] Resources page: card grid with title, description, category ✓
- [x] Knowledges page: video library with thumbnails, titles, durations ✓
- [x] Articles page: tag-based grouping ✓
- [x] Active tab clearly indicated ✓
- [x] Can return to home from any page ✓
- [x] Visual consistency across all pages ✓
- [x] Responsive on mobile and desktop ✓
- [x] No horizontal scroll ✓
- [x] Lightweight loading ✓
- [x] All links functional ✓
- [x] No copied branding from reference sites ✓
- [x] No copyrighted assets ✓

- [x] **Step 2: Production build**

Run: `npm run build` — confirm zero errors, zero warnings.

- [x] **Step 3: Final commit & tag**

```bash
git add -A
git commit -m "chore: final verification pass"
git tag v1.0.0
```
