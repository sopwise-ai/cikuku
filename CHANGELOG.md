# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Prettier, EditorConfig, and a CI format check.
- Vitest and React Testing Library test suite.
- Baseline security headers for all routes.
- Husky hooks, lint-staged, and commitlint for local commit checks.
- Pull request title validation for squash merges.
- Sorted Tailwind classes with `prettier-plugin-tailwindcss`.
- Unused file, export, and dependency detection with `knip`.
- Shared VS Code settings and GitHub issue forms.
- Typed environment validation with `zod` and `@t3-oss/env-nextjs`.
- Playwright end-to-end and axe accessibility checks.
- CodeQL, OpenSSF Scorecard, and scheduled Lighthouse CI.
- App Router error, loading, and not-found boundaries, plus sitemap, robots, and manifest routes.
- shadcn/ui primitives, class-based dark mode, and a starter landing page.
- A health endpoint and a TanStack Query provider.
- A standalone Docker image with a non-root runtime user.

### Changed

- Production builds now fail without `NEXT_PUBLIC_APP_URL`; Docker builds take
  it as a build argument.
- Coverage now includes components and library code, with 80% thresholds.
- Unified error, loading, and not-found UI around `StatusPanel`, and restored
  the theme in `global-error`.
- Server errors are reported through `onRequestError` with request context.
- `/api/health` is rendered per request and sends `Cache-Control: no-store`.
- Enabled `noUncheckedIndexedAccess` and `noImplicitOverride` in TypeScript.
- Aligned the Node.js engine with the local toolchain and `.nvmrc`.

### Security

- Added a runtime dependency audit to CI.
- Added a Content Security Policy for all routes.

## [0.1.0] - 2026-11-08

### Added

- Initial Next.js 16 application with the App Router, TypeScript, and Tailwind CSS.
- ESLint flat config and a `typecheck` script.
- GitHub Actions CI for lint, typecheck, and build.
- Dependabot, CODEOWNERS, pull request template, and security policy.
- Repository standards: squash-only merges, protected `main`, and protected release tags.
