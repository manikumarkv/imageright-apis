import { AxiosInstance } from 'axios';

export function findVapTasks(api: AxiosInstance, filterObj: any, skip?: number, top?: number): Promise<any> {
  const qstrs: string[] = [];
  if (skip) qstrs.push(`skip=${skip}`);
  if (top) qstrs.push(`top=${top}`);
  const qstr = qstrs.length > 0 ? `?${qstrs.join('&')}` : '';
  return api
    .post(`api/integration/vap/tasks/find${qstr}`, filterObj.toJSON())
    .then((res) => Promise.resolve(res.data));
}

export function findVapTasksByClientId(
  api: AxiosInstance,
  clientId: string,
  filterObj: any,
  skip?: number,
  top?: number,
  includeDeletedFiles?: boolean
): Promise<any> {
  const qstrs: string[] = [];
  if (skip) qstrs.push(`skip=${skip}`);
  if (top) qstrs.push(`top=${top}`);
  if (includeDeletedFiles) qstrs.push(`includeDeletedFiles=${includeDeletedFiles}`);
  const qstr = qstrs.length > 0 ? `?${qstrs.join('&')}` : '';
  return api
    .post(`api/integration/vap/client/${clientId}/tasks/find${qstr}`, filterObj.toJSON())
    .then((res) => Promise.resolve(res.data));
}

export function getClientFiles(api: AxiosInstance, clientId: string, includeDeletedFiles?: boolean): Promise<any> {
  const qstr = includeDeletedFiles ? `?includeDeletedFiles=${includeDeletedFiles}` : '';
  return api
    .get(`api/integration/vap/files/client/${clientId}${qstr}`)
    .then((res) => Promise.resolve(res.data));
}

export function getPolicyFolder(api: AxiosInstance, policyId: string, includeDeletedFiles?: boolean): Promise<any> {
  const qstr = includeDeletedFiles ? `?includeDeletedFiles=${includeDeletedFiles}` : '';
  return api
    .get(`api/integration/vap/files/policy/${policyId}${qstr}`)
    .then((res) => Promise.resolve(res.data));
}

export function getVersion(api: AxiosInstance): Promise<any> {
  return api.get('api/integration/vap/version').then((res) => Promise.resolve(res.data));
}