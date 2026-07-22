import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { getContainers } from '../../imageright/api/containers';
import { createMockedApi } from '../helpers';

describe('containers API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getContainers: GET api/containers/:id?recursive=true when recursive is true', async () => {
    mock.onGet('api/containers/c-1?recursive=true').reply(200, []);

    await getContainers(api, 'c-1', true);

    expect(mock.history.get[0].url).toBe('api/containers/c-1?recursive=true');
  });

  it('getContainers: GET api/containers/:id?recursive=false when recursive is false', async () => {
    mock.onGet('api/containers/c-1?recursive=false').reply(200, []);

    await getContainers(api, 'c-1', false);

    expect(mock.history.get[0].url).toBe('api/containers/c-1?recursive=false');
  });
});
