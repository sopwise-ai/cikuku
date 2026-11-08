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
   `feat:`, `fix:`, `chore:`, `docs:`, `ci:`, `refactor:`, `test:`.
3. Run the checks locally:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

4. Open a pull request and make sure CI passes.
5. Squash merge; the head branch is deleted automatically.

## Releases

Releases use annotated semver tags (`v0.1.0`) and GitHub Releases.
