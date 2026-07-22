import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  createTask,
  getPostTasks,
  getTaskAttributeById,
  getTaskAttributeByName,
  getTaskAttributes,
  getTasks,
  getTasksByFileId,
  getTasksByFileIdPost,
  killTask,
  lockTask,
  refreshTaskLock,
  releaseTask,
  releaseTaskByAnchor,
  releaseTaskSplitStep,
  routeTask,
  setTaskAttributeById,
  setTaskAttributeByName,
  unlockTask,
  updateTask,
} from '../../imageright/api/tasks';
import { createMockedApi } from '../helpers';

describe('tasks API — actions', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('killTask: POST api/tasks/:id/cancel', async () => {
    mock.onPost('api/tasks/t-1/cancel').reply(200, {});

    await killTask(api, 't-1');

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/cancel');
  });

  it('lockTask: POST api/tasks/:id/lock with no options', async () => {
    mock.onPost('api/tasks/t-1/lock').reply(200, {});

    await lockTask(api, 't-1');

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/lock');
  });

  it('lockTask: POST api/tasks/:id/lock?stepId=X&returnTask=true when both provided', async () => {
    mock.onPost('api/tasks/t-1/lock?stepId=s-1&returnTask=true').reply(200, {});

    await lockTask(api, 't-1', { stepId: 's-1', returnTask: true });

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/lock?stepId=s-1&returnTask=true');
  });

  it('refreshTaskLock: POST api/tasks/:id/refresh', async () => {
    mock.onPost('api/tasks/t-1/refresh').reply(200, {});

    await refreshTaskLock(api, 't-1');

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/refresh');
  });

  it('releaseTask: POST api/tasks/:id/release with query params', async () => {
    mock.onPost('api/tasks/t-1/release?destStepId=s-2&commit=true').reply(200, {});

    await releaseTask(api, 't-1', { destStepId: 's-2', commit: true });

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/release?destStepId=s-2&commit=true');
  });

  it('releaseTaskByAnchor: POST api/tasks/:id/release?anchor=... with all options', async () => {
    const url = 'api/tasks/t-1/release?anchor=a-1&userId=u-1&commit=true';
    mock.onPost(url).reply(200, {});

    await releaseTaskByAnchor(api, 't-1', 'a-1', { userId: 'u-1', commit: true });

    expect(mock.history.post[0].url).toBe(url);
  });

  it('releaseTaskSplitStep: POST api/tasks/:id/split with query params', async () => {
    mock.onPost('api/tasks/t-1/split?splitParams=raw&commit=true').reply(200, {});

    await releaseTaskSplitStep(api, 't-1', { splitParams: 'raw', commit: true });

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/split?splitParams=raw&commit=true');
  });

  it('routeTask: POST api/tasks/:id/route with all options', async () => {
    const url =
      'api/tasks/t-1/route?stepId=s-1&availableDate=2026-01-01&userId=u-1&extUserId=eu-1&commit=true';
    mock.onPost(url).reply(200, {});

    await routeTask(api, 't-1', {
      stepId: 's-1',
      availableDate: '2026-01-01',
      userId: 'u-1',
      extUserId: 'eu-1',
      commit: true,
    });

    expect(mock.history.post[0].url).toBe(url);
  });

  it('unlockTask: POST api/tasks/:id/unlock', async () => {
    mock.onPost('api/tasks/t-1/unlock').reply(200, {});

    await unlockTask(api, 't-1');

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/unlock');
  });
});

describe('tasks API — attributes', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('getTaskAttributeById: GET api/tasks/:tid/attributes/:id', async () => {
    mock.onGet('api/tasks/t-1/attributes/a-1').reply(200, { id: 'a-1' });

    await getTaskAttributeById(api, 't-1', 'a-1');

    expect(mock.history.get[0].url).toBe('api/tasks/t-1/attributes/a-1');
  });

  it('getTaskAttributeByName: GET api/tasks/:tid/attributes/:name', async () => {
    mock.onGet('api/tasks/t-1/attributes/Status').reply(200, {});

    await getTaskAttributeByName(api, 't-1', 'Status');

    expect(mock.history.get[0].url).toBe('api/tasks/t-1/attributes/Status');
  });

  it('getTaskAttributes: GET api/tasks/:tid/attributes', async () => {
    mock.onGet('api/tasks/t-1/attributes').reply(200, []);

    await getTaskAttributes(api, 't-1');

    expect(mock.history.get[0].url).toBe('api/tasks/t-1/attributes');
  });

  it('setTaskAttributeById: POST api/tasks/:tid/attributes/:id with body', async () => {
    mock.onPost('api/tasks/t-1/attributes/a-1').reply(200, {});

    await setTaskAttributeById(api, 't-1', 'a-1', { Value: 42 });

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/attributes/a-1');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Value: 42 });
  });

  it('setTaskAttributeByName: POST api/tasks/:tid/attributes/:name with body', async () => {
    mock.onPost('api/tasks/t-1/attributes/Status').reply(200, {});

    await setTaskAttributeByName(api, 't-1', 'Status', { Value: 'done' });

    expect(mock.history.post[0].url).toBe('api/tasks/t-1/attributes/Status');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Value: 'done' });
  });
});

describe('tasks API — queries', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('createTask: POST api/tasks/ with body', async () => {
    mock.onPost('api/tasks/').reply(201, { id: 't-1' });

    await createTask(api, { Name: 'x' });

    expect(mock.history.post[0].url).toBe('api/tasks/');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Name: 'x' });
  });

  it('getPostTasks: POST api/tasks/find with filter body (no paging)', async () => {
    mock.onPost('api/tasks/find').reply(200, []);

    await getPostTasks(api, { filter: { Status: 'open' } });

    expect(mock.history.post[0].url).toBe('api/tasks/find');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Status: 'open' });
  });

  it('getPostTasks: POST api/tasks/find?skip=X&top=Y with paging', async () => {
    mock.onPost('api/tasks/find?skip=5&top=10').reply(200, []);

    await getPostTasks(api, { filter: {}, skip: 5, top: 10 });

    expect(mock.history.post[0].url).toBe('api/tasks/find?skip=5&top=10');
  });

  it('getTasks: GET api/tasks with no options', async () => {
    mock.onGet('api/tasks').reply(200, []);

    await getTasks(api);

    expect(mock.history.get[0].url).toBe('api/tasks');
  });

  it('getTasks: GET api/tasks with a few filters and paging', async () => {
    const url = 'api/tasks?tasks=t-1,t-2&flows=f-1&skip=5&top=10';
    mock.onGet(url).reply(200, []);

    await getTasks(api, { tasks: 't-1,t-2', flows: 'f-1', skip: 5, top: 10 });

    expect(mock.history.get[0].url).toBe(url);
  });

  it('getTasksByFileId: GET api/files/:fid/tasks with filters', async () => {
    const url = 'api/files/f-1/tasks?tasks=t-1&top=10';
    mock.onGet(url).reply(200, []);

    await getTasksByFileId(api, 'f-1', { tasks: 't-1', top: 10 });

    expect(mock.history.get[0].url).toBe(url);
  });

  it('getTasksByFileIdPost: POST api/files/:fid/tasks with filter and paging', async () => {
    const url = 'api/files/f-1/tasks?skip=5&top=10';
    mock.onPost(url).reply(200, []);

    await getTasksByFileIdPost(api, 'f-1', { filter: { Status: 'open' }, skip: 5, top: 10 });

    expect(mock.history.post[0].url).toBe(url);
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Status: 'open' });
  });

  it('updateTask: POST api/tasks/:id with body', async () => {
    mock.onPost('api/tasks/t-1').reply(200, {});

    await updateTask(api, 't-1', { Name: 'renamed' });

    expect(mock.history.post[0].url).toBe('api/tasks/t-1');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Name: 'renamed' });
  });
});
