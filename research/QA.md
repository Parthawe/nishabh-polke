# Acceptance inventory

- All seven pages: readable text, one primary heading, metadata, working Home/Work/About navigation, email and LinkedIn, image dimensions and source paths.
- Home: personal introduction, all four research projects, actual crochet carpet and lamp photos, photograph switch, reversible stitch activity, background link.
- Work: all four studies in the agreed order; four project summaries in a spacious 2×2 grid, direct case links, individual roles, methods, questions, evidence and documented outputs. The same four projects remain readable without JavaScript.
- Case studies: research question, contribution and scope, process trail, narrative findings, annotated source evidence, expandable archives, original downloads and next-project links.
- Image viewer: click/Enter opens; close button and Escape dismiss; focus returns to trigger; native modal containment; zoom and keyboard scroll; loading/error status and original-file recovery.
- Making: pendant/detail selection updates photo, caption, alt text and original download; stitching supports direct square input, unpicking, yarn choices, undo, a six-square counter and replay. Reduced motion suppresses animated drawing. No actual project progress percentage is implied.
- About: portrait, verified education and background, portfolio downloads, Scarlet Scout credit and panels, architecture, personal making link.
- Responsive: desktop, laptop, tablet and mobile first viewport and content sections; no horizontal page overflow.
- Accessibility: visible focus, readable contrast, image labels, native details, reduced motion, useful content and ordinary image links without JavaScript.
- Publishing: build under `/nishabh-polke/`; public repository; Pages deployment status and live HTTP responses for all routes, assets and downloads.

Results are recorded after browser and deployment verification in REVIEW.md.

## Motion pass, October 21, 2026

Verified locally at 1280 × 900 and 390 × 844. The portrait entrance settles to full opacity; the primary action adds a 1 px hover lift and soft shadow. The header remains fixed at the top while scrolling, with the mobile case navigation directly below it. The Findings heading lands below both navigation rows without horizontal overflow.

The image viewer opened, zoomed, closed by Escape and button, restored focus to its trigger, and unlocked page scrolling on repeated use. Lamp views changed after decoding. Blocking the detail image request produced the retry message while retaining the pendant image and selection; retry succeeded after unblocking. Reduced-motion emulation removed the portrait animation and smooth scrolling, and the viewer remained usable. Browser overrides were cleared after testing.

`node --check app.js`, `npm run build`, `npm run check`, and `git diff --check` passed. The design detector reported existing design-token differences and literal motion-shadow values; the motion choices are documented in DESIGN.md. This pass did not publish a deployment.
