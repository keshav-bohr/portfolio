# Keshav Bohra — Portfolio

An editorial, high-craft personal site for a Senior Full Stack AI Engineer.
Built with **React 19 + TypeScript + Vite 8 + Tailwind CSS v4**, with fluid
motion via **Motion** and inertial smooth-scroll via **Lenis**.

## Design language

- **Editorial / studio** aesthetic — warm paper ground, deep ink, a single
  sienna accent. Display type in **Fraunces** (variable serif), UI in **Inter**.
- Organic, hand-crafted feel: custom trailing cursor, magnetic buttons,
  mask-reveal headlines, parallax hero, marquee skills band, paper grain.
- Fully responsive; respects `prefers-reduced-motion`.

## Structure

```
src/
├─ data/content.ts        Single source of truth (résumé-derived). Edit this.
├─ hooks/useLenis.ts       Smooth scroll + anchor interception
├─ lib/motion.ts           Shared Motion variants
└─ components/
   ├─ layout/   Nav, Footer
   ├─ ui/       Cursor, Reveal, Magnetic, Marquee
   ├─ sections/ Hero, Work, About, Contact
   └─ work/     ProjectCard, ProjectVisual, CaseStudy, BeforeAfter
```

### Work Showcase
The centerpiece: an asymmetric grid of project cards. Clicking a card morphs it
(shared-element `layoutId`) into a full case study with brief, approach,
outcome metrics, and an interactive **Before / After** comparison.

## Develop

This machine runs Node via **nvm** (it is not on the default `PATH`):

```bash
nvm use            # reads .nvmrc → v24.13.0
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

## Updating content

All copy lives in [`src/data/content.ts`](src/data/content.ts) — projects,
skills, recognition, experience, and contact links. Add a project by appending
to the `projects` array (give it a unique `id`, an `index` folio, and optional
`comparison` for the before/after panel). To swap your GitHub handle, update
`personal.github`.
