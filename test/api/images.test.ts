import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { getImageById, getImageByIdV2 } from '../../imageright/api/images';
import { createMockedApi } from '../helpers';

describe('images API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getImageById: GET api/images/:id?version=N with arraybuffer responseType', async () => {
    mock.onGet('api/images/img-1?version=2').reply(200, new ArrayBuffer(4));

    await getImageById(api, 'img-1', 2);

    expect(mock.history.get[0].url).toBe('api/images/img-1?version=2');
    expect(mock.history.get[0].responseType).toBe('arraybuffer');
  });

  it('getImageById: defaults to ?version=0 when version is 0/undefined', async () => {
    mock.onGet('api/images/img-1?version=0').reply(200, new ArrayBuffer(4));

    await getImageById(api, 'img-1', 0);

    expect(mock.history.get[0].url).toBe('api/images/img-1?version=0');
  });

  it('getImageByIdV2: GET api/v2/pages/:pid/images/:iid/:v with arraybuffer responseType', async () => {
    mock.onGet('api/v2/pages/p-1/images/img-1/3').reply(200, new ArrayBuffer(4));

    await getImageByIdV2(api, 'p-1', 'img-1', 3);

    expect(mock.history.get[0].url).toBe('api/v2/pages/p-1/images/img-1/3');
    expect(mock.history.get[0].responseType).toBe('arraybuffer');
  });

  it('getImageByIdV2: defaults version to 0', async () => {
    mock.onGet('api/v2/pages/p-1/images/img-1/0').reply(200, new ArrayBuffer(4));

    await getImageByIdV2(api, 'p-1', 'img-1', 0);

    expect(mock.history.get[0].url).toBe('api/v2/pages/p-1/images/img-1/0');
  });
});
