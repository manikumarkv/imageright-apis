import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  checkReadPermissions,
  copyPage,
  createPage,
  createPageV2,
  getAllPagesFromDocument,
  getPageById,
  getPageImageMetadata,
  lockPage,
  mergeToDocument,
  movePage,
  movePageV2,
  rotatePage,
  unlockPage,
  updatePageContent,
  updatePageContentV2,
  updatePageProperties,
} from '../../imageright/api/pages';
import { createMockedApi } from '../helpers';

describe('pages API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('checkReadPermissions: GET api/pages/:id/readpermissions', async () => {
    mock.onGet('api/pages/p-1/readpermissions').reply(200, { ok: true });

    await checkReadPermissions(api, 'p-1');

    expect(mock.history.get[0].url).toBe('api/pages/p-1/readpermissions');
  });

  it('createPage: POST api/pages with formdata body and custom headers', async () => {
    mock.onPost('api/pages').reply(201, { id: 'p-1' });

    const content = { formdata: 'raw-body', headers: { 'Content-Type': 'multipart/form-data' } };
    await createPage(api, content);

    expect(mock.history.post[0].url).toBe('api/pages');
    expect(mock.history.post[0].data).toBe('raw-body');
    expect(mock.history.post[0].headers?.['Content-Type']).toBe('multipart/form-data');
  });

  it('getAllPagesFromDocument: GET api/documents/:id/pages', async () => {
    mock.onGet('api/documents/d-1/pages').reply(200, []);

    await getAllPagesFromDocument(api, 'd-1');

    expect(mock.history.get[0].url).toBe('api/documents/d-1/pages');
  });

  it('getPageById: GET api/pages/:id', async () => {
    mock.onGet('api/pages/p-1').reply(200, { id: 'p-1' });

    await getPageById(api, 'p-1');

    expect(mock.history.get[0].url).toBe('api/pages/p-1');
  });

  it('getPageImageMetadata: GET api/pages/:id/imagemetadata', async () => {
    mock.onGet('api/pages/p-1/imagemetadata').reply(200, {});

    await getPageImageMetadata(api, 'p-1');

    expect(mock.history.get[0].url).toBe('api/pages/p-1/imagemetadata');
  });

  it('lockPage: GET api/pages/:id/lock', async () => {
    mock.onGet('api/pages/p-1/lock').reply(200, { ok: true });

    await lockPage(api, 'p-1');

    expect(mock.history.get[0].url).toBe('api/pages/p-1/lock');
  });

  it('movePage: POST api/pages/move with toJSON() body', async () => {
    mock.onPost('api/pages/move').reply(200, { ok: true });

    const move = { toJSON: () => ({ PageId: 'p-1' }) };
    await movePage(api, move);

    expect(mock.history.post[0].url).toBe('api/pages/move');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ PageId: 'p-1' });
  });

  it('rotatePage: POST api/pages/:id/rotate?rotationAngle=N', async () => {
    mock.onPost('api/pages/p-1/rotate?rotationAngle=90').reply(200, { ok: true });

    await rotatePage(api, 'p-1', 90);

    expect(mock.history.post[0].url).toBe('api/pages/p-1/rotate?rotationAngle=90');
  });

  it('unlockPage: GET api/pages/:id/unlock', async () => {
    mock.onGet('api/pages/p-1/unlock').reply(200, {});

    await unlockPage(api, 'p-1');

    expect(mock.history.get[0].url).toBe('api/pages/p-1/unlock');
  });

  it('updatePageContent: POST api/pages/:id/content with body', async () => {
    mock.onPost('api/pages/p-1/content').reply(200, {});

    await updatePageContent(api, 'p-1', 'raw-content');

    expect(mock.history.post[0].url).toBe('api/pages/p-1/content');
    expect(mock.history.post[0].data).toBe('raw-content');
  });

  it('updatePageProperties: POST api/pages/:id/properties with body', async () => {
    mock.onPost('api/pages/p-1/properties').reply(200, {});

    const props = { Name: 'x' };
    await updatePageProperties(api, 'p-1', props);

    expect(mock.history.post[0].url).toBe('api/pages/p-1/properties');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(props);
  });

  it('copyPage: POST api/v2/pages/copy with toJSON() body', async () => {
    mock.onPost('api/v2/pages/copy').reply(200, {});

    const cp = { toJSON: () => ({ PageId: 'p-1' }) };
    await copyPage(api, cp);

    expect(mock.history.post[0].url).toBe('api/v2/pages/copy');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ PageId: 'p-1' });
  });

  it('createPageV2: POST api/v2/pages with formdata, headers, and params', async () => {
    mock.onPost('api/v2/pages').reply(201, { id: 'p-1' });

    const content = { formdata: 'body', headers: { 'X-Foo': 'bar' } };
    const params = { targetPageId: 't-1', before: 'true' };
    await createPageV2(api, content, params);

    expect(mock.history.post[0].url).toBe('api/v2/pages');
    expect(mock.history.post[0].data).toBe('body');
    expect(mock.history.post[0].headers?.['X-Foo']).toBe('bar');
    expect(mock.history.post[0].params).toEqual(params);
  });

  it('mergeToDocument: POST api/v2/pages/merge with toJSON() body', async () => {
    mock.onPost('api/v2/pages/merge').reply(200, {});

    const merge = { toJSON: () => ({ TargetDocumentId: 'd-1' }) };
    await mergeToDocument(api, merge);

    expect(mock.history.post[0].url).toBe('api/v2/pages/merge');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ TargetDocumentId: 'd-1' });
  });

  it('movePageV2: POST api/v2/pages/move with toJSON() body', async () => {
    mock.onPost('api/v2/pages/move').reply(200, {});

    const move = { toJSON: () => ({ PageId: 'p-1' }) };
    await movePageV2(api, move);

    expect(mock.history.post[0].url).toBe('api/v2/pages/move');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ PageId: 'p-1' });
  });

  it('updatePageContentV2: POST api/v2/pages/:id/content with body', async () => {
    mock.onPost('api/v2/pages/p-1/content').reply(200, {});

    await updatePageContentV2(api, 'p-1', 'body');

    expect(mock.history.post[0].url).toBe('api/v2/pages/p-1/content');
    expect(mock.history.post[0].data).toBe('body');
  });
});
