import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  createInstances,
  getInstanceChildren,
  getParentPath,
} from '../../imageright/api/instances';
import { createMockedApi } from '../helpers';

describe('instances API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('createInstances: POST api/instances/:id/children with toJSON() body', async () => {
    mock.onPost('api/instances/i-1/children').reply(201, { ok: true });

    const inst = { toJSON: () => ({ Name: 'child' }) };
    await createInstances(api, 'i-1', inst);

    expect(mock.history.post[0].url).toBe('api/instances/i-1/children');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Name: 'child' });
  });

  it('getInstanceChildren: GET api/instances/:id/children', async () => {
    mock.onGet('api/instances/i-1/children').reply(200, []);

    await getInstanceChildren(api, 'i-1');

    expect(mock.history.get[0].url).toBe('api/instances/i-1/children');
  });

  it('getParentPath: GET api/instances/getparentpath?id=:id&isContainer=:v', async () => {
    mock.onGet('api/instances/getparentpath?id=i-1&isContainer=true').reply(200, {});

    await getParentPath(api, 'i-1', true);

    expect(mock.history.get[0].url).toBe(
      'api/instances/getparentpath?id=i-1&isContainer=true',
    );
  });
});
