import { AxiosInstance } from 'axios';

export function getAccount(api: AxiosInstance, accountId: string, type?: string): Promise<any> {
  const qstr = type ? `?type=${type}` : '';
  return api.get(`api/accounts/${accountId}${qstr}`).then((res) => Promise.resolve(res.data));
}

export function getAccountGroups(api: AxiosInstance, accountId: string): Promise<any> {
  return api.get(`api/accounts/${accountId}/groups`).then((res) => Promise.resolve(res.data));
}

export function getAllAccounts(api: AxiosInstance): Promise<any> {
  return api.get('api/accounts').then((res) => Promise.resolve(res.data));
}

export function getCurrentUserAccount(api: AxiosInstance): Promise<any> {
  return api.get('api/accounts/current').then((res) => Promise.resolve(res.data));
}

export function getCurrentUserGroups(api: AxiosInstance): Promise<any> {
  return api.get('api/accounts/current/groups').then((res) => Promise.resolve(res.data));
}