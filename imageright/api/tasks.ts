import { AxiosInstance } from 'axios';

// TaskActions

export function killTask(api: AxiosInstance, taskId: string): Promise<any> {
  return api.post(`api/tasks/${taskId}/cancel`).then((res) => Promise.resolve(res.data));
}

interface LockTaskOptions {
  stepId?: string;
  returnTask?: boolean;
}

export function lockTask(api: AxiosInstance, taskId: string, options: LockTaskOptions = {}): Promise<any> {
  const { stepId, returnTask } = options;
  const qstrs: string[] = [];
  if (stepId) qstrs.push(`stepId=${stepId}`);
  if (returnTask) qstrs.push(`returnTask=${returnTask}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.post(`api/tasks/${taskId}/lock${qstr}`).then((res) => Promise.resolve(res.data));
}

export function refreshTaskLock(api: AxiosInstance, taskId: string): Promise<any> {
  return api.post(`api/tasks/${taskId}/refresh`).then((res) => Promise.resolve(res.data));
}

interface ReleaseTaskOptions {
  destStepId?: string;
  commit?: boolean;
}

export function releaseTask(api: AxiosInstance, taskId: string, options: ReleaseTaskOptions = {}): Promise<any> {
  const { destStepId, commit } = options;
  const qstrs: string[] = [];
  if (destStepId) qstrs.push(`destStepId=${destStepId}`);
  if (commit) qstrs.push(`commit=${commit}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.post(`api/tasks/${taskId}/release${qstr}`).then((res) => Promise.resolve(res.data));
}

interface ReleaseTaskByAnchorOptions {
  userId?: string;
  commit?: boolean;
}

export function releaseTaskByAnchor(
  api: AxiosInstance,
  taskId: string,
  anchor: string,
  options: ReleaseTaskByAnchorOptions = {}
): Promise<any> {
  const { userId, commit } = options;
  const qstrs: string[] = [];
  if (anchor) qstrs.push(`anchor=${anchor}`);
  if (userId) qstrs.push(`userId=${userId}`);
  if (commit) qstrs.push(`commit=${commit}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.post(`api/tasks/${taskId}/release${qstr}`).then((res) => Promise.resolve(res.data));
}

interface ReleaseTaskSplitStepOptions {
  splitParams?: string;
  commit?: boolean;
}

export function releaseTaskSplitStep(api: AxiosInstance, taskId: string, options: ReleaseTaskSplitStepOptions = {}): Promise<any> {
  const { splitParams, commit } = options;
  const qstrs: string[] = [];
  if (splitParams) qstrs.push(`splitParams=${splitParams}`);
  if (commit) qstrs.push(`commit=${commit}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.post(`api/tasks/${taskId}/split${qstr}`).then((res) => Promise.resolve(res.data));
}

interface RouteTaskOptions {
  stepId?: string;
  availableDate?: string;
  userId?: string;
  extUserId?: string;
  commit?: boolean;
}

export function routeTask(api: AxiosInstance, taskId: string, options: RouteTaskOptions = {}): Promise<any> {
  const { stepId, availableDate, userId, extUserId, commit } = options;
  const qstrs: string[] = [];
  if (stepId) qstrs.push(`stepId=${stepId}`);
  if (availableDate) qstrs.push(`availableDate=${availableDate}`);
  if (userId) qstrs.push(`userId=${userId}`);
  if (extUserId) qstrs.push(`extUserId=${extUserId}`);
  if (commit) qstrs.push(`commit=${commit}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.post(`api/tasks/${taskId}/route${qstr}`).then((res) => Promise.resolve(res.data));
}

export function unlockTask(api: AxiosInstance, taskId: string): Promise<any> {
  return api.post(`api/tasks/${taskId}/unlock`).then((res) => Promise.resolve(res.data));
}

// TaskAttributes

export function getTaskAttributeById(api: AxiosInstance, taskId: string, id: string): Promise<any> {
  return api.get(`api/tasks/${taskId}/attributes/${id}`).then((res) => Promise.resolve(res.data));
}

export function getTaskAttributeByName(api: AxiosInstance, taskId: string, name: string): Promise<any> {
  return api.get(`api/tasks/${taskId}/attributes/${name}`).then((res) => Promise.resolve(res.data));
}

export function getTaskAttributes(api: AxiosInstance, taskId: string): Promise<any> {
  return api.get(`api/tasks/${taskId}/attributes`).then((res) => Promise.resolve(res.data));
}

export function setTaskAttributeById(api: AxiosInstance, taskId: string, id: string, content: any): Promise<any> {
  return api
    .post(`api/tasks/${taskId}/attributes/${id}`, content)
    .then((res) => Promise.resolve(res.data));
}

export function setTaskAttributeByName(api: AxiosInstance, taskId: string, name: string, content: any): Promise<any> {
  return api
    .post(`api/tasks/${taskId}/attributes/${name}`, content)
    .then((res) => Promise.resolve(res.data));
}

// Tasks

export function createTask(api: AxiosInstance, content: any): Promise<any> {
  return api.post('api/tasks/', content).then((res) => Promise.resolve(res.data));
}

interface GetPostTasksOptions {
  filter?: any;
  skip?: number;
  top?: number;
}

export function getPostTasks(api: AxiosInstance, options: GetPostTasksOptions = {}): Promise<any> {
  const { filter, skip, top } = options;
  const qstrs: string[] = [];
  if (skip) qstrs.push(`skip=${skip}`);
  if (top) qstrs.push(`top=${top}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.post(`api/tasks/find${qstr}`, filter).then((res) => Promise.resolve(res.data));
}

interface GetTasksOptions {
  tasks?: string;
  availableDateStart?: string;
  availableDateEnd?: string;
  flows?: string;
  excludeFlows?: string;
  steps?: string;
  excludeSteps?: string;
  assignedTo?: string;
  taskStatus?: string;
  excludeStatus?: string;
  lockable?: boolean;
  orderBy?: string;
  lockedBy?: string;
  debug?: boolean;
  skip?: number;
  top?: number;
}

export function getTasks(api: AxiosInstance, options: GetTasksOptions = {}): Promise<any> {
  const {
    tasks,
    availableDateStart,
    availableDateEnd,
    flows,
    excludeFlows,
    steps,
    excludeSteps,
    assignedTo,
    taskStatus,
    excludeStatus,
    lockable,
    orderBy,
    lockedBy,
    debug,
    skip,
    top,
  } = options;
  const qstrs: string[] = [];
  if (tasks) qstrs.push(`tasks=${tasks}`);
  if (availableDateStart) qstrs.push(`availableDateStart=${availableDateStart}`);
  if (availableDateEnd) qstrs.push(`availableDateEnd=${availableDateEnd}`);
  if (flows) qstrs.push(`flows=${flows}`);
  if (excludeFlows) qstrs.push(`excludeFlows=${excludeFlows}`);
  if (steps) qstrs.push(`steps=${steps}`);
  if (excludeSteps) qstrs.push(`excludeSteps=${excludeSteps}`);
  if (assignedTo) qstrs.push(`assignedTo=${assignedTo}`);
  if (taskStatus) qstrs.push(`taskStatus=${taskStatus}`);
  if (excludeStatus) qstrs.push(`excludeStatus=${excludeStatus}`);
  if (lockable) qstrs.push(`lockable=${lockable}`);
  if (orderBy) qstrs.push(`orderBy=${orderBy}`);
  if (lockedBy) qstrs.push(`lockedBy=${lockedBy}`);
  if (debug) qstrs.push(`debug=${debug}`);
  if (skip) qstrs.push(`skip=${skip}`);
  if (top) qstrs.push(`top=${top}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.get(`api/tasks${qstr}`).then((res) => Promise.resolve(res.data));
}

export function getTasksByFileId(api: AxiosInstance, fileId: string, options: GetTasksOptions = {}): Promise<any> {
  const {
    tasks,
    availableDateStart,
    availableDateEnd,
    flows,
    excludeFlows,
    steps,
    excludeSteps,
    assignedTo,
    taskStatus,
    excludeStatus,
    lockable,
    orderBy,
    lockedBy,
    debug,
    skip,
    top,
  } = options;
  const qstrs: string[] = [];
  if (tasks) qstrs.push(`tasks=${tasks}`);
  if (availableDateStart) qstrs.push(`availableDateStart=${availableDateStart}`);
  if (availableDateEnd) qstrs.push(`availableDateEnd=${availableDateEnd}`);
  if (flows) qstrs.push(`flows=${flows}`);
  if (excludeFlows) qstrs.push(`excludeFlows=${excludeFlows}`);
  if (steps) qstrs.push(`steps=${steps}`);
  if (excludeSteps) qstrs.push(`excludeSteps=${excludeSteps}`);
  if (assignedTo) qstrs.push(`assignedTo=${assignedTo}`);
  if (taskStatus) qstrs.push(`taskStatus=${taskStatus}`);
  if (excludeStatus) qstrs.push(`excludeStatus=${excludeStatus}`);
  if (lockable) qstrs.push(`lockable=${lockable}`);
  if (orderBy) qstrs.push(`orderBy=${orderBy}`);
  if (lockedBy) qstrs.push(`lockedBy=${lockedBy}`);
  if (debug) qstrs.push(`debug=${debug}`);
  if (skip) qstrs.push(`skip=${skip}`);
  if (top) qstrs.push(`top=${top}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.get(`api/files/${fileId}/tasks${qstr}`).then((res) => Promise.resolve(res.data));
}

export function getTasksByFileIdPost(api: AxiosInstance, fileId: string, options: GetPostTasksOptions = {}): Promise<any> {
  const { filter, skip, top } = options;
  const qstrs: string[] = [];
  if (skip) qstrs.push(`skip=${skip}`);
  if (top) qstrs.push(`top=${top}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api
    .post(`api/files/${fileId}/tasks${qstr}`, filter)
    .then((res) => Promise.resolve(res.data));
}

export function updateTask(api: AxiosInstance, taskId: string, content: any): Promise<any> {
  return api.post(`api/tasks/${taskId}`, content).then((res) => Promise.resolve(res.data));
}