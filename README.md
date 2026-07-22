# tmhcc-ir-apis

A lightweight TypeScript client for the [Vertafore ImageRight](https://www.vertafore.com/) REST APIs.

It wraps the ImageRight HTTP endpoints (authentication, accounts, drawers, files, folders, documents, pages, tasks, workflows, images, etc.) behind a small, promise-based class so you don't have to hand-roll axios calls in every project.

[![CI](https://github.com/manikumarkv/imageright-apis/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/manikumarkv/imageright-apis/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/tmhcc-ir-apis.svg)](https://www.npmjs.com/package/tmhcc-ir-apis)
[![npm downloads](https://img.shields.io/npm/dm/tmhcc-ir-apis.svg)](https://www.npmjs.com/package/tmhcc-ir-apis)
[![license](https://img.shields.io/npm/l/tmhcc-ir-apis.svg)](./LICENSE)

## Installation

```bash
npm install tmhcc-ir-apis
```

Peer runtime: any environment that can run modern axios (Node.js 18+ recommended). TypeScript type definitions are bundled.

## Quick start

### 1. Authenticate with a username & password

```ts
import Library from 'tmhcc-ir-apis';

const lib = new Library('https://your-imageright-host/api');

const api = await lib.connect('username', 'password');

const me = await api.getCurrentUser();
console.log(me);
```

`Library.connect(...)` calls the ImageRight authentication endpoint, obtains an access token, and returns a ready-to-use `ImageRight` client.

### 2. Bring your own access token

If you already have an ImageRight access token (for example, issued by an upstream SSO flow), skip `connect` and construct the API directly:

```ts
import Library from 'tmhcc-ir-apis';

const lib = new Library('https://your-imageright-host/api');

const api = await lib.createAPI({ AccessToken: 'your-access-token' });

const drawers = await api.getDrawers();
```

### 3. Refresh the token later

`ImageRight.authenticate(username, password)` re-authenticates and updates the token used by the same instance:

```ts
await api.authenticate('username', 'new-password');
```

## Supported API groups

Each group exposes a set of methods on the `ImageRight` instance returned by `connect` / `createAPI`:

| Group          | Example methods |
| -------------- | --------------- |
| Accounts       | `getAccount`, `getAllAccounts`, `getCurrentUserAccount`, `getCurrentUserGroups`, `getAccountGroups` |
| Attributes     | `getAttributeById`, `getAttributeByName`, `getAttributeByObject` |
| Authentication | `authenticate` |
| Batches        | `createBatch` |
| Containers     | `getContainers` |
| Documents      | `createDocument`, `findDocuments`, `getDocumentById`, `moveDocument`, `copyDocument`, `deleteDocument`, `updateProperties` |
| Drawers        | `getDrawers`, `getDrawerById`, `getDrawerByName`, `getDrawersInContainer`, `getDrawersInContainerByName` |
| Files          | `createFile`, `findFiles`, `getFileById`, `getRelatedFiles`, `createFileRelationship`, `deleteFileRelationship`, `mergeFiles`, `updateFilesV2` |
| Folders        | `createFolder`, `findFolders`, `getFolderById` |
| Images         | `getImageById`, `getImageByIdV2` |
| Object Types   | `getObjectType`, `getAllowedTypes`, `getAllowedTypesForContainer`, `getAttributeDefinitionsForType`, `getFileTypeExtensions`, `getFileTypeTemplate`, `getSortOptionsForType`, `getTypesForClass` |
| Pages          | `createPage`, `createPageV2`, `copyPage`, `getPageById`, `getAllPagesFromDocument`, `getPageImageMetadata`, `lockPage`, `unlockPage`, `movePage`, `movePageV2`, `mergeToDocument`, `rotatePage`, `updatePageContent`, `updatePageContentV2`, `updatePageProperties`, `checkReadPermissions` |
| Tasks          | `createTask`, `getTasks`, `getPostTasks`, `getTasksByFileId`, `getTasksByFileIdPost`, `updateTask`, `killTask`, `lockTask`, `unlockTask`, `refreshTaskLock`, `releaseTask`, `releaseTaskByAnchor`, `releaseTaskSplitStep`, `routeTask` |
| Task Attributes| `getTaskAttributes`, `getTaskAttributeById`, `getTaskAttributeByName`, `setTaskAttributeById`, `setTaskAttributeByName` |
| Users          | `getCurrentUser`, `getCurrentUserData`, `getUserData`, `changeUserPassword` |
| Workflows      | `getWorkflows`, `getSteps`, `getStepLinks`, `getDefaultStepLink`, `getSplitLinkParameters`, `getPriorityList`, `getStepAttributes`, `getStepAttributeById`, `getStepAttributeByName`, `getUsersToAssign` |

All methods return `Promise<any>` today; concrete response types will be added incrementally in future releases.

## Example: find a file and list its tasks

```ts
import Library from 'tmhcc-ir-apis';

async function main() {
  const lib = new Library(process.env.IR_BASE_URL!);
  const api = await lib.connect(process.env.IR_USER!, process.env.IR_PASS!);

  const matches = await api.findFiles({ /* search criteria */ });
  const fileId = matches?.Files?.[0]?.Id;
  if (!fileId) return;

  const tasks = await api.getTasksByFileId(fileId, { /* options */ });
  console.log(tasks);
}

main().catch(console.error);
```

## Configuration

- `baseUrl` (constructor arg) — the fully-qualified base URL of your ImageRight REST API, e.g. `https://ir.example.com/api`.
- `AccessToken` — sent as `Authorization: AccessToken <token>` on every request. Either provided via `createAPI(...)` or obtained through `connect(...)` / `authenticate(...)`.

## Building from source

```bash
git clone https://github.com/manikumarkv/imageright-apis.git
cd imageright-apis
npm install
npm run build   # tsc → dist/
npm test        # vitest run
```

The published tarball only ships the compiled `dist/` output. Tests live under `test/` and are excluded from the build.

## Contributing

Issues and pull requests are welcome on the [GitHub repository](https://github.com/manikumarkv/imageright-apis). When submitting a PR, please:

1. Keep changes focused and include a short description of the motivation.
2. Run `npm run build` locally and make sure it succeeds.
3. Bump the package version (`npm version patch|minor|major`) if the change is user-facing.

## License

[MIT](./LICENSE) © Mani Kumar
