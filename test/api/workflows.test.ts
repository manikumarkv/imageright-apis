import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  getDefaultStepLink,
  getPriorityList,
  getSplitLinkParameters,
  getStepAttributeById,
  getStepAttributeByName,
  getStepAttributes,
  getStepLinks,
  getSteps,
  getUsersToAssign,
  getWorkflows,
} from '../../imageright/api/workflows';
import { createMockedApi } from '../helpers';

describe('workflows API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getDefaultStepLink: GET api/steps/:sid/links/default with no options', async () => {
    mock.onGet('api/steps/s-1/links/default').reply(200, {});

    await getDefaultStepLink(api, 's-1');

    expect(mock.history.get[0].url).toBe('api/steps/s-1/links/default');
  });

  it('getDefaultStepLink: GET with ?isDefault=true&status=active', async () => {
    mock.onGet('api/steps/s-1/links/default?isDefault=true&status=active').reply(200, {});

    await getDefaultStepLink(api, 's-1', { isDefault: true, status: 'active' });

    expect(mock.history.get[0].url).toBe(
      'api/steps/s-1/links/default?isDefault=true&status=active',
    );
  });

  it('getPriorityList: GET api/steps/:sid/priorities', async () => {
    mock.onGet('api/steps/s-1/priorities').reply(200, []);

    await getPriorityList(api, 's-1');

    expect(mock.history.get[0].url).toBe('api/steps/s-1/priorities');
  });

  it('getSplitLinkParameters: GET api/steps/:sid/splitparams with ?isDebug=true', async () => {
    mock.onGet('api/steps/s-1/splitparams?isDebug=true').reply(200, {});

    await getSplitLinkParameters(api, 's-1', { isDebug: true });

    expect(mock.history.get[0].url).toBe('api/steps/s-1/splitparams?isDebug=true');
  });

  it('getStepAttributeById: GET api/steps/:sid/attributes/:id', async () => {
    mock.onGet('api/steps/s-1/attributes/a-1').reply(200, {});

    await getStepAttributeById(api, 's-1', 'a-1');

    expect(mock.history.get[0].url).toBe('api/steps/s-1/attributes/a-1');
  });

  it('getStepAttributeByName: GET api/steps/:sid/attributes/:name', async () => {
    mock.onGet('api/steps/s-1/attributes/Status').reply(200, {});

    await getStepAttributeByName(api, 's-1', 'Status');

    expect(mock.history.get[0].url).toBe('api/steps/s-1/attributes/Status');
  });

  it('getStepAttributes: GET api/steps/:sid/attributes', async () => {
    mock.onGet('api/steps/s-1/attributes').reply(200, []);

    await getStepAttributes(api, 's-1');

    expect(mock.history.get[0].url).toBe('api/steps/s-1/attributes');
  });

  it('getStepLinks: GET api/steps/:sid/links with targetStepId and status query', async () => {
    mock.onGet('api/steps/s-1/links?targetStepId=s-2&status=active').reply(200, []);

    await getStepLinks(api, 's-1', { targetStepId: 's-2', status: 'active' });

    expect(mock.history.get[0].url).toBe('api/steps/s-1/links?targetStepId=s-2&status=active');
  });

  it('getSteps: GET api/workflows/:fid/steps with includeBuddies and flag', async () => {
    mock.onGet('api/workflows/f-1/steps?includeBuddies=true&flag=X').reply(200, []);

    await getSteps(api, 'f-1', { includeBuddies: true, flag: 'X' });

    expect(mock.history.get[0].url).toBe('api/workflows/f-1/steps?includeBuddies=true&flag=X');
  });

  it('getUsersToAssign: GET api/steps/:sid/users', async () => {
    mock.onGet('api/steps/s-1/users').reply(200, []);

    await getUsersToAssign(api, 's-1');

    expect(mock.history.get[0].url).toBe('api/steps/s-1/users');
  });

  it('getWorkflows: GET api/workflows (no options)', async () => {
    mock.onGet('api/workflows').reply(200, []);

    await getWorkflows(api);

    expect(mock.history.get[0].url).toBe('api/workflows');
  });

  it('getWorkflows: GET api/workflows?includeBuddies=true', async () => {
    mock.onGet('api/workflows?includeBuddies=true').reply(200, []);

    await getWorkflows(api, { includeBuddies: true });

    expect(mock.history.get[0].url).toBe('api/workflows?includeBuddies=true');
  });
});
