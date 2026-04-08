# Barin Debnath — Portfolio

Personal portfolio site built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

Live: [barindebnath.github.io/portfolio](https://barindebnath.github.io/portfolio)

## Tech Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | 5 |
| Vite | 6 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| Lucide React | latest |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
  components/       # Navbar, Footer, ProjectCard, SkillBadge, TimelineItem
  sections/         # Hero, About, Projects, Experience, Contact
  hooks/            # useScrollReveal.ts
  data.ts           # Single source of truth for all content
  index.css         # Global styles (dark theme, noise, custom scrollbar)
  main.tsx
  App.tsx
index.html
vite.config.ts      # base: '/portfolio/'
```

## Updating Content

All site content lives in `src/data.ts` — edit `siteConfig`, `skillGroups`, `projects`, and `experience` there.

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `npm run build` then pushes the `dist/` folder to the `gh-pages` branch via [gh-pages](https://github.com/tschaub/gh-pages).

> **First-time setup:** In your GitHub repo → Settings → Pages → set source to `gh-pages` branch, `/ (root)`.

## License

MIT
