---
title: "SSR vs SSG: When to Use Each in Astro"
date: 2026-03-17
description: "Astro supports both static site generation and server-side rendering in the same project. Here's how to choose the right approach for each page."
author: john
---

# SSR vs SSG: When to Use Each in Astro

Astro defaults to **static site generation (SSG)** — every page is pre-built at deploy time as plain HTML. But it also supports **server-side rendering (SSR)** for pages that need to be dynamic. You can mix both in the same project.

## Static Site Generation (SSG)

Pages are built once at deploy time. The output is plain HTML files served directly by a CDN or web server — no Node.js process needed at runtime.

**Best for:**
- Blog posts and documentation
- Marketing pages
- Any content that doesn't change per-user or per-request

This entire blog is SSG. When you push a new post, GitHub Actions builds it and rsyncs the `dist/` folder to the VPS.

## Server-Side Rendering (SSR)

Pages are rendered on the server for each incoming request. Requires a Node.js (or other) runtime on the server.

**Best for:**
- Authenticated pages (user dashboards, account settings)
- Search results
- Pages that depend on request data (cookies, headers, query params)

## Enabling SSR in Astro

Add an adapter and set `output` in `astro.config.mjs`:

```js
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',       // full SSR
  adapter: node({ mode: 'standalone' }),
});
```

Or use `hybrid` mode to keep most pages static and opt specific pages into SSR:

```js
export default defineConfig({
  output: 'hybrid',
});
```

Then in any page, opt out of prerendering:

```astro
---
export const prerender = false; // this page is now SSR
---
```

## The hybrid approach

Hybrid mode is the sweet spot for most projects — ship a static blog and marketing site, but add SSR only for the pages that genuinely need it, like a contact form handler or a private dashboard.
