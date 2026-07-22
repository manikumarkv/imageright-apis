import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { authenticate } from '../../imageright/api/authentication';
import { BASE_URL } from '../helpers';

const mock = new MockAdapter(axios);

afterEach(() => mock.reset());

describe('authenticate', () => {
  it('POSTs {UserName, Password} to api/authenticate and returns { AccessToken }', async () => {
    mock.onPost(`${BASE_URL}/api/authenticate`).reply(200, 'stub-token');

    const result = await authenticate(BASE_URL, 'alice', 'p@ss');

    expect(mock.history.post).toHaveLength(1);
    const req = mock.history.post[0];
    expect(req.url).toBe('api/authenticate');
    expect(req.baseURL).toBe(BASE_URL);
    expect(JSON.parse(req.data)).toEqual({ UserName: 'alice', Password: 'p@ss' });
    expect(result).toEqual({ AccessToken: 'stub-token' });
  });

  it('propagates HTTP errors from the server', async () => {
    mock.onPost(`${BASE_URL}/api/authenticate`).reply(401, 'Unauthorized');

    await expect(authenticate(BASE_URL, 'alice', 'wrong')).rejects.toThrow();
  });
});
