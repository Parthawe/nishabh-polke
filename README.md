# Nishabh Polke

A static research portfolio with four web case studies, original project artifacts, an About page, and downloadable portfolios.

Live site: [parthawe.github.io/nishabh-polke](https://parthawe.github.io/nishabh-polke/)

Repository: [Parthawe/nishabh-polke](https://github.com/Parthawe/nishabh-polke)

## Pages

- `/`: selected research, individual roles, methods, and introduction.
- `/work/forres/`: FACTual community research and engagement tools.
- `/work/endoscopic-device/`: clinical observation, workflow analysis, and market research.
- `/work/tobacco-cessation/`: usability testing and mixed-method analysis.
- `/work/smart-home/`: in-home usability research and task analysis.
- `/about/`: background, additional work, project panels, and downloads.

## Develop

Requires Node.js 18+ and Python 3. There are no npm dependencies and no production JavaScript libraries.

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
- `styles.css`: visual system, responsive layouts, focus, motion, and image-viewer states.
- `app.js`: progressive image viewer, loading recovery, zoom, and focus restoration.
- `assets/originals/`: published source-image variants and original PDF page renders.
- `assets/images/`: optimized web derivatives, crops, and three responsive sizes.
- `assets/downloads/`: four intact PDF files.
- `research/asset-manifest.json` and `ASSETS.md`: source provenance and checksums.

Do not hand-edit generated HTML in `docs/`. Rebuild after editing sources. `PRODUCT.md` records the approved brief, and `DESIGN.md` records the built design system.

## Assets

The originals include 42 published images, four PDFs, and portfolio page renders. Source media retains its original colors. Source bytes and full URLs are retained in the manifest; no temporary authenticated download URLs are committed.

The existing PDFs are image-based. The website provides readable HTML summaries as well as the intact PDFs and page images. Diagram captions, an enlargement viewer, zoom, and original-image downloads support closer inspection.

To regenerate media, install Pillow and Poppler, render the PDF pages as described in `research/README.md`, then run `scripts/prepare-images.py`. Normal site builds use the checked-in assets and require neither package. `scripts/collect-assets.py` reacquires the published GSA, Behance, and Linktree images from the saved catalogs.

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
