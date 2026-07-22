import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  copyDocument,
  createDocument,
  deleteDocument,
  findDocuments,
  getDocumentById,
  moveDocument,
  moveDocumentV2,
  updateProperties,
} from '../../imageright/api/documents';
import { createMockedApi } from '../helpers';

describe('documents API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('createDocument: POST api/documents with body', async () => {
    mock.onPost('api/documents').reply(201, { id: 'd-1' });

    const body = { Name: 'doc' };
    const result = await createDocument(api, body);

    expect(mock.history.post[0].url).toBe('api/documents');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
    expect(result).toEqual({ id: 'd-1' });
  });

  it('findDocuments: POST api/documents/find with body', async () => {
    mock.onPost('api/documents/find').reply(200, []);

    const body = { FileId: 'f-1' };
    await findDocuments(api, body);

    expect(mock.history.post[0].url).toBe('api/documents/find');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
  });

  it('getDocumentById: GET api/documents/:id', async () => {
    mock.onGet('api/documents/d-1').reply(200, { id: 'd-1' });

    await getDocumentById(api, 'd-1');

    expect(mock.history.get[0].url).toBe('api/documents/d-1');
  });

  it('moveDocument (v1): POST api/documents/move with body', async () => {
    mock.onPost('api/documents/move').reply(200, { ok: true });

    const body = { DocumentId: 'd-1', TargetFolderId: 'fld-1' };
    await moveDocument(api, body);

    expect(mock.history.post[0].url).toBe('api/documents/move');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
  });

  it('updateProperties: POST api/documents/:id/properties with body', async () => {
    mock.onPost('api/documents/d-1/properties').reply(200, { ok: true });

    const body = { Name: 'renamed' };
    await updateProperties(api, 'd-1', body);

    expect(mock.history.post[0].url).toBe('api/documents/d-1/properties');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
  });

  it('copyDocument: POST api/v2/documents/copy with body', async () => {
    mock.onPost('api/v2/documents/copy').reply(200, { ok: true });

    const body = { SourceId: 'd-1' };
    await copyDocument(api, body);

    expect(mock.history.post[0].url).toBe('api/v2/documents/copy');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
  });

  it('deleteDocument: DELETE api/v2/documents/:id?force=true when force=true', async () => {
    mock.onDelete('api/v2/documents/d-1?force=true').reply(204);

    await deleteDocument(api, 'd-1', true);

    expect(mock.history.delete[0].url).toBe('api/v2/documents/d-1?force=true');
  });

  it('deleteDocument: DELETE api/v2/documents/:id when force=false', async () => {
    mock.onDelete('api/v2/documents/d-1').reply(204);

    await deleteDocument(api, 'd-1', false);

    expect(mock.history.delete[0].url).toBe('api/v2/documents/d-1');
  });

  it('moveDocumentV2: POST api/v2/documents/move with body', async () => {
    mock.onPost('api/v2/documents/move').reply(200, { ok: true });

    const body = { DocumentId: 'd-1' };
    await moveDocumentV2(api, body);

    expect(mock.history.post[0].url).toBe('api/v2/documents/move');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
  });
});
