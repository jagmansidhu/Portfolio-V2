# Design System — Desktop Portfolio

A personal Finder desktop for Jagman Sidhu (UBC CS, Vancouver). The site opens as his machine; folders are navigation. No marketing chrome, no card grids.

**Subject:** software engineer portfolio  
**Audience:** recruiters and engineers  
**Page job:** land on a desktop, open a folder to go deeper  

**Signature (desktop):** cream Finder field, mono filenames from real work, brand *jagman* as the center mark.  
**Signature (library):** wooden shelves of real spines; pull a book out in 3D, cover toward you; put it away spine-first so it never clips the neighbor.

**Inspiration:** Desktop layout adapted from [PORTFOLIO 2025 | web design & social media design](https://www.behance.net/gallery/239103229/PORTFOLIO-2025-web-design-social-media-design) on Behance.

---

## Desktop (`/`)

| Principle | Application |
|---|---|
| Desktop as home | `/` is always the desktop. Back means close the folder. |
| Folders navigate | Click → `/experience`, `/projects`, `/books`, `/data`. |
| Files are work | Real project screenshots as image files; mono `snake_case` labels. |
| Apps are links | GitHub, LinkedIn, Mail as small app tiles. |
| One composition | First viewport = one scattered desktop scene. |

Brand: *jagman* (Cormorant italic) with a short bio underneath. No hero “portfolio” wordmark over a giant folder.

### Color

```css
--bg: #EBE6DE;
--ink: #1C1714;
--ink-soft: #6A6158;
--accent: #5B9EC9;
--folder-face / tab / shade: Finder blues;
```

### Type

| Role | Face |
|---|---|
| Brand script | Cormorant Garamond italic |
| Labels / files | IBM Plex Mono |
| Body | DM Sans |

---

## Library (`/books`)

Wooden shelves on a warm wall (inspiration brief). Two bays:

1. **Read** — flag + hint; most recently read on the left.  
2. **Reading + want** — shared shelf; hover flag appears on the pulled book only.

### Interaction

- Dwell ~500ms before a full pull.  
- Pull moves in Z (out of the shelf); neighbors do not shift layout.  
- Put-away is two-phase: rotate to spine-forward, then slide flat into the row.  
- Respect `prefers-reduced-motion`.

### Tokens

```css
--wall: #e7dfd2;
--wood: #3a2f28;
--ink: #2a241c;
--tag: #f7f1e8; /* paper flag on hover */
```

Hover flags are small paper tags (slight rotate), not rounded-full pills.

---

## Do / Don’t

**Do** keep the desktop metaphor, lowercase mono labels, generous empty parchment; keep library shelves tactile.  
**Don’t** add CTA strips, numbered 01/02 sections, pill clusters, nested cards, or instructional helper copy on the library hero.
