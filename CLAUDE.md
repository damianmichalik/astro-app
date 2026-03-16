# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

No test or lint commands are configured.

## Architecture

Astro 6 static blog with React (for interactive islands) and Tailwind CSS v4.

**Content Collections** — Blog posts are Markdown files in `src/content/blog/`. Schema defined in `src/content.config.ts` with Zod. Fields: `title` (string), `date` (date), `description` (string), `images` (optional array of `{ src, alt }` — renders an `ImageGallery` island when present).

**Pages** — `src/pages/index.astro` (home), `src/pages/blog/[...page].astro` (paginated listing, 2 posts/page), `src/pages/blog/[slug].astro` (post detail).

**Layout** — `src/layouts/Layout.astro` is the shared shell; it imports `src/styles/global.css` (Tailwind entry point). All pages use it.

**Styling** — Tailwind CSS v4 via `@tailwindcss/vite`. No `tailwind.config.js` — configuration is done in CSS using `@theme`. Typography plugin (`@tailwindcss/typography`) is loaded via `@plugin` in `global.css` and used for `prose` classes on blog post content.

**React Islands** — `src/components/ImageGallery.tsx` is the only React component. It is mounted with `client:visible` in `[slug].astro` when a post has `images` frontmatter. All other pages are zero-JS static HTML.

**TypeScript** — Strict mode via `astro/tsconfigs/strict` with `"jsxImportSource": "react"`.

## Key Patterns

- Adding a blog post: create a `.md` file in `src/content/blog/` with required frontmatter (`title`, `date`, `description`). Add an `images` array to get a gallery island.
- Adding a React island: create a `.tsx` component in `src/components/`, import it in an `.astro` file, and add a `client:*` directive.
- Pagination is static — changing `pageSize` in `[...page].astro` requires a rebuild to take effect.
- Clearing Vite cache after installing new packages: `rm -rf node_modules/.vite`.
