---
name: Nishabh Polke
description: A restrained research portfolio built around original evidence.
colors:
  paper: "#f5f5f7"
  ink: "#1d1d1f"
  muted: "#626267"
  line: "#d8d8dc"
  surface: "#ececee"
  white: "#fff"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(48px, 6.2vw, 88px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.8
  action:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  square: "0px"
spacing:
  compact: "12px"
  inset: "16px"
  regular: "24px"
  group: "32px"
  section-small: "48px"
  section: "80px"
components:
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
  main-navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
    padding: "12px 0"
  case-navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "28px 0"
  artifact-disclosure:
    textColor: "{colors.ink}"
    padding: "16px 0"
  download-row:
    textColor: "{colors.ink}"
    padding: "24px 0"
  viewer-button:
    textColor: "{colors.ink}"
---

# Design System: Nishabh Polke

## Overview

**Creative North Star: "The interface recedes"**

The interface uses the user-approved Apple-like monochrome direction: near-white paper, dark type, generous spacing, and original-color project artifacts. System sans-serif typography is an explicit brand choice for both display and reading text.

Research images carry the visual detail. The surrounding interface stays flat, with hairline separators, clear headings, and text actions. Case studies provide room for reading and inspection, including enlargement and original-file downloads.

**Key Characteristics:**

- Near-white paper and dark ink around original-color imagery.
- System sans-serif throughout, with tight semibold headings.
- Open image-and-text layouts, square edges, and hairline dividers.
- Visible keyboard focus and restrained motion with a reduced-motion override.

## Colors

The interface uses cool neutrals; research artifacts retain their own palettes.

### Primary

- **Ink** supplies headings, primary actions, active navigation, focus outlines, and the dark footer.

### Neutral

- **Paper** is the page and viewer background.
- **Muted** is the default paragraph and secondary-label color.
- **Line** separates navigation, content rows, disclosures, and viewer regions.
- **Surface** backs project imagery.
- **White** backs contained artifact images.

**The Original Color Rule.** Keep the interface monochrome and preserve the original colors in research imagery.

## Typography

**Display Font:** system sans-serif, using the frontmatter stack.
**Body Font:** the same system sans-serif stack.

Semibold, tightly tracked headings establish hierarchy. Reading text uses regular weight, wider leading, and muted ink. Labels stay in sentence case. There is no decorative typeface or separate monospace role.

### Hierarchy

- **Display** is the large home heading. On screens up to (700px), it uses `clamp(38px, 8vw, 55px)` with line height (1.08).
- **Headline** is the case-section heading, with a narrow heading column. It reduces to (27px) on small screens.
- **Title** is the recurring project heading. Project rows reduce to (29px) at the intermediate breakpoint and (28px) on small screens.
- **Body** is the baseline text size; **reading** is the case-study prose role, contained within (720px). Reading text reduces to (17px) on small screens while keeping its line height.
- **Action** is the inline text-link role. **Label** covers project metadata, methods, and section navigation; small captions and source notes use (12px).

**The One Type Family Rule.** Use the system sans-serif stack for display, body, labels, and controls.

## Layout

Content is centered within a maximum width of (1120px). Shared side gutters are (48px), become (32px) at a maximum viewport width of (1000px), and become (20px) at (700px).

Use open image-and-text compositions. Project rows pair an image and copy; case sections pair a narrower heading column with a wider reading column (1:2). Evidence appears in pairs, with a three-column artifact gallery inside a disclosure. These content grids stack at the small-screen breakpoint. Project facts shift from four columns to two at the intermediate breakpoint.

Section spacing is generous, with case sections using the section spacing token on desktop and the section-small token on mobile. Preserve heading-before-metadata order. Let smaller supporting text follow the content it describes.

## Elevation & Depth

The interface is flat. Hairline borders, open space, and the dark contact footer separate regions. The image viewer uses a dark translucent backdrop (`rgb(0 0 0 / .82)`) to establish a modal layer.

**The Flat Surfaces Rule.** Use spacing, hairline rules, and surface contrast for hierarchy; the built interface uses no box shadows.

## Shapes

Images, evidence surfaces, controls, and the viewer use square edges. Separators are thin strokes (1px). Inline SVG arrows and enlargement marks use restrained strokes; they signal actions without adding decorative iconography.

## Components

### Text actions

Text actions combine a short label and inline SVG arrow, with a compact gap and a minimum target height of (44px). Hover adds an underline. Keyboard focus uses an ink outline (2px) with an offset (6px); the footer uses paper for the outline. Keep actual links as anchors.

### Navigation

The header pairs a compact name with horizontal navigation. Navigation labels use muted text at rest, ink on hover or current state, and a fine underline for the current item. The header height changes from (80px) to (72px) on small screens. Case-section navigation is sticky, stays on paper, and scrolls horizontally when needed.

### Project rows and evidence

Project entries remain open rows with square images, headings before metadata, research questions, roles, and methods. Image actions appear on cover hover or keyboard focus; touch devices omit that overlay. Evidence uses contained images on white, short captions, enlargement links, and original-file downloads. Keep diagrams contained when cropping would lose information.

### Artifact disclosure

Native details and summary elements reveal the complete artifact gallery. Hairlines mark the disclosure boundary. The summary has a minimum height of (56px); its plus rotates when open. The gallery follows the same responsive stacking as other evidence.

### Download rows

Download links pair a document title and secondary file details with an arrow. A thin bottom divider separates rows; hover underlines the title. File details stay smaller and muted.

### Image viewer

The dialog has distinct toolbar, image stage, and caption regions. Its close and zoom buttons keep minimum targets of (44px). The desktop viewer leaves a (24px) outer margin and becomes full-screen on small screens. Loading and failure messages occupy the image stage; hidden messages must remain absent. Loading suppresses the pending image. Failure offers the original file. Zoom changes the image stage to a scrollable inspection view.

The home display heading has one short entrance movement (10px over .8s). The cover action fades over (.2s). Reduced-motion preferences remove animation, transitions, and smooth scrolling.

## Do's and Don'ts

### Do:

- Do keep project headings before context and date metadata.
- Do preserve original artifact colors and offer enlargement when detail needs inspection.
- Do use the shared container and collapse paired content into a single column on small screens.
- Do retain visible keyboard focus, working hidden states, and the reduced-motion override.

### Don't:

- Don't add decorative gradients, glass, glows, or floating card shadows.
- Don't substitute a display font for the user-approved system sans-serif stack.
- Don't convert open project rows into rounded cards or recolor the original artifacts.
