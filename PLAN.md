# Site Plan — Frontend Developer Portfolio

Status: approved direction, decisions locked in section 5. Ready to scaffold.

## 1. Brief (from the grill-me interview)

**Goal:** land a hired frontend role — convince recruiters and tech leads fast.

**Positioning:** Middle frontend developer.

**Primary stack (also used to build the site):** Vue 3 + Nuxt 3/4, TypeScript.

**Portfolio constraint:** real work is under NDA / part of complex internal systems — cannot be shown in detail (no screenshots, no client names, no case studies with specifics). **The site itself becomes the portfolio piece**: its architecture, code quality, and craft are the proof of skill.

**"Wow" requirements (layered on top of the base design):**
- ~~3D / WebGL scenes~~ — tried (a low-poly figure in the hero), rejected, dropped from scope entirely. See section 5, point 6.
- Complex animations and scroll-driven transitions
- Non-typical / experimental UI moments
- Real technical depth under the hood (not just visual flash)

**Code transparency:** an in-page code viewer — visitors can open a panel and see the actual source of the component/effect currently on screen (not just a link to GitHub).

**Aesthetic direction:** strict corporate / "inevitable"-style as the base (restrained grid, disciplined typography) — the wow-effects are surprising interactive *details*, not a loud, maximalist skin.

**Design system base:** reuse [DESIGN.md](DESIGN.md) (monochrome editorial system: Press Ink `#121212` on Paper White `#ffffff`, Helvetica Neue display type up to 274px, PPSupplyMono captions, sparkle dividers, hairline borders, no chromatic color). Its typography/color/spacing tokens carry over as-is. **Its "Don'ts" about no animation / no hover-transition are explicitly overridden** for this project — those effects are added on top of the type/color system, not instead of it.

**Sections:**
1. About / experience
2. Stack & tools, with proficiency level per item
3. "Architecture of this site" — a case study explaining the technical decisions behind the site itself (performance, structure, why-this-not-that)
4. Contact

**Contact:** static `mailto:` link + social links. No backend, no form submission, no data storage.

**Avatar:** stylized avatar / initials mark, no photograph.

**Language:** bilingual, RU/EN switcher (i18n), content authored in both languages.

**Hosting:** Vercel.

**Priority:** quality over speed — no hard deadline.

## 2. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Nuxt 4 (Vue 3, TypeScript) | Matches the stack to highlight; SSG/SSR for SEO + fast first paint |
| Rendering mode | Static generation (`nuxt generate`) | No backend needed (contact is `mailto`); ships to Vercel as static + edge, fastest possible |
| Animation | GSAP (+ ScrollTrigger) for scroll-driven sequences; native CSS/Vue transitions for small UI motion | GSAP is the standard for complex, scrubbed, sequenced animation; keeps simple transitions cheap |
| i18n | `@nuxtjs/i18n` | Standard Nuxt module, static-generation compatible, RU/EN route or query-based switch |
| Code viewer | Shiki (syntax highlighting) + custom slide-over panel reading source snippets bundled at build time (via `?raw` imports) | No third-party embed, no data leaves the site, full control over styling to match the design system |
| Styling | SCSS (no Tailwind). DESIGN.md's tokens ported into `shared/styles/_variables.scss` (colors, type scale, spacing, radii) + `_mixins.scss` for repeated patterns (e.g. the display-type mixin, the hairline-border mixin) | Matches the explicit requirement for SCSS variables; DESIGN.md's "Quick Start" CSS custom properties are the source values, just authored as SCSS variables instead of runtime custom properties (no dynamic theming needed — the system is single-theme/light only) |
| Deployment | Vercel (static output) | Already decided |
| Testing | Vitest (unit) + Playwright (smoke test: pages render, i18n switch works, code viewer opens) | Middle-level engineering hygiene worth demonstrating, kept light given no backend |
| Linting/formatting | ESLint (`@nuxt/eslint`) + Prettier | Baseline hygiene |

## 3. Site structure

```
/                    Home — hero (animated), condensed intro, links to sections
/about               About / experience
/stack               Stack & tools with proficiency levels
/architecture         "This site as a case study" — technical write-up
/contact             mailto + social links
```

Single long-scroll landing is an option instead of separate routes — decide in section 5 (open questions).

Each route ships in RU and EN via i18n (`/ru/...`, `/en/...` or default-locale root, to be decided).

## 4. Section-by-section plan

### Home / Hero
- No dedicated visual-anchor centerpiece — skipped by choice, not TBD. Plain typographic hero: eyebrow, name, tagline, CTA, scroll hint, on the bare canvas.
- Name, one-line positioning, role in Helvetica display type per DESIGN.md scale
- Scroll cue into the rest of the page
- Wow-effects (animation, experimental UI, technical depth) still apply elsewhere on the site — just not as a hero centerpiece

### About / Experience
- Short narrative bio, years of experience, what kind of systems worked on (in general terms — no NDA specifics)
- Timeline or stacked blocks, restrained typographic treatment per DESIGN.md

### Stack & Tools
- Grouped by category (languages, frameworks, tooling, testing, etc.)
- Proficiency indicated visually (not a gimmicky star rating — something consistent with the "inevitable" aesthetic, e.g. a monospace-labeled scale)

### Architecture of This Site (the core "wow" section)
- Written case study: rendering strategy, why GSAP, i18n approach, performance budget, code-viewer implementation
- Each claim backed by an inline "view source" trigger opening the code viewer panel for that exact component
- This section is effectively the portfolio case study substitute

### Contact
- `mailto:` link, social icons (GitHub, LinkedIn, Telegram — confirm list)
- No form, no backend

### In-page Code Viewer (cross-cutting feature, not its own route)
- Slide-over or modal panel
- Triggered from small "&lt;/&gt;" affordances placed next to animated sections and notable components
- Shiki-highlighted, read-only, shows the actual source file bundled at build time
- Must stay in sync with real source (no hand-copied/stale snippets) — snippet imports pull directly from the component files

## 5. Decisions (resolved)

1. **Routing:** separate routes per section (`/`, `/about`, `/stack`, `/architecture`, `/contact`), not a single-page scroll.
2. **Styling approach:** SCSS, DESIGN.md tokens ported to SCSS variables (see section 2 table). No Tailwind.
3. **Contact links:** Telegram + Gmail (`mailto:`). No other platforms for now.
4. **Domain:** default `*.vercel.app` — no custom domain for now.
5. **Content:** i18n keys file created with placeholder RU/EN copy for every section — see [i18n/locales/](i18n/locales/). You correct/finalize the actual wording; structure and keys stay stable so the app doesn't need rewiring once text changes.
6. **3D scene / hero visual anchor: dropped, not replaced.** First attempt (a low-poly primitive-built seated figure at a laptop, TresJS/Three.js) was built, wired into the hero, and rejected outright — removed along with TresJS/Three.js entirely (see git history: "Add the 3D hero scene" then "Remove the 3D developer figure and its dependencies"). Rather than searching for a different hero centerpiece concept, the idea itself is skipped: the hero stays a plain typographic block (no placeholder box either — see [Hero.vue](app/widgets/hero/Hero.vue)). The wow-effect budget goes entirely into the remaining three: complex animation/scroll-driven transitions (GSAP), non-typical/experimental UI, and technical depth under the hood — applied elsewhere on the site, not as a hero centerpiece.

## 5a. Engineering standards (confirmed, binding for implementation)

### Architecture — Feature-Sliced Design (FSD)
```
src/
  app/          bootstrap: Nuxt config glue, providers, global styles entry, i18n setup
  pages/        route-level compositions (thin — assemble widgets/features only)
  widgets/      composite blocks: Hero, NavPill, FooterStrip, CodeViewerPanel
  features/     interactive units: LangSwitch, CodeSnippetTrigger
  entities/     domain data shapes: StackItem, ExperienceEntry, ContactLink
  shared/
    ui/         reusable, app-agnostic UI kit: Button, Pill, MonoTag, SparkleDivider, Panel
    styles/     _variables.scss, _mixins.scss (DESIGN.md tokens)
    lib/        utilities (e.g. reduced-motion helper, snippet loader)
    config/     i18n locales, constants
```
- Strict unidirectional imports: `shared → entities → features → widgets → pages → app`. No upward or sideways imports across slices without going through a slice's public API (`index.ts`).
- Enforced via `eslint-plugin-boundaries` (or `@feature-sliced/steiger` if it fits Nuxt 4 cleanly) — lint failure on layer violation, not just convention.

### UI kit
- Every recurring visual element (button, pill/tag, panel, divider, nav item) lives once in `shared/ui`, parameterized via props — no copy-pasted markup between pages.
- Components built against DESIGN.md's component specs (Navigation Pill, Section Heading, Monospace Meta Tag, Sparkle Divider, etc.) so they're visually consistent by construction, not by convention.

### Styling
- SCSS only, tokens as variables (`$color-press-ink`, `$text-display`, etc.), no Tailwind, no inline magic numbers — every size/color/spacing pulled from `shared/styles/_variables.scss`.
- Component-scoped `<style lang="scss" scoped>` per SFC, shared mixins imported, no global leakage.

### Nuxt 4 / Vue 3.5 / TypeScript — used deliberately, not just present
- Nuxt 4's `app/` directory convention, typed routing (`useRoute` / `definePageMeta` typed), Nitro route rules per-page (prerender all pages since fully static).
- Vue 3.5 features where they fit: reactive props destructure (no `toRefs` boilerplate), `useTemplateRef`, `useId` for accessible form/label wiring, `defineModel` for any two-way-bound UI kit inputs.
- Strict TypeScript (`strict: true`), typed props/emits on every component, typed i18n keys (`@nuxtjs/i18n` + `vue-i18n` type generation), no `any`.
- Composables for cross-cutting logic (`useReducedMotion`, `useCodeSnippet`, `useStackData`) instead of duplicating logic in components.

### Performance budget
- Fully static output (`nuxt generate`), deployed as static + edge on Vercel — no server round-trip for content.
- GSAP code-split and lazy-loaded only on the routes/components that actually animate (dynamic `import()`) — pages with no animation shouldn't pay for the library.
- `@nuxt/image` for any raster assets (see section 8) with responsive `srcset`, modern formats (AVIF/WebP), explicit dimensions to avoid layout shift.
- Self-hosted, subsetted fonts (Helvetica Neue substitute + mono + handwritten accent) with `font-display: swap`.
- Target: Lighthouse Performance ≥ 90 on mobile, CLS ≈ 0, JS payload kept minimal across all routes.
- `prefers-reduced-motion` fallback disables/simplifies GSAP sequences and any experimental-UI motion, falling back to a static equivalent.

### Testing
- Vitest for logic that can silently break: i18n key resolution/fallback, code-snippet loader (source must match the real file, not drift), stack-proficiency mapping, contact-link builders, any composable with branching logic.
- Not chasing UI snapshot coverage — tests target logic correctness, per the earlier "unit tests on important logic" requirement, not exhaustive component testing.

### Responsive, cross-browser, UI/UX
- Mobile-first SCSS breakpoints (mixins for `sm/md/lg/xl`), verified at minimum on: latest Chrome, Firefox, Safari (desktop + iOS), Edge.
- Keyboard navigation and focus-visible states on nav pill, language switch, and the code-viewer panel (Esc to close, focus trap while open).
- Color contrast is inherently compliant (near-black on white per DESIGN.md), but verified explicitly for any new UI kit component.
- No motion-only affordances — every animated/interactive cue has a static, discoverable equivalent (e.g. the code-viewer trigger is a visible `</>` icon, not a hover-only reveal).

## 6. Build phases

1. **Scaffold** — done. Nuxt 4 + TS project on the FSD layout, ESLint/Prettier + `eslint-plugin-boundaries`, DESIGN.md tokens ported to `shared/styles` SCSS variables, i18n skeleton wired to `i18n/locales/*.json`, base UI kit + layout (nav pill, footer strip from DESIGN.md components)
2. **Static shell** — done. All sections/routes have real placeholder copy (RU/EN), fully navigable and readable
3. **Wow layer** — GSAP scroll animations, experimental UI details (new hero concept needed first — see section 5, point 6). Not started.
4. **Code viewer** — done. `widgets/code-viewer/CodeViewerPanel.vue` (slide-over, Esc + focus trap, Shiki with a custom monochrome theme) and `features/code-snippet-trigger` (the `</>` affordance), wired into 4 of the 5 Architecture sections. Source is fetched at runtime from `public/snippets.json`, generated at build time by `scripts/generate-snippets.mjs` from the real backing files — not a `?raw` module import, which breaks Nitro's Rollup-based server bundle (see section 7). Rendering strategy has no trigger: its claim lives in `nuxt.config.ts`, which Nuxt blocks from client-side import as a secrets guard, and no other file would honestly back it.
5. **Polish & QA** — done. Playwright smoke tests (`tests/e2e`) run against the real generated static build. Full responsive pass (mobile/tablet/desktop) across all 5 pages. Lighthouse against the static build: Performance/Accessibility/Best Practices/SEO all 100/100/100/100 on `/` and `/architecture` — fixed a real WCAG contrast failure (`$color-mute-gray` text), a missing meta description, and a missing favicon along the way.
6. **Deploy** — Vercel project, custom domain if chosen. Not started.

## 7. Risks / things to watch

- **Heavy animation vs. performance:** must ship a `prefers-reduced-motion` fallback and keep GSAP sequences light enough for mobile — otherwise it undercuts the "technical depth" claim instead of proving it.
- **Design tension:** DESIGN.md's Don'ts explicitly ban the effects we're adding. We're consciously overriding that — worth a short note in the Architecture section explaining the deliberate departure, since that departure is itself a design decision worth narrating.
- **Code viewer staleness:** snippets must be pulled from real source at build time, not pasted by hand, or the "transparency" feature becomes a liability if it drifts from reality.

## 8. Asset generation

Dropped: building without Higgsfield or any external image/video generation service. Any raster asset the site needs (OG image, favicon source art, textures) is either built by hand/code (SVG, canvas, procedural) or sourced directly — not generated via a third-party AI service. Generated assets, if any appear later, still go through the same `@nuxt/image` optimization pipeline as any other raster asset (section 5a).
