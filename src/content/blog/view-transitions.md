---
title: "Smooth Page Transitions with Astro"
date: 2026-03-17
description: "How to add silky-smooth page-to-page animations using Astro's built-in View Transitions API."
author: jane
---

# Smooth Page Transitions with Astro

By default, navigating between pages causes a full browser reload — the page flashes white and repaints from scratch. **View Transitions** eliminate that flash and let you animate between pages with a few lines of code.

## How it works

Astro wraps the browser's native View Transitions API. When enabled, Astro intercepts link clicks, fetches the next page in the background, and crossfades the old and new content instead of doing a hard reload.

## Enabling it

Add `<ViewTransitions />` to your layout's `<head>`:

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

That's it — every page using the layout now gets a default crossfade animation.

## Custom animations

You can control how individual elements animate using the `transition:animate` directive:

```astro
<h1 transition:animate="slide">Hello</h1>
<img transition:animate="fade" />
```

Built-in animations: `fade`, `slide`, `none`.

## Persistent islands

If you have a music player or other stateful component that should survive navigation without remounting, mark it with `transition:persist`:

```astro
<MusicPlayer client:load transition:persist />
```

React state is preserved across page navigations — the component never unmounts.
