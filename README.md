# cikuku

[![CI](https://github.com/sopwise-ai/cikuku/actions/workflows/ci.yml/badge.svg)](https://github.com/sopwise-ai/cikuku/actions/workflows/ci.yml)

Cikuku is a [Next.js](https://nextjs.org) 16 application using the App Router,
TypeScript, Tailwind CSS, and [shadcn/ui](https://ui.shadcn.com).

## Requirements

- Node.js 26.13.0 (see [`.nvmrc`](.nvmrc))
- npm 11

## Getting started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```text
app/        App Router routes, metadata, and the health endpoint
  api/health/route.ts
  layout.tsx page.tsx error.tsx global-error.tsx loading.tsx not-found.tsx
  sitemap.ts robots.ts manifest.ts icon.svg
components/ UI primitives and client islands
  ui/       vendored shadcn/ui primitives
  api-status.tsx query-provider.tsx status-panel.tsx theme-provider.tsx theme-toggle.tsx
lib/        environment, site metadata, and class utilities
e2e/        Playwright flows
```

## Scripts

| Command                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Start the development server                   |
| `npm run build`         | Create a production build                      |
| `npm run start`         | Start the production server                    |
| `npm run lint`          | Run ESLint                                     |
| `npm run typecheck`     | Run TypeScript without emitting files          |
| `npm run knip`          | Detect unused files, exports, and dependencies |
| `npm test`              | Run tests once                                 |
| `npm run test:watch`    | Run tests in watch mode                        |
| `npm run test:coverage` | Run tests with coverage                        |
| `npm run test:e2e`      | Run Playwright end-to-end tests                |
| `npm run format`        | Format files with Prettier                     |
| `npm run format:check`  | Check formatting without writing               |

## Environment

Copy [`.env.example`](.env.example) to `.env.local` and adjust the values.
`NEXT_PUBLIC_APP_URL` is required for production builds: the build fails
without it, because `metadataBase`, `sitemap.xml`, and `robots.txt` depend on
it. Production builds also reject localhost values. Development falls back to `http://localhost:3000`.

`lib/env.ts` validates the schema at build time. `NEXT_PUBLIC_*` values are
inlined at build time, so set them before `npm run build`, and pass
`NEXT_PUBLIC_APP_URL` as a Docker build argument when building the image.

## Caching

`cacheComponents` and `partialPrefetching` are enabled. Routes stay static
unless they call a request API; `/api/health` calls `connection()` and is
dynamic. Opt a function into caching with `"use cache"` and `cacheLife` when a
route needs it.

## Quality gates

CI runs formatting, linting, type checking, dead-code detection, unit tests, a
production build, and Playwright end-to-end tests. CodeQL and OpenSSF Scorecard
publish results to code scanning. Lighthouse runs on pull requests that touch
application code and weekly, with performance, accessibility, best-practices,
and SEO assertions. Docker images are built on `main` and on pull requests that
touch Docker inputs.

## Testing

Vitest and React Testing Library cover `app`, `components`, and `lib`, with 80%
coverage thresholds. Playwright and axe cover the browser flows, including the
theme toggle, health endpoint, CSP, 404, and dark-mode accessibility.
`npm run test:e2e` builds and starts the production server on port 3100.

## API

`GET /api/health` returns `{ "status": "ok" }`. Client data fetching uses
TanStack Query through `components/query-provider.tsx`.

## UI

Components live in `components/ui` and are generated with shadcn/ui:

```bash
npx shadcn@latest add <component>
```

The theme is class-based through `next-themes`, with light, dark, and system
options.

## Observability

`instrumentation.ts` exports `onRequestError`, which logs structured JSON with
the error message, digest, path, method, route, and router kind. Replace the
`console.error` call with your error platform or forward the payload to it.

## Deployment

The production build uses the standalone output. Build and run the image:

```bash
docker build --build-arg NEXT_PUBLIC_APP_URL=https://example.com -t cikuku .
docker run --rm -p 3000:3000 cikuku
```

The container runs as a non-root user, listens on port 3000, and exposes
`/api/health` for health checks.

## Releases

1. Move the `Unreleased` entries in `CHANGELOG.md` under the new version.
2. Bump `version` in `package.json` and `package-lock.json`.
3. Commit as `chore(release): vX.Y.Z` and create an annotated `vX.Y.Z` tag.
4. Push the commit and tag, then create a GitHub Release from the tag.

## Contributing

`main` is protected: all changes go through a pull request, CI must pass, and
pull requests are squash-merged. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
