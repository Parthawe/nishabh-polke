# Research sources and asset preparation

## Primary material

- [Nishabh's Linktree](https://linktr.ee/nishabhpolke): source index and portrait.
- [GSA 2024 showcase](https://2024.gsapostgradshowcase.net/nishabh-polke/): FACTual description, 29 gallery entries, project photographs, research diagrams, and stakeholder video.
- [UX portfolio](https://drive.google.com/file/d/1NXH368uZ0Ig2Y9XnS8pbAngLiL28c1Ih/view): 17 image-based PDF pages. PDF pages 2–5 document smart-home usability, 6–10 tobacco-cessation usability, and 11–17 endoscopic-device research. Printed page numbers are one less than PDF page numbers.
- [Architecture portfolio](https://drive.google.com/file/d/11eZPTclnp6P3Qtb-099YudFFn1JQA7dJ/view): 20 image-based PDF pages.
- [FACT recommendation](https://drive.google.com/file/d/1F9tJHsS8ZuWzinX-vSKAhwIF5GfDjnj1/view): letter from Ruth Jeffries, 13 August 2024.
- [Scarlet Scout](https://www.behance.net/gallery/140793169/Scarlet-Scout): 11 published image panels, co-owned by Nishabh Polke and Sravani Mummidi; published 2 April 2022.
- [Scarlet Scout site map](https://drive.google.com/file/d/1zWz0b2e_DEnwhfbAtClOUjDuHFjuvA0g/view): PDF linked from the Behance project.

## Corroborating source

[Forres Gazette, 14 December 2024](https://www.forres-gazette.co.uk/news/international-art-school-students-helping-with-town-s-projec-368974/) reports that a later FACT/GSA community marketplace was inspired by Nishabh's work. It is attributed separately from his own documented research and handover. Publisher photography and article text were not copied into the asset archive.

## Content limits

Do not add client identities, study counts, numerical outcomes, availability, résumé claims, degrees, or employment dates without a source. The medical-device client is unnamed. Product research findings do not establish clinical effects or post-launch business outcomes. The original source portfolio contains quantitative findings; the web summaries focus on supported qualitative findings and documented outputs.

Keep individual contribution explicit. Scarlet Scout is co-authored. Endoscopic-device fieldwork was collaborative; market/competitor analysis is identified as Nishabh's individual work. The Forres gallery's proposed event renders remain labeled as proposals.

## Reproduce the image derivatives

Use a Python environment with Pillow and a Poppler installation providing `pdftoppm`.

```sh
python3 scripts/collect-assets.py
pdftoppm -scale-to 2400 -png assets/downloads/nishabh-polke-ux-portfolio.pdf assets/originals/ux
pdftoppm -f 1 -l 3 -scale-to 1600 -png assets/downloads/nishabh-polke-architecture-portfolio.pdf assets/originals/architecture
python3 scripts/prepare-images.py
npm run prepare:pages
```

The Drive PDFs are acquired with the connected Google Drive fetch workflow, preserving raw bytes. The saved image catalogs were collected from the actual public page DOM. GSA and Behance pages blocked the initial shell HTTP fetches; browser inspection supplied the published image URLs, and all 42 image downloads succeeded. No asset is currently marked unavailable.

The social preview is a local typographic composition using Nishabh's actual portrait. No generated project imagery or fabricated research charts are used.
