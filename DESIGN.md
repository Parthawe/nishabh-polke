---
name: Nishabh Polke
description: A personal research portfolio with original evidence and a making practice.
colors:
  paper: "#f5f5f7"
  ink: "#1d1d1f"
  muted: "#626267"
  line: "#d8d8dc"
  surface: "#ececee"
  white: "#fff"
  yarn-walnut: "#785642"
  yarn-charcoal: "#343436"
  yarn-oat: "#9c836e"
  stitch-boundary: "#88786b"
typography:
  display:
    fontFamily: '"Hanken Grotesk", Arial, sans-serif'
    fontSize: "clamp(64px, 7.2vw, 96px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Hanken Grotesk", Arial, sans-serif'
    fontSize: "clamp(32px, 3.3vw, 46px)"
    fontWeight: 600
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Hanken Grotesk", Arial, sans-serif'
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Onest", Arial, sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: '"Onest", Arial, sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.8
  action:
    fontFamily: '"Onest", Arial, sans-serif'
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: '"Onest", Arial, sans-serif'
    fontSize: "12px"
    fontWeight: 400
rounded:
  image: "24px"
  image-compact: "20px"
  artifact: "14px"
  panel: "28px"
  canvas-compact: "22px"
  pill: "999px"
  footer: "32px"
  footer-compact: "24px"
  flush: "0px"
spacing:
  compact: "12px"
  inset: "20px"
  regular: "24px"
  grid-column: "48px"
  grid-home-row: "72px"
  grid-work-row: "80px"
  grid-compact-row: "52px"
  group: "30px"
  composition: "45px"
  section: "65px"
components:
  primary-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    typography: "{typography.action}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
  main-navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    padding: "12px 0"
  research-project:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  image-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.image}"
  artifact-frame:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.artifact}"
  artifact-disclosure:
    textColor: "{colors.ink}"
    padding: "16px 0"
  download-row:
    textColor: "{colors.ink}"
    padding: "24px 0"
  stitch-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 19px"
  yarn-choice:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 12px"
  crochet-canvas:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "20px 24px 24px"
  lamp-view-button:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "9px 17px"
  lamp-view-button-active:
    textColor: "{colors.paper}"
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 17px"
  viewer-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
---

# Design System: Nishabh Polke

## Overview

**Creative North Star: "A researcher who makes"**

The portfolio keeps the user-approved Apple-like monochrome interface, generous spacing, and rounded image frames. The user-selected Hanken Grotesk gives headings a clear, personal voice; Onest supports the longer research reading. Original project artifacts and personal photographs keep their own colors. The Home portrait is a generated painted-style transformation of the supplied source portrait.

Home introduces Nishabh and his making practice. Home and Work show all four documented research projects together; Work adds contribution, role, and method details for comparison and inspection. Both use open layouts, hairline separators, and direct actions. The crochet activity invites reversible making on both Home and Work, alongside the actual work-in-progress photographs on Home and About.

**Key Characteristics:**

- Near-white paper and dark ink around original-color imagery.
- Expressive Hanken Grotesk headings with Onest reading text.
- Open compositions, rounded image frames, pill controls, and hairline dividers.
- Keyboard access, ordinary-link fallbacks, and reduced-motion support.

## Colors

Cool neutrals frame the work; artifacts and photography supply their own color.

### Primary

- **Ink** supplies headings, pressed lamp controls, primary actions, focus outlines, and the dark contact footer.

### Secondary

- **Walnut, Charcoal, and Oat yarn** are selectable drawing colors within the crochet activity. Their swatches identify the three choices.
- **Stitch boundary** marks unfinished square outlines against the neutral canvas, with contrast above (3:1). Faint yarn loops are decorative; the boundary and focus stroke identify the controls.

### Neutral

- **Paper** is the page and viewer background.
- **Muted** is the paragraph and supporting-label color.
- **Line** separates navigation, sections, disclosures, and viewer regions.
- **Surface** backs project imagery.
- **White** backs contained research artifacts.

**The Original Color Rule.** Keep interface controls monochrome and preserve the colors of source imagery. Selectable tonal yarn colors belong to the crochet illustration and swatches, not the general action palette.

## Typography

**Display Font:** Hanken Grotesk, with Arial and sans-serif fallbacks.
**Body Font:** Onest, with Arial and sans-serif fallbacks.

Both variable fonts are self-hosted and preloaded by the page template: `assets/fonts/hanken-grotesk-latin.woff2` for display and `assets/fonts/onest-latin.woff2` for reading. Their OFL license files live beside them. The user selected Hanken Grotesk after comparing display options; this replaces the initial system-only direction. Headings use semibold weight (600); reading text stays regular and generously led.

### Hierarchy

- **Display** introduces Nishabh on Home. Small screens use `clamp(66px, 17vw, 88px)` with line height (1).
- **Headline** is the recurring section scale. Research case titles use `clamp(42px, 5vw, 70px)`; Work uses `clamp(46px, 5.8vw, 76px)`.
- **Title** is the Work project heading. Home project titles use (32px) on desktop, (28px) on tablet, and (29px) on mobile. Work titles use (32px) on desktop and tablet and (29px) on mobile. Case-section headings use (28px).
- **Body** is the baseline. **Reading** covers study prose and explanatory notes; case reading columns are capped at (65ch). Case prose becomes (17px) with line height (1.85) on small screens.
- **Action** covers text links and the primary link. Navigation uses (13px); **caption** covers source labels and image captions. Keep labels in sentence case.

**The Two Type Roles Rule.** Use Hanken Grotesk for headings and Onest for reading text and controls. Load the local font files with swap behavior.

## Layout

The shared container is centered with a maximum width of (1200px). Side gutters are (48px), becoming (32px) at a viewport maximum of (1000px) and (20px) at (700px). Most reading and image compositions use asymmetric columns with generous gaps and thin section dividers.

Home pairs an introduction and the sourced painted-style portrait, then shows all four research projects, personal making, and background. The portrait uses containment to preserve the composition. The hero stacks on small screens. The making photographs form two columns with a (50px) gap and stack at the small-screen breakpoint.

Home and Work show all four projects in two columns on desktop. Home uses (72px) row and (48px) column gaps; Work uses (80px) row and (48px) column gaps. From (701px) through (1100px), both keep two columns with (60px) row and (32px) column gaps. At (700px) and below, both use one column with a (52px) row gap. Project images use a (3:2) aspect ratio; the shared desktop container yields (576px) image widths at a (1440px) viewport. Responsive image sizes allow (600px) desktop delivery. All projects remain in document flow. Work places the portfolio download below the full grid. Case pages pair an opening artifact with a research briefing, then section headings and reading text. The desktop section grid uses a (250px) heading column and a reading column capped at (700px). Evidence pairs a large artifact with a short reading note. These compositions stack on small screens.

The crochet activity pairs its canvas and controls in (1.15fr / 1fr) columns with a (64px) gap. The canvas uses (20px 24px 24px) padding. From (701px) through (1000px), the columns are equal with a (32px) gap and (16px) canvas padding. At (700px) and below, the activity stacks with a (24px) gap and (12px 16px 20px) canvas padding. The mobile canvas carries the tap-and-hold instruction; the repeated control heading and longer instruction are hidden.

A three-step research trail expresses an actual sequence; the expandable archive uses three artifact columns. Both become a single column on small screens. Section spacing varies with content; repeated case sections use (65px) block padding on desktop and (45px) on small screens.

## Elevation & Depth

Content rests in open layouts separated by hairlines, whitespace, and tonal surfaces. Soft shadows respond to hover, keyboard focus, scrolling, or modal elevation. The dark footer closes each page. The native image dialog uses a translucent black backdrop (`rgb(0 0 0 / .82)`) to establish the modal layer.

### Shadow Vocabulary

- **Action response** (`0 6px 16px rgb(29 29 31 / .12)`): primary-link hover and focus.
- **Image response** (`0 10px 28px rgb(29 29 31 / .09)`): image-link hover and focus.
- **Scrolled header** (`0 4px 18px rgb(29 29 31 / .055)`): separation once content passes beneath the sticky header.
- **Dialog** (`0 24px 80px rgb(0 0 0 / .2)`): modal elevation.

**The Responsive Depth Rule.** Keep content layouts open at rest. Use soft depth for interactive feedback, the scrolled header, and the modal layer.

## Shapes

Large image frames use the image radius, reducing to the compact image radius on mobile. Research artifact frames and research-trail images use the smaller artifact radius. Primary actions, lamp controls, stitch controls, and image-action labels use pills. The dialog uses the panel radius on desktop and sits flush at the viewport edges on mobile. The footer has rounded top corners, using the footer radius on desktop and compact footer radius on mobile.

Thin separators (1px) establish boundaries. Project text stays outside the image frames without a filled outer card. Inline SVG arrows and enlargement marks identify actions. The crochet study uses yarn loops, six square motifs, and a hook inside a neutral rounded canvas. The canvas uses the panel radius on desktop and compact canvas radius on mobile. About places the portrait radius on the image itself, leaving its caption outside the clipping frame.

## Components

### Links and primary action

The primary action is a filled ink pill with paper text, an inline arrow, and a minimum height of (50px). Hover darkens the fill. Text links have no filled surface, use a minimum height of (44px), and underline on hover. Their arrows move (3px) over (.2s). Keyboard focus uses a (2px) ink outline offset by (6px); the dark footer uses paper for focus.

### Navigation

The header pairs the Hanken Grotesk name with Home, Work, About, and Contact. Muted labels become ink on hover or current state. A fine underline marks the current page; a short underline transition provides hover feedback. The sticky header changes from (80px) to (72px) on small screens, with tighter navigation spacing. It gains a faint shadow after scrolling. Case navigation stays sticky below the header on paper and scrolls horizontally when needed.

### Research project grids

Both Home and Work show all four projects together in the responsive grid. Home pairs rounded project images with a linked title, output summary, and context. Work gives each project a title and case-study link, a rounded inspectable image, a caption, and contribution, role, and methods. Work separates these details with a hairline. All project links use ordinary anchors and all project content is available without JavaScript. Study-tab switching is absent from the current interface.

### Research imagery and archive

Research artifacts sit in open compositions with a caption, an inspection action, and an original-file link. Contain diagrams when cropping would lose evidence; photographs can fill their frames. Field notes pair an observed finding and design implication with the relevant artifact. Native details and summary reveal the complete archive. Hairlines frame the disclosure, and its plus rotates when open. Preserve source credits and distinguish proposals, delivered artifacts, and later reported developments.

### Personal making

Use the supplied carpet-in-progress photograph and the two lamp photographs. The lamp view buttons sit in a neutral pill group. The pressed view has ink fill and paper text. They switch between pendant and stitch-detail views, expose their pressed state, and update enlargement and original-file targets. Without JavaScript, a direct stitch-detail image link remains available. Lamp selection decodes the next image before committing the view and reports load failure without losing the previous image.

The SVG activity appears on Home and Work. Six squares each build through four rounds: Center, Petals, Outer round, and Edging. A new session starts at zero of (24) rounds. Three tonal yarn choices apply to the next round; each completed round keeps its chosen color. A native progress element and visible round and completed-square counters track the pattern. The active-square label and four colored dots show the next round and retained yarn colors.

Tap, Enter, or Space adds one round to a square. Holding a square or the main stitch button starts stitching after (380ms), then repeats every (220ms). Arrow keys move roving focus between squares; Home and End select the first and last. Each square exposes its round count and next action through its accessible label. Completed squares remain selectable. The main ink-filled pill reads “Stitch next round” until all (24) rounds are complete, when it becomes “Start another.” Undo and Redo are underlined controls with minimum (44px) width and height. Cmd/Ctrl+Z undoes; Cmd/Ctrl+Shift+Z or Cmd/Ctrl+Y redoes. Start over and Start another clear the pattern as undoable changes.

Version (2) session storage carries the pattern, selected yarn, active square, and history between Home and Work in the current tab. Save pattern is available after the first round and downloads a self-contained SVG containing only finished rounds with their retained colors. The export omits the hook, unfinished loops, control outlines, and labels, and needs no external references. Polite status messages announce changes and save failures. Without JavaScript, the complete illustration remains visible while interactive controls and progress stay hidden. The activity never represents actual carpet completion.

Each added round draws its loops over (250ms) with a (0–75ms) stagger; the hook gives (250ms) feedback and moves between squares over (350ms). The enhanced canvas hides the loose thread. Holding stops when the activity leaves view or the tab is hidden. Reduced motion applies changes immediately without stitching or hook animation.

### About story and imagery

About pairs first-person stories with original research evidence, education details, and the supplied crochet photographs. Its story sections use equal columns, (72px) gaps, and thin separators, then stack at the mobile breakpoint. The fieldwork artifact keeps its native aspect ratio within a tight rounded frame, with an inspection link and original download through the shared viewer. Its caption remains outside the linked image.

Use attributable source material for personal details. The six-city, six-week bulb story and the education and project descriptions are grounded in the reviewed LinkedIn sources; provenance is recorded in `research/social-review.md`. Instagram is a verified outbound profile link; unavailable profile content supplies no additional biography or imagery.

### Download rows

Document titles and smaller file details pair with an inline arrow. A thin bottom rule separates rows; hover underlines the title. Keep downloadable originals accessible alongside the web narrative.

### Image viewer

The native dialog separates toolbar, image stage, and caption. Close and zoom controls retain (44px) targets. It leaves a (24px) outer margin on desktop and fills the viewport on small screens. Loading hides the pending image; failure offers the original file, including after a (20s) timeout. The zoomed stage is a focusable, scrollable region. Closing restores focus to the trigger. Modified clicks retain ordinary-link behavior; image links also work without JavaScript or dialog support.

Motion uses shared timings: 140 ms for feedback, 260 ms for state changes, and 720 ms for the painted portrait entrance. The home introduction arrives once with small opacity and position changes; the portrait also reveals its brush edge through a short clip transition. Reading sections remain static.

The sticky header gains a faint shadow after scrolling. Primary actions have a small hover lift and soft shadow, with a shorter pressed state. Project covers scale by 1.018 on fine-pointer hover; touch users keep visible image actions. Keyboard focus receives the same depth cues with a visible outline. Case navigation sits below the header, and anchor offsets account for both.

The image viewer enters over 300 ms and exits over 140 ms. Close, backdrop click, and Escape share the same dismissal behavior, then restore focus without moving the page. Lamp views load and decode before a 280 ms fade; a failed request retains the previous image and selection with a retry message. New selections supersede pending requests.

Reduced-motion preferences remove CSS animation, transitions, transforms, and smooth scrolling. JavaScript listens for preference changes and cancels active optional animations. Hiding the tab also cancels those animations. Content remains visible without animation or JavaScript. No continuous scroll animation or additional motion dependency is used.

## Do's and Don'ts

### Do:

- Do preserve original artifact and photograph colors and offer enlargement for detail.
- Do use Hanken Grotesk for headings and Onest for reading text, labels, and controls.
- Do use the shared container, two-column project grids, and generous gaps; stack to one column on mobile.
- Do retain visible focus, accessible loading and failure states, and reduced-motion support.
- Do keep the reversible stitch activity distinct from the real carpet’s progress and preserve its direct keyboard controls.
- Do describe the hero as a painted-style portrait transformation; preserve the supplied original photographs and research artifacts.

### Don't:

- Don't add decorative gradients, glass, glows, or permanent floating outer cards around the project entries.
- Don't replace the user-selected font pairing with earlier type explorations or system-only typography.
- Don't add filled outer cards around the project grid items or recolor source research imagery.
- Don't hide projects behind selectors or a JavaScript-only interface.

### Focused project previews

Use a focused source-artifact detail to fill each project image frame. Home and Work use dedicated 3:2 previews for tobacco cessation and smart home, with `object-fit: cover` and zero image padding. Preserve the selected content, original colors, rounded frame, and access to the complete original source. Full case-study covers may use a wider overview.

The smart-home grid preview pairs two enlarged source screen crops and omits surrounding annotation columns. Preserve their proportions and the link to the full annotated source.
