import { AxiosInstance } from 'axios';

export function createInstances(api: AxiosInstance, id: string, instObj: any): Promise<any> {
  return api
    .post(`api/instances/${id}/children`, instObj.toJSON())
    .then((res) => Promise.resolve(res.data));
}

export function getInstanceChildren(api: AxiosInstance, id: string): Promise<any> {
  return api.get(`api/instances/${id}/children`).then((res) => Promise.resolve(res.data));
}

export function getParentPath(api: AxiosInstance, id: string, isContainer: boolean): Promise<any> {
  const qstr = `?id=${id}&isContainer=${isContainer}`;
  return api.get(`api/instances/getparentpath${qstr}`).then((res) => Promise.resolve(res.data));
}