---
title: "Image Optimization with Astro"
date: 2026-03-17
description: "How Astro's built-in Image component automatically optimizes images for performance — resizing, converting to WebP, and preventing layout shift."
author: john
---

# Image Optimization with Astro

Images are usually the heaviest assets on a page. Astro ships a built-in `<Image />` component that handles optimization at build time — no external service needed.

## What it does automatically

- Converts images to **WebP** (smaller file size, wide browser support)
- Resizes to the exact dimensions you specify
- Adds `width` and `height` attributes to prevent **layout shift** (CLS)
- Generates a `srcset` for responsive images

## Basic usage

```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/hero.jpg';
---

<Image src={hero} alt="Hero image" width={800} height={400} />
```

Astro processes `hero.jpg` at build time and outputs an optimized WebP file.

## Remote images

For images hosted externally, you need to allowlist the domain in `astro.config.mjs`:

```js
export default defineConfig({
  image: {
    domains: ["images.unsplash.com"],
  },
});
```

Then use it the same way:

```astro
<Image
  src="https://images.unsplash.com/photo-123"
  alt="Remote image"
  width={800}
  height={400}
/>
```

## Why not just use `<img>`?

A plain `<img>` tag ships the original file — often a 4MB JPEG. The `<Image />` component outputs a compressed WebP at the exact size needed, which can be **10x smaller** with no visible quality loss.
