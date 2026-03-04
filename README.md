# Checklist PWA

Checklist is a mobile-first PWA for a simple todo list. Add tasks, tick them off, reorder by drag-and-drop, and filter by view. Built with React, TypeScript, Vite, TailwindCSS, and DaisyUI. Offline-ready with LocalStorage persistence and light/dark theme.

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

### With Docker

```bash
docker compose up -d
docker compose exec web npm run dev
```

Then open `http://localhost:5173`.

## Production Build

```bash
npm run build
npm run preview
```

## Quality & Testing

- Lint: `npm run lint`
- Unit tests: `npm run test`
- Full check (lint + test + build): `npm run validate`

## Features

- Add, complete, and remove tasks
- Drag-and-drop reordering (@dnd-kit)
- LocalStorage persistence (tasks survive refresh and app close)
- View modes: full list or top 2 tasks
- Toggle to show or hide completed tasks
- Light/dark theme
