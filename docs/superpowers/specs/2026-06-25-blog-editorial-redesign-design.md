# Blog Editorial Redesign Design

Date: 2026-06-25
Project: `cuizhennan.github.io`

## Goal

Refresh the generated static blog into a warm editorial personal site while preserving the existing identity:

- Site name: `墨萧`
- Tagline: `大肚能容容天下可容之事，笑口常开笑天下可笑之人。`

The redesign should reflect current personal-blog taste: more personality, calmer reading, warmer typography, dark-mode support, and less visible legacy template clutter.

## Context

The repository contains generated static output only. There is no Hexo source configuration or theme template in this checkout. Implementation must therefore edit the visible static HTML pages and shared CSS directly.

Primary files:

- `index.html`
- `archives/index.html`
- `archives/2017/index.html`
- `archives/2017/06/index.html`
- `2017/06/20/hello-world/index.html`
- `css/style.css`

## Visual Direction

Use the approved "paper editorial" direction:

- Warm paper background instead of pure white.
- Deep ink text with low-saturation terracotta accents.
- Serif display typography for site name and post titles.
- Comfortable long-form reading rhythm.
- Fine borders, quiet metadata, and generous whitespace.
- No heavy hero image, gradient decoration, or product-style marketing layout.

The result should feel like a private printed journal adapted for the web.

## Page Design

### Global Shell

The header keeps the site identity but becomes more editorial:

- Site name remains the primary first-screen signal.
- The long tagline is displayed as a calm quote-like subtitle.
- Navigation is simplified visually with text links and subtle active states.
- Layout width is constrained for readability.
- Mobile uses a single-column layout with compact navigation.

### Home Page

The home page becomes a small issue front page:

- Add a restrained introductory editorial area around the existing title and tagline.
- Present posts as clean article entries with title, date, excerpt, and a clearer read-more affordance.
- Avoid card-heavy treatment because the site currently has very little content.
- Preserve the existing `Hello World` post link and excerpt content.

### Article Page

The article page prioritizes reading:

- Improve title hierarchy, metadata spacing, and article body line length.
- Style headings, paragraphs, links, blockquotes, code, and code blocks consistently.
- Keep existing generated HTML structure, including the article share link and busuanzi script, unless it visibly harms the layout.
- Ensure code blocks remain readable on narrow screens.

### Archive Pages

Archive pages become directory-like timelines:

- Year headings use editorial title styling.
- Archive items show date and title with clearer rhythm.
- Preserve all existing archive links.

### Sidebar

The sidebar should no longer look like an unfinished template:

- Remove or visually suppress empty category/tag sections.
- Remove placeholder example friend links.
- Keep useful modules: search, recent post, subscription, and a compact site index.
- If HTML is changed, keep it simple and static.

### Footer

The footer becomes quieter:

- Preserve copyright.
- Keep Hexo/theme attribution in small, low-emphasis text.
- Match the warmer visual system.

## Theme System

Use CSS custom properties for color and rhythm:

- `--paper`
- `--paper-soft`
- `--ink`
- `--muted`
- `--line`
- `--accent`
- `--accent-dark`

Support `prefers-color-scheme: dark` with a warm dark palette. Dark mode should preserve contrast and avoid simple color inversion.

## Implementation Constraints

- Do not introduce a build step.
- Do not add external runtime dependencies.
- Keep changes scoped to generated static HTML/CSS and optional local ignore rules for visual-companion artifacts.
- Do not remove existing content links.
- Do not rewrite site identity text.
- Avoid decorative blobs, gradients, and large marketing hero sections.

## Verification

Use local static serving or direct file inspection to verify:

- Home page renders without layout overlap on desktop and mobile widths.
- Article page has readable typography, links, headings, and code blocks.
- Archive pages retain working links and improved spacing.
- Sidebar no longer exposes empty or placeholder modules.
- Dark mode CSS is syntactically valid and legible by inspection.

## Risks

- Because only generated static files are present, future Hexo regeneration could overwrite these edits.
- CDN assets referenced by the old generated pages may fail independently of this redesign.
- Search still depends on the existing external Google search form.

## Out Of Scope

- Reconstructing the original Hexo source project.
- Migrating to a new static site generator.
- Adding CMS, comments, analytics, or new content.
- Creating new visual assets.

