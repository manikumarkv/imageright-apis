import { AxiosInstance } from 'axios';

export function getAttributeById(api: AxiosInstance, objId: string, attId: string): Promise<any> {
  return api.get(`api/objects/${objId}/attributes/${attId}`).then((res) => Promise.resolve(res.data));
}

export function getAttributeByName(api: AxiosInstance, objId: string, attName: string): Promise<any> {
  return api.get(`api/objects/${objId}/attributes/name/${attName}`).then((res) => Promise.resolve(res.data));
}

export function getAttributeByObject(api: AxiosInstance, objId: string): Promise<any> {
  return api.get(`api/objects/${objId}/attributes`).then((res) => Promise.resolve(res.data));
}