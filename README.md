# cikuku

[![CI](https://github.com/sopwise-ai/cikuku/actions/workflows/ci.yml/badge.svg)](https://github.com/sopwise-ai/cikuku/actions/workflows/ci.yml)

Cikuku is a [Next.js](https://nextjs.org) 16 application using the App Router,
TypeScript, and Tailwind CSS.

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
| `npm run format`        | Format files with Prettier                     |
| `npm run format:check`  | Check formatting without writing               |

## Environment

Copy [`.env.example`](.env.example) to `.env.local` and adjust the values.
`lib/env.ts` validates the configuration at build time and on server startup,
so invalid values fail fast instead of surfacing at request time.
`NEXT_PUBLIC_APP_URL` sets `metadataBase` for absolute URLs.

## Contributing

`main` is protected: all changes go through a pull request, CI must pass, and
pull requests are squash-merged. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
