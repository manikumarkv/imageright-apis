import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  createFile,
  createFileRelationship,
  deleteFileRelationship,
  findFiles,
  getFileById,
  getRelatedFiles,
  mergeFiles,
  updateFilesV2,
} from '../../imageright/api/files';
import { createMockedApi } from '../helpers';

describe('files API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('createFile: POST api/files with body', async () => {
    mock.onPost('api/files').reply(201, { id: 'f-1' });

    const body = { Name: 'test' };
    const result = await createFile(api, body);

    expect(mock.history.post[0].url).toBe('api/files');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
    expect(result).toEqual({ id: 'f-1' });
  });

  it('findFiles: POST api/files/find with search body', async () => {
    mock.onPost('api/files/find').reply(200, []);

    const search = { FolderId: 'x' };
    await findFiles(api, search);

    expect(mock.history.post[0].url).toBe('api/files/find');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(search);
  });

  it('getFileById: GET api/files/:id without query when includeHasNotes=false', async () => {
    mock.onGet('api/files/f-1').reply(200, { id: 'f-1' });

    await getFileById(api, 'f-1', false);

    expect(mock.history.get[0].url).toBe('api/files/f-1');
  });

  it('getFileById: GET api/files/:id?includeHasNotes=true when flag is true', async () => {
    mock.onGet('api/files/f-1?includeHasNotes=true').reply(200, { id: 'f-1' });

    await getFileById(api, 'f-1', true);

    expect(mock.history.get[0].url).toBe('api/files/f-1?includeHasNotes=true');
  });

  it('getRelatedFiles: GET api/files/:id/related', async () => {
    mock.onGet('api/files/f-1/related').reply(200, []);

    await getRelatedFiles(api, 'f-1');

    expect(mock.history.get[0].url).toBe('api/files/f-1/related');
  });

  it('createFileRelationship: PUT api/files/:target/related/:related', async () => {
    mock.onPut('api/files/f-1/related/f-2').reply(204);

    await createFileRelationship(api, 'f-1', 'f-2');

    expect(mock.history.put).toHaveLength(1);
    expect(mock.history.put[0].url).toBe('api/files/f-1/related/f-2');
  });

  it('deleteFileRelationship: DELETE api/files/:target/related/:related', async () => {
    mock.onDelete('api/files/f-1/related/f-2').reply(204);

    await deleteFileRelationship(api, 'f-1', 'f-2');

    expect(mock.history.delete).toHaveLength(1);
    expect(mock.history.delete[0].url).toBe('api/files/f-1/related/f-2');
  });

  it('mergeFiles: POST api/files/:src/merge with target id as body', async () => {
    mock.onPost('api/files/src-1/merge').reply(200, { ok: true });

    await mergeFiles(api, 'src-1', 'tgt-1');

    expect(mock.history.post[0].url).toBe('api/files/src-1/merge');
    expect(mock.history.post[0].data).toBe('tgt-1');
  });

  it('updateFilesV2: POST /api/v2/files/:id/properties with body', async () => {
    mock.onPost('/api/v2/files/f-1/properties').reply(200, { ok: true });

    await updateFilesV2(api, 'f-1', 'payload');

    expect(mock.history.post[0].url).toBe('/api/v2/files/f-1/properties');
    expect(mock.history.post[0].data).toBe('payload');
  });
});
