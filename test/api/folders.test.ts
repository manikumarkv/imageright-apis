import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  createFolder,
  findFolders,
  getFolderById,
} from '../../imageright/api/folders';
import { createMockedApi } from '../helpers';

describe('folders API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('createFolder: POST api/folders with body', async () => {
    mock.onPost('api/folders').reply(201, { id: 'fld-1' });

    const body = { Name: 'folder' };
    const result = await createFolder(api, body);

    expect(mock.history.post[0].url).toBe('api/folders');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
    expect(result).toEqual({ id: 'fld-1' });
  });

  it('findFolders: POST api/folders/find with body', async () => {
    mock.onPost('api/folders/find').reply(200, []);

    const body = { ParentId: 'p-1' };
    await findFolders(api, body);

    expect(mock.history.post[0].url).toBe('api/folders/find');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
  });

  it('getFolderById: GET api/folders/:id without query when includeHasNotes=false', async () => {
    mock.onGet('api/folders/fld-1').reply(200, { id: 'fld-1' });

    await getFolderById(api, 'fld-1', false);

    expect(mock.history.get[0].url).toBe('api/folders/fld-1');
  });

  it('getFolderById: GET api/folders/:id?includeHasNotes=true when includeHasNotes=true', async () => {
    mock.onGet('api/folders/fld-1?includeHasNotes=true').reply(200, { id: 'fld-1' });

    await getFolderById(api, 'fld-1', true);

    expect(mock.history.get[0].url).toBe('api/folders/fld-1?includeHasNotes=true');
  });
});
