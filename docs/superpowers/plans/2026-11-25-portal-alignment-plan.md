# AI Creator Labs Portal — Audit Alignment & Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the AI Creator Labs learning portal with every functional, structural, accessibility, and content requirement from the project specification and reference structures (`aihero.dev/skills`, `aihero.dev/videos`, `creatorscience.com/tags/`), while fixing discovered bugs in search matching, sorting, tag taxonomy, and build/lint tooling.

**Architecture:** Next.js 14 App Router with TypeScript and Tailwind CSS using static TypeScript data modules (`src/data/*`). Improvements preserve the existing cosmic dark-purple aesthetic and static-first architecture while fixing client-side filtering logic, data taxonomy consistency, UI alignment, and automated verification.

**Tech Stack:** Next.js 14.2.15 (App Router), React 18, TypeScript 5.6 (strict), Tailwind CSS 3.4, `@tsparticles/react` + `@tsparticles/slim`, Vitest (to be added for unit verification of search/sort/data integrity).

**Spec:** User requirements for *Landing Page Portal Belajar AI Creator Labs* + structural references (`aihero.dev/skills`, `aihero.dev/videos`, `creatorscience.com/tags/`).

## Global Constraints

- Next.js 14+ App Router (`src/app/`) with static-first rendering (`npm run build` zero errors/warnings).
- TypeScript strict mode (`npx tsc --noEmit` zero errors).
- Non-interactive ESLint check (`npm run lint` runs cleanly without prompts and exits 0).
- Aesthetic: calm, exclusive dark portal (`#050510` / `#0a0a1a`), blurred cold blue-purple visual background, subtle floating light particles, high-contrast WCAG AA (>= 4.5:1) text and controls.
- Navigation: 3 uppercase horizontal tabs (`RESOURCES`, `KNOWLEDGES`, `ARTICLES`) with thin active underline and subtle hover brightening; capsule shortcut pills below navigation.
- Original identity only: no copied logos, colors, or copyrighted media/fonts from reference sites.
- Responsive across 320px–1920px with zero horizontal scroll (`overflow-x-hidden`).

## Review Focus

1. **Shortcut-to-result guarantee** — Clicking any of the 8 capsule pills on `/` (`Prompt Engineering`, `AI Agents`, `LLM Fine-tuning`, `RAG Systems`, `AI Ethics`, `Computer Vision`, `NLP Basics`, `Generative AI`) must land on a non-empty filtered list with genuinely relevant items (no empty states, no false-positive `"ai"` substring matches in words like `"training"` or `"detail"`).
2. **Numeric video duration sorting** — Sorting by duration on `/knowledges` must compare parsed total seconds (`"8:15"` < `"12:34"` < `"1:05:00"`), not lexicographical string order.
3. **Orphan tags in Articles taxonomy** — Every tag present on any `Article` in `src/data/articles.ts` (including `"Machine Learning"`) must appear in `allTags` and `TagSidebar`, so no clickable/visible tag is unreachable from the filter sidebar.
4. **Reduced motion & mobile safety** — `ParticleLayer` must respect `prefers-reduced-motion: reduce` and keep particle counts low on narrow viewports without causing layout shift or horizontal overflow at 320px.
5. **Non-interactive CI checks** — `npm run lint` must execute without stdin prompts and pass cleanly alongside `npx tsc --noEmit` and `npm run build`.

---

## File Structure (Planned Modifications)

```text
.eslintrc.json                                  # Create: Next.js core-web-vitals ESLint config
vitest.config.ts                                # Create: lightweight unit test runner for lib/data/filter helpers
src/
├── lib/
│   ├── search.ts                               # Create: pure search & duration-sort helpers (testable)
│   └── search.test.ts                          # Create: unit tests for search matching, sorting & data integrity
├── data/
│   ├── shortcuts.ts                            # Modify: align shortcut labels/hrefs with actual catalog items
│   ├── resources.ts                            # Modify: ensure coverage of shortcut topics
│   ├── videos.ts                               # Modify: ensure coverage of shortcut topics (e.g. NLP)
│   └── articles.ts                             # Modify: derive allTags from articles (eliminates orphan tags) & ensure coverage
├── components/
│   ├── layout/
│   │   ├── NavTabs.tsx                         # Modify: align active border-b-2 flush with nav bottom border
│   │   ├── ParticleLayer.tsx                   # Modify: honor prefers-reduced-motion
│   │   └── SearchBar.tsx                       # Delete: unused dead component
│   ├── home/
│   │   ├── HeroSection.tsx                     # Modify: unify UI language
│   │   └── ChatInput.tsx                       # Modify: improve ↵ Enter badge contrast >= 4.5:1 & unify language
│   └── articles/
│       └── TagSidebar.tsx                      # Modify: unify UI language & display topic header support
└── app/
    ├── not-found.tsx                           # Modify: escape apostrophe & unify UI language
    ├── resources/
    │   ├── page.tsx                            # Modify: use shared search helper, grouped "All" view, unify language
    │   └── [slug]/page.tsx                     # Modify: replace raw Lorem Ipsum with structured placeholder copy
    ├── knowledges/
    │   └── page.tsx                            # Modify: use shared search + numeric duration sort, fix topic pill highlight
    └── articles/
        ├── page.tsx                            # Modify: use shared search helper, show active topic header (Creator Science style)
        └── [slug]/page.tsx                     # Modify: replace raw Lorem Ipsum with structured placeholder copy
```

---

### Task 1: Fix Tooling, ESLint Configuration & Dead Code Cleanup

**Files:**
- Create: `.eslintrc.json`
- Modify: `src/app/not-found.tsx:13-15`
- Delete: `src/components/layout/SearchBar.tsx`

**Interfaces:**
- Consumes: `eslint-config-next` already installed in `package.json`
- Produces: non-interactive `npm run lint` exit 0; clean codebase free of unused `SearchBar.tsx`

- [ ] **Step 1: Verify current `npm run lint` failure mode**
  - Run `npm run lint < /dev/null` and confirm it exits non-zero or prompts due to missing `.eslintrc.json`.
- [ ] **Step 2: Create `.eslintrc.json`**
  - Extend `next/core-web-vitals`.
- [ ] **Step 3: Fix unescaped apostrophe in `src/app/not-found.tsx`**
  - Replace `doesn't` on line 14 with `&apos;` (or consistent Indonesian copy matching the rest of the portal).
- [ ] **Step 4: Remove unused `src/components/layout/SearchBar.tsx`**
  - Confirm via `grep -rn "SearchBar" src/` that zero callers exist, then delete the file.
- [ ] **Step 5: Verify lint & typecheck**
  - Run: `npx tsc --noEmit && npm run lint`
  - Expected: `0` errors and `0` warnings, no interactive prompt.
- [ ] **Step 6: Commit**
  - `git add -A && git commit -m "chore: configure eslint and remove unused SearchBar"`

---

### Task 2: Extract & Test Pure Search, Duration Sorting & Taxonomy Helpers (TDD)

**Files:**
- Create: `vitest.config.ts` (or `tsconfig`-compatible test script)
- Create: `src/lib/search.ts`
- Create: `src/lib/search.test.ts`
- Modify: `src/data/articles.ts`
- Modify: `src/data/shortcuts.ts`
- Modify: `src/data/videos.ts`
- Modify: `src/data/resources.ts`

**Interfaces:**
- Produces:
  - `matchesSearchQuery(fields: string[], rawQuery: string): boolean`
  - `parseDurationSeconds(duration: string): number`
  - `sortVideos(items: Video[], sortBy: 'newest' | 'duration-desc' | 'duration-asc' | 'title-asc'): Video[]`
  - `allTags: string[]` derived dynamically from `articles` (`['All', ...uniqueTags]`)

- [ ] **Step 1: Write failing unit tests in `src/lib/search.test.ts`**
  - Test `matchesSearchQuery`:
    - `"AI Agents"` does NOT match `"Training pipelines"` (no `"ai"` inside `"training"` false positive — match word boundaries for short tokens `<= 2` chars or require token word boundary `\b`).
    - `"RAG Systems"` matches `"Production RAG: From Naive Retrieval..."`.
    - Empty/whitespace query matches all items.
  - Test `parseDurationSeconds` and `sortVideos`:
    - `"8:15"` -> `495`, `"12:34"` -> `754`, `"1:05:00"` -> `3900`.
    - `sortVideos(..., 'duration-desc')` places `"31:05"` before `"12:34"` before `"8:15"`.
  - Test data integrity across `shortcuts`, `resources`, `videos`, `articles`:
    - Every shortcut pill in `shortcuts` matches at least 1 item on its target route using `matchesSearchQuery`.
    - Every tag on every article in `articles` exists in `allTags`.
    - Every `Resource` and `Article` has a unique `slug` and `url` without `#`.
- [ ] **Step 2: Run tests to verify they fail**
  - Run: `npx vitest run`
  - Expected: FAIL (`src/lib/search` not found).
- [ ] **Step 3: Implement `src/lib/search.ts` and fix data taxonomy**
  - Implement word-boundary-safe `matchesSearchQuery` (for tokens <= 3 chars like `"ai"`, `"nlp"`, `"rag"`, require word boundary `\b`; for longer tokens allow substring match).
  - Implement `parseDurationSeconds` supporting `MM:SS` and `HH:MM:SS`.
  - Update `src/data/articles.ts` so `allTags` is derived from `articles` (`['All', ...Array.from(new Set(articles.flatMap(a => a.tags)))]`) and covers `AI Ethics` / `Generative AI`.
  - Update `src/data/videos.ts` and `src/data/resources.ts` so every shortcut in `src/data/shortcuts.ts` (`NLP Basics`, `Computer Vision`, `AI Ethics`, etc.) maps to real matching items.
- [ ] **Step 4: Wire helpers into `resources/page.tsx`, `knowledges/page.tsx`, `articles/page.tsx`**
  - Replace inline filter & `localeCompare` sort logic with `matchesSearchQuery` and `sortVideos`.
  - Fix topic pill active state in `knowledges/page.tsx` so only exact active topic matches (preventing multiple topic pills highlighting simultaneously).
- [ ] **Step 5: Run tests to verify pass**
  - Run: `npx vitest run`
  - Expected: PASS (all assertions green).
- [ ] **Step 6: Commit**
  - `git add -A && git commit -m "fix: word-boundary search matching, numeric duration sort, and tag/shortcut data integrity"`

---

### Task 3: Visual Alignment, Accessibility & Language Consistency Pass

**Files:**
- Modify: `src/components/layout/NavTabs.tsx`
- Modify: `src/components/layout/ParticleLayer.tsx`
- Modify: `src/components/home/ChatInput.tsx`
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/knowledges/page.tsx`
- Modify: `src/app/articles/page.tsx`

**Interfaces:**
- Consumes: existing Tailwind theme in `tailwind.config.ts`
- Produces:
  - Flush active underline on `NavTabs` (no double stacked bottom border)
  - Reduced-motion support in `ParticleLayer`
  - >= 4.5:1 WCAG AA contrast on `ChatInput` shortcut hint
  - Consistent UI language across all pages (choose single language, e.g. English UI with clear labels or Indonesian UI throughout — currently mixed EN/ID)

- [ ] **Step 1: Fix `NavTabs.tsx` double border alignment**
  - Remove `pb-3` gap between `<Link>` `border-b-2` and `<nav>` `border-b` by using `-mb-[1px]` on `<Link>` with `pb-3` directly on `<Link>` instead of `<nav>`, so the active purple underline sits flush on the nav baseline.
- [ ] **Step 2: Add `prefers-reduced-motion` guard in `ParticleLayer.tsx`**
  - Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`; when enabled, disable particle animation (`move.enable: false` or skip rendering particles).
- [ ] **Step 3: Fix `ChatInput.tsx` badge contrast**
  - Change `text-slate-500` on line 63 to `text-slate-300` (`#cbd5e1`) so contrast exceeds 4.5:1 against dark glass.
- [ ] **Step 4: Unify UI language across `HeroSection`, `ChatInput`, `Resources`, `Knowledges`, `Articles`, `VideoCard`, `ResourceCard`, `not-found`**
  - Standardize microcopy (placeholders, buttons, empty states, sort labels, breadcrumbs) to one consistent language matching the portal's target audience.
- [ ] **Step 5: Verify build & lint**
  - Run: `npx tsc --noEmit && npm run lint`
  - Expected: `0` errors.
- [ ] **Step 6: Commit**
  - `git add -A && git commit -m "fix: align NavTabs underline, contrast, reduced-motion, and UI copy consistency"`

---

### Task 4: Structural Reference Alignment (`aihero.dev/skills`, `aihero.dev/videos`, `creatorscience.com/tags/`)

**Files:**
- Modify: `src/app/resources/page.tsx` (optional grouped section view when `All` + no search active, mirroring `aihero.dev/skills` categorized spine)
- Modify: `src/app/articles/page.tsx` (prominent selected-topic header with article count and "Browse by Topic" feel mirroring `creatorscience.com/tags/`)
- Modify: `src/app/resources/[slug]/page.tsx` (replace literal `Lorem ipsum...` with domain-relevant educational outline sections)
- Modify: `src/app/articles/[slug]/page.tsx` (replace literal `Lorem ipsum...` with domain-relevant educational outline sections)

**Interfaces:**
- Consumes: `resources`, `articles`, `allTags`
- Produces: cleaner reference alignment without breaking existing routes or visual theme

- [ ] **Step 1: Enhance `resources/page.tsx` default view**
  - When `selectedCategory === 'All'` and `queryParam === ''`, optionally render cards cleanly or grouped by the 4 categories with numbered headers (`01 Prompt Engineering`, `02 AI Agents`, etc.) inspired by `aihero.dev/skills`, while keeping single-category filter view as a direct grid.
- [ ] **Step 2: Enhance `articles/page.tsx` active tag header**
  - Display the active topic title and matching article count cleanly above `ArticleList` when a specific tag is selected, mirroring `creatorscience.com/tags/` topic focus.
- [ ] **Step 3: Replace `Lorem ipsum` placeholders in detail pages**
  - Replace raw Latin placeholder paragraphs in `src/app/resources/[slug]/page.tsx` and `src/app/articles/[slug]/page.tsx` with structured AI curriculum preview copy while retaining the clear preview/draft notice badge.
- [ ] **Step 4: Verify unit tests and full static build**
  - Run: `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`
  - Expected: all tests pass, 33+ static routes generated with 0 errors.
- [ ] **Step 5: Commit**
  - `git add -A && git commit -m "feat: align section structures with references and replace lorem ipsum copy"`

---

### Task 5: End-to-End Verification (Desktop & Mobile 320px–1920px)

**Files:**
- No code changes (verification pass)

- [ ] **Step 1: Verify production build & server**
  - Run `npm run build && npm run start` and verify HTTP 200 on `/`, `/resources`, `/knowledges`, `/articles`, `/resources/prompt-engineering-guide-best-practices`, `/articles/evolution-cognitive-architectures-chains-graphs`, and HTTP 404 on `/resources/unknown-slug`.
- [ ] **Step 2: Mobile (320px, 375px) & Desktop (1280px, 1440px) Browser Audit**
  - Confirm zero horizontal scroll (`document.documentElement.scrollWidth <= window.innerWidth`).
  - Confirm zero console errors.
  - Confirm all 8 shortcut pills produce non-empty results.
  - Confirm all 10 `Knowledges` cards open `https://www.youtube.com/@aicreatorlabsid` in a new tab.
  - Confirm `NavTabs` active state, hover state, and home-return link work across all routes.
