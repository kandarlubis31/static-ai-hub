# static-ai-hub

A prompt library that runs entirely in the browser. No database, no API, no server — every
prompt is a Markdown file compiled into the static build.

## What it is

A curated collection of AI prompts, each with a role, a category and tags, browsable and
searchable. You can copy a prompt as-is, or feed it into a builder that assembles the final text
from the parameters you choose. Ratings are kept locally.

Because the content is a static Astro collection, adding a prompt means adding one Markdown file
and rebuilding — there is no CMS to log into and nothing to keep running.

## How it works

- **Content collection.** `src/content/config.ts` defines the prompt schema: `title`,
  `description`, `role`, `category`, `tags[]`. Each prompt is a Markdown file under
  `src/content/prompts/`.
- **Filtering.** `FilterBar.astro` narrows the collection by category, role and tags.
- **Prompt builder.** `PromptBuilder.tsx` composes a final prompt from selected fields.
- **Ratings.** `RatingSystem.tsx` persists votes in the browser; nothing is sent anywhere.
- **Copy.** `CopyButton.tsx` writes the prompt to the clipboard.
- **Theming.** `ThemeToggle.tsx` switches light/dark, with the choice kept client-side.

Interactivity is **Preact islands** (`@astrojs/preact`) rather than a full SPA — the page ships
as HTML and only the interactive bits hydrate. State across islands is shared through
`nanostores`.

## Stack

Astro 5 · Preact 10 · Tailwind CSS 4 · nanostores · lucide icons

## Run

```bash
pnpm install
pnpm dev
```

Build and preview the static output:

```bash
pnpm build
pnpm preview
```

`pnpm build` emits a fully static `dist/` that can be served from any file host, CDN or object
storage.

## Adding a prompt

Create `src/content/prompts/your-prompt.md`:

```markdown
---
title: Your prompt title
description: One line on what it does
role: Product Manager
category: Research
tags: [interview, synthesis]
---

The prompt text goes here.
```

`astro check` / `pnpm build` fails if a required front-matter field is missing, so a malformed
prompt cannot silently reach production.

## Structure

```
src/
  content/config.ts              prompt schema
  content/prompts/*.md           the library itself
  components/interactive/        Preact islands (builder, filter, rating, copy, theme)
  components/ui/                 static Astro pieces (PromptCard, Footer, ToastContainer)
  pages/                         routes
```

## License

MIT
