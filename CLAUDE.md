# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Portfolio of Tereza Muric (visual artist, filmmaker). A static GitHub Pages site with **no build step, no package manager, no tests, no linter**. It is published from the `main` branch of `terrence-maurice/terrence-maurice.github.io`, so anything merged or pushed to `main` goes live.

To preview, serve the repo root with any static file server and open `http://localhost:<port>/`. Routes are hash-based (`#/`, `#/famu-cas`, `#/volna-tvorba`, `#/galerie`, `#/kontakt`).

## Architecture

- `index.html` is the shell: top bar (crumb, CZ/EN switch, menu button), the slide-in menu (hard-coded `<li>` items), an empty `<main id="app">` and the footer. It loads the scripts in this order: `content.js`, `waveforms.js`, `sound.js`, `app.js`, p5.js (cdnjs), `glitter.js`.
- `assets/content.js` holds **all content** as globals: `CONTACT`, `ABOUT` (bio `lead`, CV `study` / `practice` / `skills` / `languages`) and `CHAPTERS`. Each chapter has `sections` (`year`, `season`), and each section has `works`. A work can have `title`, `meta`, `video`, `videos`, `textTitle`, `text`, `more`, `audio` and `galleries`. Media paths are built from `M = 'media/'`.
- `assets/app.js` (one IIFE) renders every page as an HTML string into `#app` on `hashchange`. Then it wires up galleries, the year-jump buttons, and the language-dependent labels (crumb, `document.title`, `aria-label`s).
  - `galerie` is not in `CHAPTERS`. `galleryChapter()` builds it at runtime by collecting every work with `video`/`videos` across all chapters and grouping them by section year.
  - The home page (`renderHome`) contains the quote (hard-coded, in Bellota italic via `--font-deco`), the bio and the chapter list (`chapterLink` calls with hard-coded year ranges). It also renders the CV.
- `assets/glitter.js` is the p5.js glitter background in `#glitter` (black grain plus silver and dark-blue flakes that react to scrolling). It does nothing if p5 fails to load.
- `assets/sound.js` (`SoundViz`) handles audio lists marked `visual: true` in `content.js` (Sounds of Izmir): a clickable waveform per track (played part lit), one track playing at a time, and a live Web Audio analysis of the playing track. `SoundViz.levels()` returns smoothed `bass` / `mid` / `high` / `level` (0–1), which `glitter.js` reads every frame (bass = flakes pulse and blue ones glow, mids = swirl, highs = silver flashes). `app.js` calls `SoundViz.init(app)` after each render and `SoundViz.destroy()` before it.
- `assets/waveforms.js` (`WAVEFORMS`) holds 240 RMS values (0–100) per recording, keyed by the file name without `.m4a`, computed offline from the audio with ffmpeg. Regenerate it when recordings change.
- `assets/style.css` uses design tokens on `:root` and is dark-only.
- `media/` holds web-compressed files: H.264 720p `.mp4`, `.webp` images and posters, `.m4a` audio. They are organised as `media/<chapter>/<year-season>/`. Originals live outside the repo, in the parent folder. GitHub limits files to 100 MB and the site to about 1 GB.

### Bilingual text

Any text value is either a plain string (shown in both languages) or `{ cs, en }`. `L()` renders both language variants as `.l-cs` / `.l-en` spans, and CSS shows the one matching `html[data-lang]`. The language is stored in `localStorage.lang`, and an inline script in `<head>` applies it before the first paint. `ABOUT.lead` (the bio) and the home-page quote have `{ cs, en }` versions; the English ones are translations of the author's Czech text.

### Things that must change together

- **Chapter names and routes** appear in several places: the menu `<li>` in `index.html`, `chapterLink(...)` in `renderHome`, the `crumbs` map in `updateDynamicLabels`, the route whitelist in `currentRoute()` and `render()`, and the chapter `title` (or `GALERIE_TITLE` for the gallery).
- **Cache busting:** asset links in `index.html` carry `?v=N`. Bump `N` on every asset file you change, or visitors keep the stale version.
- Files are UTF-8 with Czech diacritics. Make sure edit tools handle them as UTF-8 (for example `perl -Mutf8 -CSD`, not plain `perl`). The repo stores LF, and checkouts with `core.autocrlf=true` show CRLF. Don't convert line endings.

## Content rules (from the owner)

- Never invent content. All texts come from the author (her CV, her explications, or text she gives you).
- Correct clear spelling or grammar mistakes in text she supplies, and report every correction you made.
- Change only the text you were asked to change. Check the result with a word diff (`git diff --word-diff`).

## Workflow

- Design variants live on separate branches, each in its own git worktree next to the main checkout (`../portfolio_web_variant_*`). Do not touch other variants' worktrees or branches.
- Do not merge into or push to `main` (the live site) unless explicitly asked.
- After a change, check the page at desktop width and at 375px (no horizontal scroll) in both CZ and EN.
