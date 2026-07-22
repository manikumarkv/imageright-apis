import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  findVapTasks,
  findVapTasksByClientId,
  getClientFiles,
  getPolicyFolder,
  getVersion,
} from '../../imageright/api/integration';
import { createMockedApi } from '../helpers';

describe('integration API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('findVapTasks: POST api/integration/vap/tasks/find without query when no paging', async () => {
    mock.onPost('api/integration/vap/tasks/find').reply(200, []);

    const filter = { toJSON: () => ({ Status: 'open' }) };
    await findVapTasks(api, filter);

    expect(mock.history.post[0].url).toBe('api/integration/vap/tasks/find');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Status: 'open' });
  });

  it('findVapTasks: POST with ?skip=X&top=Y query when both given', async () => {
    mock.onPost('api/integration/vap/tasks/find?skip=10&top=20').reply(200, []);

    const filter = { toJSON: () => ({}) };
    await findVapTasks(api, filter, 10, 20);

    expect(mock.history.post[0].url).toBe('api/integration/vap/tasks/find?skip=10&top=20');
  });

  it('findVapTasksByClientId: POST api/integration/vap/client/:cid/tasks/find with all optional params', async () => {
    const url = 'api/integration/vap/client/c-1/tasks/find?skip=5&top=10&includeDeletedFiles=true';
    mock.onPost(url).reply(200, []);

    const filter = { toJSON: () => ({}) };
    await findVapTasksByClientId(api, 'c-1', filter, 5, 10, true);

    expect(mock.history.post[0].url).toBe(url);
  });

  it('getClientFiles: GET api/integration/vap/files/client/:cid (no query)', async () => {
    mock.onGet('api/integration/vap/files/client/c-1').reply(200, []);

    await getClientFiles(api, 'c-1');

    expect(mock.history.get[0].url).toBe('api/integration/vap/files/client/c-1');
  });

  it('getClientFiles: GET with ?includeDeletedFiles=true', async () => {
    mock.onGet('api/integration/vap/files/client/c-1?includeDeletedFiles=true').reply(200, []);

    await getClientFiles(api, 'c-1', true);

    expect(mock.history.get[0].url).toBe(
      'api/integration/vap/files/client/c-1?includeDeletedFiles=true',
    );
  });

  it('getPolicyFolder: GET api/integration/vap/files/policy/:pid', async () => {
    mock.onGet('api/integration/vap/files/policy/p-1').reply(200, {});

    await getPolicyFolder(api, 'p-1');

    expect(mock.history.get[0].url).toBe('api/integration/vap/files/policy/p-1');
  });

  it('getVersion: GET api/integration/vap/version', async () => {
    mock.onGet('api/integration/vap/version').reply(200, { version: '1.0' });

    const result = await getVersion(api);

    expect(mock.history.get[0].url).toBe('api/integration/vap/version');
    expect(result).toEqual({ version: '1.0' });
  });
});
