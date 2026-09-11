# VSHIELD — Malware Analysis Console

A dark, glass-and-3D themed malware analysis dashboard UI, built with **React + Vite** (plain CSS, no UI framework).

> ⚠️ **This is a front-end UI shell.** Every scan result, detection ratio, threat-family name, IOC, and activity-feed event is generated client-side by `src/data/mockData.js`. Nothing here performs real file scanning, static/dynamic analysis, or network threat-intel lookups. Treat it as a design/prototype you can wire up to a real backend (VirusTotal API, your own sandbox, an EDR API, etc.) later.

## What's inside

- **Dashboard** — stat cards with a 3D cursor-tilt effect, a rotating CSS-3D "threat radar" globe, a 7-day detection trend, a live-updating activity feed, and a recent-scans table.
- **File Scanner** — drag-and-drop (or click-to-browse) upload, a simulated multi-stage scan animation, and a 3D flip-in verdict card with a detection meter and behavioral indicators.
- **Threat Intel** — top active malware families, origin/severity breakdown, and a recent-IOC table.
- **Reports** — full scan history with status filters (All / Malicious / Suspicious / Clean).

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional, serves the built dist/ folder locally
```

The production build is written to `dist/`.

## Project structure

```
src/
  App.jsx / App.css        — shell layout (sidebar + top bar + routed view)
  components/               — Sidebar, TopBar, StatCard, ThreatRadar, ActivityFeed,
                               ScanTable, VerdictBadge, VerdictDetail, Panel, TrendBars
  views/                     — Dashboard, Scanner, ThreatIntel, Reports
  data/mockData.js           — all simulated data generation lives here
  index.css                  — design tokens (colors, type, radii) + global resets
```

## Deploying

### GitHub
```bash
git init
git add .
git commit -m "Initial commit — VSHIELD malware analysis console"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### VS Code
Just open this folder in VS Code (`code .`) — it's a standard Vite + React project, so the built-in terminal + `npm run dev` workflow works out of the box. No extra config needed.

### Static hosting (Vercel / Netlify / GitHub Pages / etc.)
Build command: `npm run build` · Output directory: `dist`
