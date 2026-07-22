import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getAccount,
  getAccountGroups,
  getAllAccounts,
  getCurrentUserAccount,
  getCurrentUserGroups,
} from '../../imageright/api/accounts';
import { createMockedApi } from '../helpers';

describe('accounts API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getAccount: GET api/accounts/:id without query when type is omitted', async () => {
    mock.onGet('api/accounts/a-1').reply(200, { id: 'a-1' });

    const result = await getAccount(api, 'a-1');

    expect(mock.history.get[0].url).toBe('api/accounts/a-1');
    expect(result).toEqual({ id: 'a-1' });
  });

  it('getAccount: GET api/accounts/:id?type=X when type is provided', async () => {
    mock.onGet('api/accounts/a-1?type=user').reply(200, { id: 'a-1' });

    await getAccount(api, 'a-1', 'user');

    expect(mock.history.get[0].url).toBe('api/accounts/a-1?type=user');
  });

  it('getAccountGroups: GET api/accounts/:id/groups', async () => {
    mock.onGet('api/accounts/a-1/groups').reply(200, []);

    await getAccountGroups(api, 'a-1');

    expect(mock.history.get[0].url).toBe('api/accounts/a-1/groups');
  });

  it('getAllAccounts: GET api/accounts', async () => {
    mock.onGet('api/accounts').reply(200, []);

    await getAllAccounts(api);

    expect(mock.history.get[0].url).toBe('api/accounts');
  });

  it('getCurrentUserAccount: GET api/accounts/current', async () => {
    mock.onGet('api/accounts/current').reply(200, { ok: true });

    await getCurrentUserAccount(api);

    expect(mock.history.get[0].url).toBe('api/accounts/current');
  });

  it('getCurrentUserGroups: GET api/accounts/current/groups', async () => {
    mock.onGet('api/accounts/current/groups').reply(200, []);

    await getCurrentUserGroups(api);

    expect(mock.history.get[0].url).toBe('api/accounts/current/groups');
  });
});
