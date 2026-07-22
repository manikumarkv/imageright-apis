import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getConcurrentLoginData,
  getMessages,
  login,
  logout,
  stillAlive,
  validateLicense,
} from '../../imageright/api/licensing';
import { createMockedApi } from '../helpers';

describe('licensing API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getConcurrentLoginData: GET api/licensing/:feature/currentlogindata', async () => {
    mock.onGet('api/licensing/feat-1/currentlogindata').reply(200, {});

    await getConcurrentLoginData(api, 'feat-1');

    expect(mock.history.get[0].url).toBe('api/licensing/feat-1/currentlogindata');
  });

  it('getMessages: GET api/licensing/:referenceKey', async () => {
    mock.onGet('api/licensing/ref-1').reply(200, []);

    await getMessages(api, 'ref-1');

    expect(mock.history.get[0].url).toBe('api/licensing/ref-1');
  });

  it('login: POST api/licensing/:programId/:feature/login', async () => {
    mock.onPost('api/licensing/prog-1/feat-1/login').reply(200, { loginId: 'l-1' });

    await login(api, 'prog-1', 'feat-1');

    expect(mock.history.post[0].url).toBe('api/licensing/prog-1/feat-1/login');
  });

  it('logout: POST api/licensing/:loginId/:feature/logout', async () => {
    mock.onPost('api/licensing/l-1/feat-1/logout').reply(200, { ok: true });

    await logout(api, 'l-1', 'feat-1');

    expect(mock.history.post[0].url).toBe('api/licensing/l-1/feat-1/logout');
  });

  it('stillAlive: POST api/licensing/:ref/:program/:feature/stillalive', async () => {
    mock.onPost('api/licensing/ref-1/prog-1/feat-1/stillalive').reply(200, { ok: true });

    await stillAlive(api, 'ref-1', 'prog-1', 'feat-1');

    expect(mock.history.post[0].url).toBe('api/licensing/ref-1/prog-1/feat-1/stillalive');
  });

  it('validateLicense: GET api/licensing/ValidateLicese/:feature', async () => {
    mock.onGet('api/licensing/ValidateLicese/feat-1').reply(200, { valid: true });

    await validateLicense(api, 'feat-1');

    expect(mock.history.get[0].url).toBe('api/licensing/ValidateLicese/feat-1');
  });
});
