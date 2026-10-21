# Portfolio verification

## Build and content

- Home, Work, About, four case studies, and a custom 404 build from shared templates.
- All 446 local links and fragments, responsive image sources, metadata, PDF signatures, and individual GitHub file sizes passed the static checker.
- JavaScript syntax checks passed.
- The archive contains 42 published source images, three user-supplied crochet photographs, four intact PDFs, and generated portrait interpretations with provenance records.
- Hanken Grotesk headings and Onest reading text are self-hosted, with OFL licenses included.
- No backend, third-party runtime, analytics, accounts, form, or embedded video player.

## Browser verification

- All seven content routes checked at 360px, 768px, and 1440px: no horizontal page overflow or broken loaded image sources.
- Home and Work show all four projects in a spacious 2×2 grid at desktop and tablet widths; mobile stacks the projects. Desktop images are 576×384px inside 24px rounded frames. There is no study selector or hidden project panel.
- Reviewed desktop and mobile typography, rounded image frames and controls, case-study layout, and the personal making section.
- Lamp view selection updates the photograph, alternative text, caption, enlargement target, and original-file download. Keyboard activation opens the glowing stitch detail.
- Image-viewer zoom focuses the scrollable image region. Escape closes the dialog and restores focus to the photograph link.
- The activity starts at zero of six squares. Direct square controls support Enter, Space and arrow navigation; stitched squares can be unpicked. Three yarn choices, a visible counter, next-square action, undo, completion and replay passed browser checks on Home and Work. The normal-motion busy state and reduced-motion completion were verified.
- With JavaScript disabled, Home retains the carpet and pendant photographs, a direct lamp-detail link, and the complete illustration. Work retains all four project summaries.
- Browser viewport, reduced-motion emulation, and script-execution settings were restored after checks.
- Existing viewer loading/error recovery was verified during the initial implementation; this revision retains those recovery paths.

## Finish review

Independent Impeccable finish review disposition: **ship**.

The latest independent review confirmed the 2×2 grids, larger rounded imagery, reversible stitch activity and sourced personal About page. Two findings were fixed and reviewed again: unstitched controls now have distinct boundaries; the About artifact has a compact frame with enlargement and original-file actions. Final disposition: ship.

Source documents were checked during authoring. The separate design reviewer did not independently re-audit all research sources.

## Previous public deployment

GitHub Pages reported a successful build for `32c48437df083bbe640bbbad2a82728dd8e6a573`. All seven public content routes returned HTTP 200 with the selected font references. Home and Work each contained four projects. All 318 published files checked by HTTP HEAD returned 200 with no retries, including fonts, image derivatives, originals, and PDFs. The live Work page visibly rendered four columns, Hanken Grotesk, and 24px image corners.

## Latest revision

- Home, Work and About checked at 360px, 768px and 1440px without horizontal overflow or broken loaded images.
- About’s new fieldwork story and education summaries link to the public LinkedIn sources recorded in `research/social-review.md`. Instagram was linked through the GSA profile but its unavailable content was not inferred.
- About artifact enlargement opens the original UX page; Escape returns to the page.
- With JavaScript disabled, Home retains four projects and the complete six-square illustration, while activity controls stay hidden.
- Layout detector returned no findings; JavaScript syntax and the static site checker passed.
