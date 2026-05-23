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

Deployments are automated with GitHub Actions via `.github/workflows/deploy-pages.yml`.

- Push to `main` to trigger a deploy automatically.
- Or run it manually from **Actions → Deploy to GitHub Pages → Run workflow**.

> **First-time setup:** In your GitHub repo → Settings → Pages → set **Source** to **GitHub Actions**.
>
> If deploy is blocked with `Branch "main" is not allowed to deploy to github-pages`, go to **Settings → Environments → github-pages** and allow deployments from `main` (or remove restrictive branch rules).

### Optional manual deploy

```bash
npm run deploy
```

This fallback command builds the project and publishes `dist/` to the `gh-pages` branch using the `gh-pages` package.

## License

MIT
