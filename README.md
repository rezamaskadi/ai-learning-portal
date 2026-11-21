# AI Creator Labs — Learning Portal

A premium, dark-themed learning portal for artificial intelligence practitioners, creators, and engineers. Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- **Editorial Brand Aesthetic:**
  - Distinctive serif masthead using *Playfair Display* with an italicized accent: **AI *Creator* Labs**.
  - Small uppercase super-title pill: `AI LEARNING PORTAL`.
  - Body text and UI elements set in clean, high-legibility *Inter*.

- **Ambient Background & Particle Effects:**
  - Multi-layered blurred radial CSS gradients in deep cosmic blue and violet tones.
  - Subtle floating ambient particle layer powered by `@tsparticles/react` with automatic particle count scaling on mobile devices.
  - Semi-opaque dark backdrops ensuring strict **WCAG AA contrast ratio (> 4.5:1)** compliance.

- **Unified Navigation & Sub-Pages:**
  - Three-tab uppercase header navigation: **`RESOURCES`**, **`KNOWLEDGES`**, and **`ARTICLES`** with active indicator styling.
  - Compact sticky top header on all sub-pages with one-click return to the home page (`/`).

- **Interactive Content Sections:**
  - **Resources (`/resources` & `/resources/[slug]`):** Responsive card grid (14 curated items) featuring category pills, topic tags, descriptions, reactive category & search filtering, and dedicated dynamic detail pages with breadcrumbs.
  - **Knowledges (`/knowledges`):** Video masterclass library (10 sessions) with 16:9 gradient thumbnails, duration badges, and direct external links to the official YouTube channel (`https://www.youtube.com/@aicreatorlabsid`).
  - **Articles (`/articles` & `/articles/[slug]`):** Technical publications (12 articles) with real-time tag & search query filtering, article count badges, reading times, dates, and dedicated dynamic detail pages. Features a desktop vertical sticky sidebar and mobile horizontal scroll bar.

- **Home Page Prompt Bar & Shortcut Pills:**
  - Frosted glass capsule pills for quick exploration of popular topics (*Prompt Engineering, AI Agents, LLM Fine-tuning, RAG Systems, etc.*).
  - Modern AI prompt bar with sparkle icon, keyboard shortcut badge (`↵ Enter`), and instant search routing.

- **100% Static & High-Performance:**
  - Zero external CMS or API dependencies — all content is statically defined in TypeScript.
  - Full static site generation (SSG) with First Load JS under ~98 kB.
  - Fully responsive from 320px mobile screens up to 1920px+ ultra-wide desktop monitors without horizontal overflow.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Particles:** [@tsparticles/react](https://particles.js.org/) & [@tsparticles/slim](https://github.com/tsparticles/slim)
- **Typography:** [Google Fonts](https://fonts.google.com/) (*Playfair Display* & *Inter* via `next/font/google`)

---

## 📁 Project Structure

```
monetin/
├── docs/
│   └── superpowers/plans/      # Architecture & implementation specs
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: metadata, fonts, PageShell wrapper
│   │   ├── page.tsx            # Home page (Hero, NavTabs, ShortcutPills, ChatInput)
│   │   ├── not-found.tsx       # Dedicated branded 404 page
│   │   ├── resources/
│   │   │   ├── page.tsx        # Resources page with category & search filter
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Dynamic resource detail page (14 static slugs)
│   │   ├── knowledges/
│   │   │   └── page.tsx        # Video masterclass library with YouTube integration
│   │   └── articles/
│   │       ├── page.tsx        # Tag & query filtered articles page
│   │       └── [slug]/
│   │           └── page.tsx    # Dynamic article detail page (12 static slugs)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Background.tsx  # Multi-layer blurred CSS gradients
│   │   │   ├── ParticleLayer.tsx # Ambient floating particle canvas
│   │   │   ├── NavTabs.tsx     # 3-tab navigation with active route detection
│   │   │   └── PageShell.tsx   # Wrapper managing header, background & footer
│   │   ├── home/
│   │   │   ├── HeroSection.tsx # Masthead, super-title pill & subtitle
│   │   │   ├── ShortcutPills.tsx # Frosted capsule shortcut buttons
│   │   │   └── ChatInput.tsx   # Interactive AI search prompt bar
│   │   ├── resources/
│   │   │   ├── ResourceCard.tsx# Individual resource card with hover lift
│   │   │   └── ResourceGrid.tsx# Responsive 1-to-3 column grid
│   │   ├── knowledges/
│   │   │   ├── VideoCard.tsx   # 16:9 thumbnail video card with duration badge
│   │   │   └── VideoGrid.tsx   # Responsive 1-to-4 column grid
│   │   └── articles/
│   │       ├── TagSidebar.tsx  # Desktop sticky sidebar / mobile tag scrollbar
│   │       ├── ArticleCard.tsx # Detailed article preview card
│   │       └── ArticleList.tsx # List view with empty-state handling
│   ├── data/
│   │   ├── resources.ts        # 14 static resource items & category list
│   │   ├── videos.ts           # 10 static video masterclass entries
│   │   ├── articles.ts         # 12 static technical articles & tag taxonomy
│   │   └── shortcuts.ts        # Popular quick-topic shortcuts
│   ├── lib/
│   │   └── types.ts            # Shared TypeScript data models
│   └── styles/
│       └── globals.css         # Tailwind directives & base styling
├── tailwind.config.ts          # Custom portal color palette & font mappings
├── tsconfig.json               # TypeScript path alias (@/*) & compiler settings
└── package.json                # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.17.0 or later (v20+ recommended)
- **Package Manager:** `npm` (included with Node.js)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd monetin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server with hot-reload:
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Production Build

Create an optimized static production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run start
```

---

## 🔍 Verification & Quality Assurance

- **Type Checking:** Run `npx tsc --noEmit` to verify type safety across all files without emitting artifacts.
- **Linting:** Run `npm run lint` to check for code quality issues.
- **Accessibility:** All color combinations meet WCAG AA contrast guidelines against dark surfaces.

---

## 📄 License & Attribution

All fonts used (*Playfair Display* and *Inter*) are licensed under the [SIL Open Font License](https://openfontlicense.org/). Background visuals, gradients, and icons are pure CSS/SVG implementations without third-party copyright dependencies.
