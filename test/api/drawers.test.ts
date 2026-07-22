import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getDrawerById,
  getDrawerByName,
  getDrawers,
  getDrawersInContainer,
  getDrawersInContainerByName,
} from '../../imageright/api/drawers';
import { createMockedApi } from '../helpers';

describe('drawers API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getDrawers: GET api/drawers, returns body', async () => {
    mock.onGet('api/drawers').reply(200, { ok: true });

    const result = await getDrawers(api);

    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].method).toBe('get');
    expect(mock.history.get[0].url).toBe('api/drawers');
    expect(result).toEqual({ ok: true });
  });

  it('getDrawerById: GET api/drawers/:id with interpolated id', async () => {
    mock.onGet('api/drawers/42').reply(200, { id: '42' });

    const result = await getDrawerById(api, '42');

    expect(mock.history.get[0].url).toBe('api/drawers/42');
    expect(result).toEqual({ id: '42' });
  });

  it('getDrawerByName: GET api/drawers/:name with interpolated name', async () => {
    mock.onGet('api/drawers/Claims').reply(200, { name: 'Claims' });

    const result = await getDrawerByName(api, 'Claims');

    expect(mock.history.get[0].url).toBe('api/drawers/Claims');
    expect(result).toEqual({ name: 'Claims' });
  });

  it('getDrawersInContainer: GET api/containers/:cid/drawers', async () => {
    mock.onGet('api/containers/c-1/drawers').reply(200, []);

    await getDrawersInContainer(api, 'c-1');

    expect(mock.history.get[0].url).toBe('api/containers/c-1/drawers');
  });

  it('getDrawersInContainerByName: GET api/containers/:cid/drawers/:name', async () => {
    mock.onGet('api/containers/c-1/drawers/Claims').reply(200, []);

    await getDrawersInContainerByName(api, 'c-1', 'Claims');

    expect(mock.history.get[0].url).toBe('api/containers/c-1/drawers/Claims');
  });
});
