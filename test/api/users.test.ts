import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  changeUserPassword,
  getCurrentUser,
  getCurrentUserData,
  getUserData,
} from '../../imageright/api/users';
import { createMockedApi } from '../helpers';

describe('users API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getCurrentUser: GET api/users/currentuser', async () => {
    mock.onGet('api/users/currentuser').reply(200, { ok: true });

    const result = await getCurrentUser(api);

    expect(mock.history.get[0].url).toBe('api/users/currentuser');
    expect(result).toEqual({ ok: true });
  });

  it('getCurrentUserData: GET api/users/currentuser/userdata', async () => {
    mock.onGet('api/users/currentuser/userdata').reply(200, { ok: true });

    await getCurrentUserData(api);

    expect(mock.history.get[0].url).toBe('api/users/currentuser/userdata');
  });

  it('getUserData: GET api/users/:userId/userdata', async () => {
    mock.onGet('api/users/u-1/userdata').reply(200, { id: 'u-1' });

    const result = await getUserData(api, 'u-1');

    expect(mock.history.get[0].url).toBe('api/users/u-1/userdata');
    expect(result).toEqual({ id: 'u-1' });
  });

  it('changeUserPassword: POST api/users/changepassword with body', async () => {
    mock.onPost('api/users/changepassword').reply(200, { ok: true });

    const body = { OldPassword: 'a', NewPassword: 'b' };
    await changeUserPassword(api, body);

    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].url).toBe('api/users/changepassword');
    expect(JSON.parse(mock.history.post[0].data)).toEqual(body);
  });
});
