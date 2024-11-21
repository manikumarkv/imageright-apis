import { AxiosInstance } from 'axios';

export function getDrawers(api: AxiosInstance): Promise<any> {
  return api.get('api/drawers').then((res) => Promise.resolve(res.data));
}

export function getDrawerById(api: AxiosInstance, id: string): Promise<any> {
  return api.get(`api/drawers/${id}`).then((res) => Promise.resolve(res.data));
}

export function getDrawerByName(api: AxiosInstance, name: string): Promise<any> {
  return api.get(`api/drawers/${name}`).then((res) => Promise.resolve(res.data));
}

export function getDrawersInContainer(api: AxiosInstance, containerId: string): Promise<any> {
  return api.get(`api/containers/${containerId}/drawers`).then((res) => Promise.resolve(res.data));
}

export function getDrawersInContainerByName(api: AxiosInstance, containerId: string, name: string): Promise<any> {
  return api
    .get(`api/containers/${containerId}/drawers/${name}`)
    .then((res) => Promise.resolve(res.data));
}