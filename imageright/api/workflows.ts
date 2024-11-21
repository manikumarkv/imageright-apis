import { AxiosInstance } from 'axios';

// Workflows

interface DefaultStepLinkOptions {
  isDefault?: boolean;
  status?: string;
}

export function getDefaultStepLink(api: AxiosInstance, stepId: string, options: DefaultStepLinkOptions = {}): Promise<any> {
  const { isDefault, status } = options;
  const qstrs: string[] = [];
  if (isDefault) qstrs.push(`isDefault=${isDefault}`);
  if (status) qstrs.push(`status=${status}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.get(`api/steps/${stepId}/links/default${qstr}`).then((res) => Promise.resolve(res.data));
}

export function getPriorityList(api: AxiosInstance, stepId: string): Promise<any> {
  return api.get(`api/steps/${stepId}/priorities`).then((res) => Promise.resolve(res.data));
}

interface SplitLinkParametersOptions {
  isDebug?: boolean;
}

export function getSplitLinkParameters(api: AxiosInstance, stepId: string, options: SplitLinkParametersOptions = {}): Promise<any> {
  const { isDebug } = options;
  const qstrs: string[] = [];
  if (isDebug) qstrs.push(`isDebug=${isDebug}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.get(`api/steps/${stepId}/splitparams${qstr}`).then((res) => Promise.resolve(res.data));
}

export function getStepAttributeById(api: AxiosInstance, stepId: string, id: string): Promise<any> {
  return api.get(`api/steps/${stepId}/attributes/${id}`).then((res) => Promise.resolve(res.data));
}

export function getStepAttributeByName(api: AxiosInstance, stepId: string, name: string): Promise<any> {
  return api.get(`api/steps/${stepId}/attributes/${name}`).then((res) => Promise.resolve(res.data));
}

export function getStepAttributes(api: AxiosInstance, stepId: string): Promise<any> {
  return api.get(`api/steps/${stepId}/attributes`).then((res) => Promise.resolve(res.data));
}

interface StepLinksOptions {
  targetStepId?: string;
  status?: string;
}

export function getStepLinks(api: AxiosInstance, srcStepId: string, options: StepLinksOptions = {}): Promise<any> {
  const { targetStepId, status } = options;
  const qstrs: string[] = [];
  if (targetStepId) qstrs.push(`targetStepId=${targetStepId}`);
  if (status) qstrs.push(`status=${status}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.get(`api/steps/${srcStepId}/links${qstr}`).then((res) => Promise.resolve(res.data));
}

interface StepsOptions {
  includeBuddies?: boolean;
  flag?: string;
}

export function getSteps(api: AxiosInstance, flowId: string, options: StepsOptions = {}): Promise<any> {
  const { includeBuddies, flag } = options;
  const qstrs: string[] = [];
  if (includeBuddies) qstrs.push(`includeBuddies=${includeBuddies}`);
  if (flag) qstrs.push(`flag=${flag}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.get(`api/workflows/${flowId}/steps${qstr}`).then((res) => Promise.resolve(res.data));
}

export function getUsersToAssign(api: AxiosInstance, stepId: string): Promise<any> {
  return api.get(`api/steps/${stepId}/users`).then((res) => Promise.resolve(res.data));
}

interface WorkflowsOptions {
  includeBuddies?: boolean;
}

export function getWorkflows(api: AxiosInstance, options: WorkflowsOptions = {}): Promise<any> {
  const { includeBuddies } = options;
  const qstrs: string[] = [];
  if (includeBuddies) qstrs.push(`includeBuddies=${includeBuddies}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api.get(`api/workflows${qstr}`).then((res) => Promise.resolve(res.data));
}