---
title: Understanding Islands Architecture
date: 2026-03-05
description: A deep dive into Astro's islands architecture and how it minimizes JavaScript on the page.
author: john
---

# Understanding Islands Architecture

The **islands architecture** treats each interactive component as an isolated "island" of interactivity in a sea of static HTML.

## How It Works

1. The server renders the full page as static HTML
2. Interactive components are identified as islands
3. Each island hydrates independently — only when needed

## Benefits

- Smaller JS bundles
- Faster Time to Interactive (TTI)
- Better Core Web Vitals scores
