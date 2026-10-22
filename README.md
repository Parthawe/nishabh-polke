# Nishabh Polke

A static research portfolio with separate Home and Work pages, four case studies, original research artifacts, personal making projects, and downloadable portfolios.

Live site: [parthawe.github.io/nishabh-polke](https://parthawe.github.io/nishabh-polke/)

Repository: [Parthawe/nishabh-polke](https://github.com/Parthawe/nishabh-polke)

## Pages

- `/`: personal introduction, four research projects, crochet carpet and lamp, and an interactive stitch illustration.
- `/work/`: four studies in a spacious 2×2 grid, documented findings, the Forres handover, and a crochet activity.
- `/work/forres/`: FACTual community research and engagement tools.
- `/work/endoscopic-device/`: clinical observation, workflow analysis, and market research.
- `/work/tobacco-cessation/`: usability testing and mixed-method analysis.
- `/work/smart-home/`: in-home usability research and task analysis.
- `/about/`: sourced fieldwork story, education and student projects, personal making, additional work, and downloads.

## Develop

Requires Node.js 18+ and Python 3. There are no production JavaScript libraries. The two development dependencies provide the self-hosted Hanken Grotesk and Onest font files. Normal builds use checked-in fonts and images without requiring npm installation.

```sh
npm run build
npm run dev
```

Open `http://127.0.0.1:5173/docs/`. The server runs from the repository root; the deployable site is in `docs/`.

```sh
npm run check
npm run prepare:pages
```

The checker validates local paths and fragments, responsive image sources, page metadata, PDF headers, and GitHub file limits. Browser acceptance checks and results are in `research/QA.md` and `REVIEW.md`.

## Edit

- `src/content.mjs`: project copy, evidence captions, credits, and sources.
- `src/render.mjs`: shared HTML layout and page composition.
- `src/editorial.mjs`: research summaries, process trails, and artifact-reading notes.
- `src/making.mjs`: personal making section and shared crochet activity.
- `src/crochet-geometry.mjs`: clustered stitch paths, chain joins, braided edging, and inline yarn styles.
- `styles.css`: visual system, responsive layouts, focus, motion, and image-viewer states.
- `app.js`: progressive image viewer, lamp photograph switch, and interactive stitch activity.
- `crochet-state.mjs`: round colors, completion, recoverable reset, and undo/redo history.
- `scripts/crochet-state.test.mjs`: tests for history, color retention, saved progress, and invalid states.
- `assets/fonts/`: two self-hosted variable fonts and their OFL licenses.
- `assets/originals/`: published source-image variants and original PDF page renders.
- `assets/images/`: optimized web derivatives, crops, and three responsive sizes.
- `assets/downloads/`: four intact PDF files.
- `research/asset-manifest.json` and `ASSETS.md`: source provenance and checksums.

Do not hand-edit generated HTML in `docs/`. Rebuild after editing sources. `PRODUCT.md` records the approved brief, and `DESIGN.md` records the built design system.

## Assets

The originals include 42 published images, three user-supplied crochet photographs, four PDFs, and portfolio page renders. Source media retains its original colors. Source bytes and full URLs are retained in the manifest; no temporary authenticated download URLs are committed.

The existing PDFs are image-based. The website provides readable HTML summaries as well as the intact PDFs and page images. Diagram captions, an enlargement viewer, zoom, and original-image downloads support closer inspection.

To regenerate media, install Pillow and Poppler, render the PDF pages as described in `research/README.md`, then run `scripts/prepare-images.py` and `scripts/prepare-editorial-images.py`. Normal site builds use the checked-in assets and require neither package. `scripts/collect-assets.py` reacquires the published GSA, Behance, and Linktree images from the saved catalogs.

## Publish

GitHub Pages serves `/docs` from `main`, matching the Joel Bobby publishing setup.

```sh
npm run prepare:pages
git add .
git commit -m "Update research portfolio"
git push origin main
```

All site-local links are relative to the project path. The canonical URL, sitemap, social metadata, and custom 404 base path are set in `src/render.mjs`; update those if moving the repository or using a custom domain.

The site contains no accounts, analytics, contact forms, or third-party embeds. Email links open the visitor's mail app. LinkedIn, Behance, Drive, GSA, newspaper, and Vimeo links open their original sources. The project summaries distinguish research findings, recommendations, delivered artifacts, and subsequent reported events.

## Crochet activity

Home and Work share an illustrated six-square pattern. Each square takes four rounds. Visitors can choose yarn for each new round, tap a square, or hold the main action to keep stitching. Undo and redo also work with Cmd/Ctrl+Z, Shift+Z, and Ctrl+Y while focus is inside the activity. Arrow keys move between squares; Enter and Space add a round. Starting over can be undone.

Progress stays in the current tab’s session storage, including when moving between Home and Work. It is never sent to a server. Save pattern downloads a self-contained SVG containing the rounds made so far. The activity illustrates a pattern; it does not track the real carpet’s progress. Reduced motion removes the drawing animation. Without JavaScript, the complete illustration remains visible.

Run `npm test` for the pattern-state tests, then `npm run prepare:pages` to build and check the published files.

The stitch drawing uses clustered posts, V-shaped heads, chain joins, and a braided border. Strand details come from narrow paths within the yarn strokes. The illustrated structure was informed by [Yarnspirations’ guide to granny crochet](https://www.yarnspirations.com/blogs/how-to/guide-to-granny-crochet-squares-circles-hearts-stripes-and-more). This is an interactive illustration, not a counted crochet pattern. Each round forms clockwise over 760ms; the hook follows the active stitch. Holding repeats every 800ms, and interruption settles the drawing immediately.
