# NEXUS-9 — Cyborg-Themed Landing Page

A responsive, motion-led cybernetic technology landing page built with semantic HTML, CSS and vanilla JavaScript. No framework or package installation is required.

## Preview
Open `index.html` in a modern browser, or run a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Design direction
- **Concept:** NEXUS-9, a fictional human-machine interface platform.
- **Visual language:** near-black surfaces, cyan/pink signal colours, technical labels, thin grid lines, cut-corner CTAs and an original inline SVG cyborg illustration.
- **UX intent:** keep the visual intensity in the artwork and micro-details while maintaining readable body copy, clear section hierarchy and a consistent primary CTA.
- **Inspiration:** cyberpunk web interfaces and dark neon UI patterns. This is an original implementation and does not copy a referenced page.

## Features
- Responsive desktop/tablet/mobile layouts.
- Animated particle network canvas (no external libraries).
- Original inline SVG cyborg artwork.
- Animated status indicators, orbit rings and ticker.
- Scroll-reveal cards and animated concept metrics.
- Mobile navigation toggle.
- Reduced-motion preference support.
- Semantic landmarks, accessible nav labels, visible link text and scalable typography.

## Project files
- `index.html` — semantic page structure and SVG illustration.
- `styles.css` — design system, layout, responsive rules and motion.
- `app.js` — canvas particles, mobile navigation, cursor coordinates, reveal and metric animations.
- `assets/` — reserved for optional future assets.

## Customisation
1. Replace fictional NEXUS-9 copy with your approved project/brand details.
2. Replace the `.example` email in the CTA with a real address or form endpoint.
3. Replace the concept metrics with validated product metrics before using this page commercially.
4. Add final Techfest/project links if required by the assignment organiser.

## Validation checklist
- Check the page at 1440px, 1024px, 768px and 390px widths.
- Test mobile navigation and all anchor links.
- Test keyboard navigation and reduced-motion preference.
- Replace concept claims and placeholder contact details before production.

## Attribution
The cyborg illustration is inline SVG authored for this project. Fonts load from Google Fonts when online; system fallbacks remain available offline.
