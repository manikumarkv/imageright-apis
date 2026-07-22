import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getFileMarkDefinitions,
  getFileMarkDefinitionsByFileTypeId,
  getFileMarkDefinitionsByFileTypeIdV2,
  getFileMarkDefinitionsV2,
  getImageDataForFileMark,
  getImageDataForPageMark,
  getMarksForFile,
  getMarksForPage,
} from '../../imageright/api/marks';
import { createMockedApi } from '../helpers';

describe('marks API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getFileMarkDefinitions: GET api/marks', async () => {
    mock.onGet('api/marks').reply(200, []);

    await getFileMarkDefinitions(api);

    expect(mock.history.get[0].url).toBe('api/marks');
  });

  it('getFileMarkDefinitionsByFileTypeId: GET api/marks?fileTypeId=:id', async () => {
    mock.onGet('api/marks?fileTypeId=ft-1').reply(200, []);

    await getFileMarkDefinitionsByFileTypeId(api, 'ft-1');

    expect(mock.history.get[0].url).toBe('api/marks?fileTypeId=ft-1');
  });

  it('getFileMarkDefinitionsByFileTypeIdV2: GET api/v2/objectypes/:id/filemarks', async () => {
    mock.onGet('api/v2/objectypes/ft-1/filemarks').reply(200, []);

    await getFileMarkDefinitionsByFileTypeIdV2(api, 'ft-1');

    expect(mock.history.get[0].url).toBe('api/v2/objectypes/ft-1/filemarks');
  });

  it('getFileMarkDefinitionsV2: GET api/v2/filemarks', async () => {
    mock.onGet('api/v2/filemarks').reply(200, []);

    await getFileMarkDefinitionsV2(api);

    expect(mock.history.get[0].url).toBe('api/v2/filemarks');
  });

  it('getImageDataForFileMark: GET api/v2/filemarks/:id/image', async () => {
    mock.onGet('api/v2/filemarks/m-1/image').reply(200, {});

    await getImageDataForFileMark(api, 'm-1');

    expect(mock.history.get[0].url).toBe('api/v2/filemarks/m-1/image');
  });

  it('getImageDataForPageMark: GET api/v2/pagemarks/:id/image', async () => {
    mock.onGet('api/v2/pagemarks/m-1/image').reply(200, {});

    await getImageDataForPageMark(api, 'm-1');

    expect(mock.history.get[0].url).toBe('api/v2/pagemarks/m-1/image');
  });

  it('getMarksForFile: GET api/v2/files/:id/marks', async () => {
    mock.onGet('api/v2/files/f-1/marks').reply(200, []);

    await getMarksForFile(api, 'f-1');

    expect(mock.history.get[0].url).toBe('api/v2/files/f-1/marks');
  });

  it('getMarksForPage: GET api/v2/pages/:id/marks', async () => {
    mock.onGet('api/v2/pages/p-1/marks').reply(200, []);

    await getMarksForPage(api, 'p-1');

    expect(mock.history.get[0].url).toBe('api/v2/pages/p-1/marks');
  });
});
