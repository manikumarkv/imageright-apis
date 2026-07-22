# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Testing infrastructure with [Vitest](https://vitest.dev) and [`axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter). 23 starter tests covering `authentication`, `drawers`, `users`, `files`, and the top-level `Library` flow. Run with `npm test` or `npm run test:watch`.

### Changed
- `tsconfig.json` now excludes `test/**/*` and `**/*.test.ts` from the build so tests never leak into `dist/` or the published tarball.

## [1.0.11] - 2026-07-22

### Added
- `LICENSE` file (MIT) — was declared in `package.json` but previously missing from the repo and tarball.
- `README.md` with installation, quickstart, and a summary of all supported API groups.
- `repository`, `bugs`, `homepage`, and `engines.node` (`>=18`) fields in `package.json`.
- `prepublishOnly` script that runs `npm run build` before every publish to guarantee a fresh `dist/`.

### Changed
- Expanded `description` and `keywords` in `package.json` for better discoverability on npm.

## [1.0.10] - 2026-07-22

### Changed
- Bumped `axios` dependency range from `^1.15.0` to `^1.18.1`.
- Bumped `typescript` dev dependency from `^5.8.3` to `^7.0.2`.

### Fixed
- Resolved a high-severity dependency vulnerability reported by `npm audit`.

### Removed
- Dropped stray test build artifacts (`dist/__tests__/library.test.js` and its `.d.ts`) that had been accidentally shipped in `1.0.9`.

## [1.0.9] - Prior release

- Baseline release prior to the 1.0.10 dependency and packaging cleanup.

## [1.0.2] – [1.0.8]

Earlier releases were not tracked in a changelog. See the git history for details:
<https://github.com/manikumarkv/imageright-apis/commits/main>.

[Unreleased]: https://github.com/manikumarkv/imageright-apis/compare/v1.0.11...HEAD
[1.0.11]: https://github.com/manikumarkv/imageright-apis/compare/v1.0.10...v1.0.11
[1.0.10]: https://github.com/manikumarkv/imageright-apis/compare/v1.0.9...v1.0.10
[1.0.9]: https://www.npmjs.com/package/tmhcc-ir-apis/v/1.0.9
