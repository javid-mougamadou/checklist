# GitHub Actions — CI & Deploy

Reference copy of the workflow used for this repo. You can reuse it in other static/Vite projects.

## Files

- **`deploy.yml`** — CI (lint, test, build) on every push/PR; deploys `dist/` to GitHub Pages on push to `main`.

## Enabling deploy

1. In the repo: **Settings → Pages → Build and deployment**
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or merge a PR) to run the workflow; the first run will create the `github-pages` environment.

## GitHub Pages base path

If the site is served at `https://<user>.github.io/<repo>/`, set the Vite base in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/<repo>/',  // e.g. base: '/checklist/'
  // ...
})
```

If you use a custom domain or project site at `https://<user>.github.io/`, leave `base` unset or `base: '/'`.

## Reusing in another repo

1. Copy `deploy.yml` into `.github/workflows/` in the target repo.
2. Ensure the repo has `npm run lint`, `npm run test`, and `npm run build`.
3. Enable Pages via GitHub Actions as above and adjust `base` if needed.
