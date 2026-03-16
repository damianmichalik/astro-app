---
title: Content Collections in Astro
date: 2026-03-10
description: How to use Astro's Content Collections to manage Markdown content with type safety.
---

# Content Collections in Astro

Content Collections are Astro's built-in way to organize and query Markdown or MDX files with **full type safety**.

## Setting Up

Define your schema in `src/content/config.ts` using Zod, then place your Markdown files in `src/content/<collection-name>/`.

## Querying

```ts
import { getCollection } from "astro:content";
const posts = await getCollection("blog");
```

Astro validates every post against your schema at build time — no more missing frontmatter bugs!
