import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const BASE_URL = 'https://ir.test';

/**
 * Build a fresh AxiosInstance + attached MockAdapter for a single test.
 * Callers own both — call `mock.reset()` in `afterEach` or discard between tests.
 */
export function createMockedApi(): { api: AxiosInstance; mock: MockAdapter } {
  const api = axios.create({ baseURL: BASE_URL });
  const mock = new MockAdapter(api);
  return { api, mock };
}
