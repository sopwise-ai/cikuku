<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and TanStack Query.
- Keep `page.tsx` and `layout.tsx` as Server Components. Add `"use client"` only at interactive leaves such as `components/theme-toggle.tsx`.
- `components/ui` is vendored shadcn/ui source. Use design tokens (`bg-background`, `text-muted-foreground`, ...) instead of raw colours.
- Read configuration through `lib/env.ts`. `NEXT_PUBLIC_APP_URL` is required for production builds.
- Tests: Vitest for `app`, `components`, and `lib`; Playwright + axe for browser flows. Coverage thresholds are 80%.
- Before pushing, run `npm run format:check`, `lint`, `typecheck`, `knip`, `test:coverage`, and `test:e2e`.
- `main` is PR-only and squash-merged. Use Conventional Commits and a conventional pull request title.
- Read `node_modules/next/dist/docs/` before using a Next.js API; this version differs from older releases.
