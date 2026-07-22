import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { createBatch } from '../../imageright/api/batches';
import { createMockedApi } from '../helpers';

describe('batches API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('createBatch: POST api/batches with body', async () => {
    mock.onPost('api/batches').reply(201, { id: 'b-1' });

    const body = { name: 'batch1', description: 'test batch' };
    const result = await createBatch(api, body);

    expect(mock.history.post[0].url).toBe('api/batches');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
    expect(result).toEqual({ id: 'b-1' });
  });
});
