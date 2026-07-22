import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import Library from '../index';
import { BASE_URL } from './helpers';

const mock = new MockAdapter(axios);

afterEach(() => mock.reset());

describe('Library', () => {
  it('createAPI: builds an ImageRight instance from a supplied AccessToken', async () => {
    const lib = new Library(BASE_URL);
    const api = await lib.createAPI({ AccessToken: 'stub-token' });

    expect(api).toBeDefined();
    expect(typeof api.getDrawers).toBe('function');
  });

  it('connect: authenticates then returns a usable ImageRight instance', async () => {
    mock.onPost(`${BASE_URL}/api/authenticate`).reply(200, 'stub-token');

    const lib = new Library(BASE_URL);
    const api = await lib.connect('alice', 'p@ss');

    expect(api).toBeDefined();
    expect(typeof api.getDrawers).toBe('function');
    expect(mock.history.post).toHaveLength(1);
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      UserName: 'alice',
      Password: 'p@ss',
    });
  });

  it('connect: rejects when authenticate fails', async () => {
    mock.onPost(`${BASE_URL}/api/authenticate`).reply(401);

    const lib = new Library(BASE_URL);
    await expect(lib.connect('alice', 'wrong')).rejects.toThrow();
  });
});
