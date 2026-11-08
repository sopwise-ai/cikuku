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
without it, because `metadataBase`, `sitemap.xml`, `robots.txt`, and canonical
URLs depend on it. Development falls back to `http://localhost:3000`.

`lib/env.ts` validates the schema at build time. `NEXT_PUBLIC_*` values are
inlined at build time, so set them before `npm run build`, and pass
`NEXT_PUBLIC_APP_URL` as a Docker build argument when building the image.

## Quality gates

CI runs formatting, linting, type checking, dead-code detection, unit tests, a
production build, and Playwright end-to-end tests. CodeQL and OpenSSF Scorecard
publish results to code scanning, and Lighthouse CI runs weekly with
accessibility assertions.

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

## Deployment

The production build uses the standalone output. Build and run the image:

```bash
docker build --build-arg NEXT_PUBLIC_APP_URL=https://example.com -t cikuku .
docker run --rm -p 3000:3000 cikuku
```

The container runs as a non-root user, listens on port 3000, and exposes
`/api/health` for health checks.

## Contributing

`main` is protected: all changes go through a pull request, CI must pass, and
pull requests are squash-merged. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
