# Copilot instructions for `tmhcc-ir-apis`

These are project-specific rules that GitHub Copilot (and any AI assistant working in this repo) should follow. Keep suggestions consistent with what's already here.

## What this repo is

A small TypeScript SDK that wraps the **Vertafore ImageRight** REST APIs.
It is published to npm as [`tmhcc-ir-apis`](https://www.npmjs.com/package/tmhcc-ir-apis) and is consumed by internal applications. Treat it like a **public library**, not an app: breaking changes matter, the public surface is what's re-exported from `index.ts`, and only the compiled `dist/` is shipped.

## Layout

```
index.ts                     # Public entry — exports `Library` (default)
imageright/index.ts          # `ImageRight` class — one method per REST endpoint
imageright/api/*.ts          # One file per API group (drawers, files, tasks, …)
                             # Each file exports plain functions that take an
                             # AxiosInstance as their first argument.
dist/                        # Build output (published, gitignored)
tsconfig.json                # Emits to dist/ and dist/types/
```

Do not restructure the folders without a very good reason — external consumers and the `files` allow-list in `package.json` depend on the current shape.

## Coding conventions

- **Language:** TypeScript, targeting Node ≥ 18. No runtime deps beyond `axios`.
- **API-module functions** always take `api: AxiosInstance` as the first parameter and return `Promise<T>`. They should call `api.get/post/put/delete` with a **relative URL starting with `api/...`** (the base URL is already set on the AxiosInstance) and then `.then((res) => res.data)`.
- **Method placement:** every new endpoint is added in **two** places:
  1. A plain function in the matching `imageright/api/<group>.ts` file.
  2. A thin wrapper method on the `ImageRight` class in `imageright/index.ts` that calls `this.api()` and delegates.
  Keep both in sync. If a new API group is introduced, create a new file and a new `// GroupName` section in `ImageRight`.
- **Auth:** All requests go through `ImageRight.api()`, which sets `Authorization: AccessToken <token>`. Do not add other auth schemes without discussion.
- **Types:** the codebase currently uses `Promise<any>` in many places. Prefer introducing proper request/response interfaces (colocated in the module file) for any code you touch, but do not do a repo-wide `any → unknown` sweep in an unrelated PR.
- **Style:** 2-space indent, single quotes, semicolons, trailing newline. Match surrounding code. No ESLint/Prettier configured yet — don't introduce them silently.
- **Error handling:** don't swallow errors. Let axios errors propagate; consumers rely on axios's standard error shape.

## Comments and docs

Only add comments when the code isn't self-explanatory. Do not add JSDoc blocks to every method — the method name plus TS signature is usually enough. If you fix a subtle bug, a one-line `//` comment above the fix is welcome.

## Build, test, publish

- **Build:** `npm run build` (runs `tsc`, emits to `dist/`). Must succeed before publishing — `prepublishOnly` enforces this.
- **Tests:** [Vitest](https://vitest.dev) + [`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter). Run with `npm test` (single pass) or `npm run test:watch`. Tests live under `test/` (mirror the `imageright/api/` layout under `test/api/`). Test files use fabricated placeholder responses — do NOT check in real ImageRight payloads unless they've been scrubbed of PII. See existing tests for the shared `createMockedApi()` helper.
- **Adding tests for a new endpoint:** at minimum, assert the HTTP method, URL (including path params and any query string), request body shape, and that the returned value is `res.data` verbatim.
- **Dependency updates:** use `ncu` to survey, then `ncu -u && npm install` to apply. Always follow up with `npm audit` and `npm run build` before committing.
- **Versioning:** follow [SemVer](https://semver.org/). Use `npm version patch|minor|major --no-git-tag-version` and add matching entries to `CHANGELOG.md` under a new heading. After merging, tag as `vX.Y.Z` and push the tag so changelog compare-links resolve.
- **Publishing:** `npm publish --access public`. The package is public.

## Changelog

Every user-visible change (public API, dependencies, packaging, docs that ship in the tarball) gets an entry in `CHANGELOG.md`. Group entries under `Added`, `Changed`, `Fixed`, `Deprecated`, `Removed`, `Security`. New work goes under `## [Unreleased]` until it's released.

## Git & PR conventions

- **Branch:** always branch from `main`.
- **Commits:** short imperative subject, optional body explaining the *why*. Conventional-commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`) are welcome but not required.
- **Do not** commit `dist/` — it's gitignored and rebuilt on publish.
- **Do not** commit secrets, tokens, or `.npmrc` files.
- **Push credentials:** this repo is owned by the `manikumarkv` GitHub account. On machines where a different account is the default `gh` user, use a repo-local git credential helper — do not switch the global `gh` account.

## Security

- Never log or persist an `AccessToken`. If you must display one during debugging, mask everything except the last 4 characters.
- Treat any user-supplied string that ends up in a URL path as untrusted and pass it through `encodeURIComponent` where appropriate. (Many existing endpoints don't do this yet — please add it when touching that code.)

## What NOT to do

- Don't add heavy runtime dependencies (moment, lodash, RxJS, etc.). If you need utility code, write a small helper.
- Don't switch to ESM-only output without discussion — consumers may still be on CJS.
- Don't add a bundler (rollup/tsup/esbuild) unless we deliberately move to a dual-format build.
- Don't rewrite existing method signatures unless you're fixing an actual bug — consumers depend on them.
