import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getAllowedTypes,
  getAllowedTypesForContainer,
  getAttributeDefinitionsForType,
  getFileTypeExtensions,
  getFileTypeTemplate,
  getObjectType,
  getSortOptionsForType,
  getTypesForClass,
} from '../../imageright/api/objecttypes';
import { createMockedApi } from '../helpers';

describe('objecttypes API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getAllowedTypes: GET api/objecttypes/allowedtypes?typeId=:id', async () => {
    mock.onGet('api/objecttypes/allowedtypes?typeId=t-1').reply(200, []);

    await getAllowedTypes(api, 't-1');

    expect(mock.history.get[0].url).toBe('api/objecttypes/allowedtypes?typeId=t-1');
  });

  it('getAllowedTypesForContainer: GET api/containers/:oid/allowedtypes', async () => {
    mock.onGet('api/containers/o-1/allowedtypes').reply(200, []);

    await getAllowedTypesForContainer(api, 'o-1');

    expect(mock.history.get[0].url).toBe('api/containers/o-1/allowedtypes');
  });

  it('getAttributeDefinitionsForType: GET api/objecttypes/:id/attributes', async () => {
    mock.onGet('api/objecttypes/t-1/attributes').reply(200, []);

    await getAttributeDefinitionsForType(api, 't-1');

    expect(mock.history.get[0].url).toBe('api/objecttypes/t-1/attributes');
  });

  it('getFileTypeExtensions: GET api/objecttypes/:id/extensions', async () => {
    mock.onGet('api/objecttypes/ft-1/extensions').reply(200, []);

    await getFileTypeExtensions(api, 'ft-1');

    expect(mock.history.get[0].url).toBe('api/objecttypes/ft-1/extensions');
  });

  it('getFileTypeTemplate: GET api/objecttypes/:id/template', async () => {
    mock.onGet('api/objecttypes/ft-1/template').reply(200, {});

    await getFileTypeTemplate(api, 'ft-1');

    expect(mock.history.get[0].url).toBe('api/objecttypes/ft-1/template');
  });

  it('getObjectType: GET api/objecttypes/:id', async () => {
    mock.onGet('api/objecttypes/t-1').reply(200, { id: 't-1' });

    await getObjectType(api, 't-1');

    expect(mock.history.get[0].url).toBe('api/objecttypes/t-1');
  });

  it('getSortOptionsForType: GET api/objecttypes/:id/sortoptions', async () => {
    mock.onGet('api/objecttypes/t-1/sortoptions').reply(200, []);

    await getSortOptionsForType(api, 't-1');

    expect(mock.history.get[0].url).toBe('api/objecttypes/t-1/sortoptions');
  });

  it('getTypesForClass: GET api/objecttypes/:cls', async () => {
    mock.onGet('api/objecttypes/Document').reply(200, []);

    await getTypesForClass(api, 'Document');

    expect(mock.history.get[0].url).toBe('api/objecttypes/Document');
  });
});
