import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getDocumentOverlayInfo,
  getOverlayImage,
} from '../../imageright/api/overlays';
import { createMockedApi } from '../helpers';

describe('overlays API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getDocumentOverlayInfo: GET api/documents/:id/overlayInfo', async () => {
    mock.onGet('api/documents/d-1/overlayInfo').reply(200, {});

    await getDocumentOverlayInfo(api, 'd-1');

    expect(mock.history.get[0].url).toBe('api/documents/d-1/overlayInfo');
  });

  it('getOverlayImage: GET api/overlays/:oid?overlayImageId=:iid', async () => {
    mock.onGet('api/overlays/ov-1?overlayImageId=img-1').reply(200, {});

    await getOverlayImage(api, 'ov-1', 'img-1');

    expect(mock.history.get[0].url).toBe('api/overlays/ov-1?overlayImageId=img-1');
  });
});
