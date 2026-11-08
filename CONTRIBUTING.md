# Contributing

## Requirements

- Node.js 26.13.0 (see [`.nvmrc`](.nvmrc))
- npm 11

## Workflow

`main` is protected and only accepts changes through pull requests.

1. Create a branch from `main`:
   - `feat/<short-description>`
   - `fix/<short-description>`
   - `chore/<short-description>`
   - `docs/<short-description>`
2. Make focused commits using [Conventional Commits](https://www.conventionalcommits.org/):
   `build:`, `chore:`, `ci:`, `docs:`, `feat:`, `fix:`, `perf:`, `refactor:`,
   `revert:`, `style:`, `test:`.

   Husky installs the hooks on `npm install`:

   - `pre-commit` runs `lint-staged`, which formats and lints only the staged files.
   - `commit-msg` runs commitlint and rejects non-conventional messages.

   Hooks can be bypassed with `git commit --no-verify`, but CI and the pull request
   title check enforce the same rules.

3. Run the checks locally:

   ```bash
   npm run format:check
   npm run lint
   npm run typecheck
   npm run knip
   npm test
   npm run test:e2e
   npm run build
   ```

   The end-to-end suite needs a browser once: `npx playwright install chromium`.

   Lighthouse CI runs weekly. Run it locally with
   `npx --yes @lhci/cli@0.16.0 autorun` after `npm run build`.

4. Open a pull request with a Conventional Commits title and make sure CI passes.
   Because `main` is squash-only, the pull request title becomes the commit message.
5. Squash merge; the head branch is deleted automatically.

## Releases

Releases use annotated semver tags (`v0.1.0`) and GitHub Releases.
