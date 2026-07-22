import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getAttributeById,
  getAttributeByName,
  getAttributeByObject,
} from '../../imageright/api/attributes';
import { createMockedApi } from '../helpers';

describe('attributes API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getAttributeById: GET api/objects/:objId/attributes/:attId', async () => {
    mock.onGet('api/objects/o-1/attributes/a-1').reply(200, { id: 'a-1' });

    const result = await getAttributeById(api, 'o-1', 'a-1');

    expect(mock.history.get[0].url).toBe('api/objects/o-1/attributes/a-1');
    expect(result).toEqual({ id: 'a-1' });
  });

  it('getAttributeByName: GET api/objects/:objId/attributes/name/:name', async () => {
    mock.onGet('api/objects/o-1/attributes/name/Status').reply(200, { name: 'Status' });

    await getAttributeByName(api, 'o-1', 'Status');

    expect(mock.history.get[0].url).toBe('api/objects/o-1/attributes/name/Status');
  });

  it('getAttributeByObject: GET api/objects/:objId/attributes', async () => {
    mock.onGet('api/objects/o-1/attributes').reply(200, []);

    await getAttributeByObject(api, 'o-1');

    expect(mock.history.get[0].url).toBe('api/objects/o-1/attributes');
  });
});
