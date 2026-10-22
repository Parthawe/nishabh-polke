# Acceptance inventory

- All seven pages: readable text, one primary heading, metadata, working Home/Work/About navigation, email and LinkedIn, image dimensions and source paths.
- Home: personal introduction, all four research projects, actual crochet carpet and lamp photos, photograph switch, reversible stitch activity, background link.
- Work: all four studies in the agreed order; four project summaries in a spacious 2×2 grid, direct case links, individual roles, methods, questions, evidence and documented outputs. The same four projects remain readable without JavaScript.
- Case studies: research question, contribution and scope, process trail, narrative findings, annotated source evidence, expandable archives, original downloads and next-project links.
- Image viewer: click/Enter opens; close button and Escape dismiss; focus returns to trigger; native modal containment; zoom and keyboard scroll; loading/error status and original-file recovery.
- Making: pendant/detail selection updates photo, caption, alt text and original download; stitching supports direct square input, four rounds per square, retained yarn choices, undo/redo, 24-round and six-square counters, SVG download, session continuation, and replay. Reduced motion suppresses animated drawing. No actual project progress percentage is implied.
- About: portrait, verified education and background, portfolio downloads, Scarlet Scout credit and panels, architecture, personal making link.
- Responsive: desktop, laptop, tablet and mobile first viewport and content sections; no horizontal page overflow.
- Accessibility: visible focus, readable contrast, image labels, native details, reduced motion, useful content and ordinary image links without JavaScript.
- Publishing: build under `/nishabh-polke/`; public repository; Pages deployment status and live HTTP responses for all routes, assets and downloads.

Results are recorded after browser and deployment verification in REVIEW.md.

## Motion pass, October 21, 2026

Verified locally at 1280 × 900 and 390 × 844. The portrait entrance settles to full opacity; the primary action adds a 1 px hover lift and soft shadow. The header remains fixed at the top while scrolling, with the mobile case navigation directly below it. The Findings heading lands below both navigation rows without horizontal overflow.

The image viewer opened, zoomed, closed by Escape and button, restored focus to its trigger, and unlocked page scrolling on repeated use. Lamp views changed after decoding. Blocking the detail image request produced the retry message while retaining the pendant image and selection; retry succeeded after unblocking. Reduced-motion emulation removed the portrait animation and smooth scrolling, and the viewer remained usable. Browser overrides were cleared after testing.

`node --check app.js`, `npm run build`, `npm run check`, and `git diff --check` passed. The design detector reported existing design-token differences and literal motion-shadow values; the motion choices are documented in DESIGN.md. This pass did not publish a deployment.


## Crochet activity refinement, 21 October 2026

- Five state tests pass for per-round yarn retention, undo/redo branching, 24-round completion, undoable reset, session restoration, and invalid saved data.
- Browser checks passed at 360, 390, 768, and 1440px: no horizontal overflow; direct square controls and yarn/action buttons remain usable. Square targets are over 76px wide even at 360px.
- Confirmed one-click rounds, held stitching, automatic advance through unfinished squares, and stopping at 24 rounds without a trailing reset.
- Confirmed undo/redo, reset recovery, arrow navigation, Enter/Space, and Cmd+Z within the activity.
- Reload and navigation between Home and Work retain the pattern and history within the tab session.
- Downloaded a partial SVG and parsed it as XML: round colors are retained, with no scripts or external references.
- Reduced motion disables transition and drawing feedback; rounds still update immediately. Without JavaScript, the complete illustration stays visible and interactive controls stay hidden.
- Console review found no warnings or errors. Independent finish review: ship; clean desktop and mobile captures are in the local review-v7 folder.
