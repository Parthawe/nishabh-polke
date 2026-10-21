# Portfolio verification

## Build and content

- Six portfolio pages and a custom 404 built from shared templates.
- All 348 local links and fragments, responsive image sources, metadata, PDF signatures, and individual GitHub file sizes passed the static checker.
- JavaScript syntax checks passed.
- 42 published images downloaded successfully; four linked PDF files preserved intact.
- Source files, crops, credits, and checksums are recorded in ASSETS.md and research/asset-manifest.json.
- No backend, third-party runtime, analytics, accounts, form, or embedded video player.

## Browser verification

- Desktop at 1280px, mobile at 390px, tablet at 768px, and small mobile at 360px.
- All six routes checked at 768px and 360px: no horizontal page overflow or broken loaded images.
- Reviewed homepage, project rows, case-study header, research text, evidence, About, portrait, footer, and the image-viewer state.
- Native artifact details expanded; an artifact opened in the viewer; zoom changed to Fit image; Escape dismissed the viewer and returned focus to the triggering image link. The close button also dismissed it.
- Reduced motion disabled the intro animation and smooth scrolling.
- Forced offline image request showed the error recovery link and hid the failed image. Network conditions and cache settings were restored.
- With JavaScript disabled, the tobacco-cessation page retained 3,926 characters of readable main content and normal image links; no viewer image was created. Script execution was restored.
- Loading and error messages remain hidden after a successful load, verified by computed display values.

## Finish review

An independent Impeccable reviewer assessed the screenshots and implementation against the approved Apple-like monochrome direction. Final disposition: **ship**.

| Finding | Final result |
| --- | --- |
| About portrait absent in an early capture | Resolved: settled recapture visibly paints the portrait. |
| Project metadata above headings | Resolved: headings precede metadata in all three project rows. |
| Hidden loading/error state styling | Resolved: global hidden rule and computed-state verification. |

The mechanical detector ran once. Its six warnings about the uninitialized image inside the closed dialog were fixed by creating the viewer image in JavaScript. Its wording warning was removed. No other detector findings were reported.

Original source documents were checked during authoring. The separate design reviewer did not independently re-audit the research sources.
