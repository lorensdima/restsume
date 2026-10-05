# PROJECT_DESIGN — RESTsume v2

## 1. Product Context
- **Product:** Personal portfolio of Emilio Laurence Dimalanta that is *also* a REST API (`/api/*`).
- **Target user:** recruiters, hiring engineers, collaborators.
- **Primary job:** understand who he is, see real projects, reach him — and notice the API idea.
- **Content that must appear:** name/title, socials, 6 projects with repo/doc/site links, experience & education (from DB), skills, contact, Skippy easter egg.
- **Constraints:** Next 14 App Router, Tailwind 3, framer-motion 11, Vercel Postgres. No API changes.

## 2. Existing UI Read
- **Vocabulary:** black starfield, white 1px outlines, orbit ring, leetspeak folder tabs (`PR0JECTS`, `SK1LLS`), vertical side tab, hand-drawn line art, handwritten "Great!".
- **Preserve:** all of the above + Skippy.
- **Evolve:** API concept from hidden toast → organizing spine; uniform cards → index + preview.
- **Remove:** blue gradient glow, justified text, mismatched green button, cryptic minus/stop pagination, black box behind name, `hover:animate-pulse`.

## 3. Taste Direction
- **Identity:** a quiet monochrome night sky with an API humming underneath and a sense of humour.
- **Distinctive:** endpoint labels, `{ }` JSON flip, orbit ring, sketch reveals, Skippy.
- **Quiet:** surfaces, body copy, backgrounds (starfield is the only atmosphere).
- **Avoid:** gradient glows, glassmorphism, bento grids, purple neon, cursor spotlights, emoji bullets, identical card grids.

## 4. References (used lightly)
- **Vercel** — monochrome precision, mono technical labels, 1px hairlines. *Not* taken: Geist, workflow colours, light canvas.
- **Ollama** — terminal-first honesty for status/JSON surfaces. *Not* taken: brand illustrations.

## 5. Palette
| Role | Value |
|---|---|
| Page | `#000` + Starfield |
| Surface | `#0c0c0d` |
| Raised | `#151517` |
| Line / strong | `rgba(255,255,255,.14)` / `rgba(255,255,255,.9)` |
| Text | `#f4f4f5` / `#a1a1aa` / `#71717a` |
| Signal | `#86efac` — live / 200 / JSON strings / live-site CTA **only** |
| Focus | 2px `#f4f4f5`, 2px offset |

## 6. Typography
- Display: Outfit 600, `-0.03em`.
- Body: Jost 400, 16–18px, lh 1.6, left-aligned.
- Mono: Inconsolata 500 — endpoints, status, JSON, buttons, metadata.
- Tabs: Atkinson Hyperlegible uppercase leetspeak.
- Hand: Shadows Into Light — "Great!" and Skippy only.

## 7. Components
- **Button:** mono, 1px line border, radius 6px, min-h 40px; hover inverts; `↗` nudges 2px. Only `live site ↗` is filled (signal).
- **SectionTab:** round icon badge + grey label block + index + endpoint + `{ }` toggle. Label decodes on enter.
- **JSON view:** header `HTTP/1.1 200 OK · application/json · n items`, live fetch with `// local snapshot` fallback.

## 8. Layout
- Container max 72rem, px 5 / md 8. Sections py 24–32.
- Projects: 5/7 split ≥1024px; accordion below.
- Mobile: single column, horizontal tabs, 44px tap targets, ring 80vw.

## 9. Motion
- Personality: slow, orbital, mechanical. Springs only in Skippy.
- Ease `[0.22, 1, 0.36, 1]`; reveals 0.6–0.9s; micro 0.18s.
- Reveal = 12px rise + fade, stagger 60ms, once.
- `MotionConfig reducedMotion="user"`; ring stops, typing skipped.
- Max one looping animation per viewport.

## 10. Do / Don't
- **Do** show real endpoints, keep everything honest (no invented data), keep white-line language.
- **Don't** add glows, extra accent colours, or decoration without a function.
