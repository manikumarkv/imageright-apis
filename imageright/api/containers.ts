import { AxiosInstance } from 'axios';

export function getContainers(api: AxiosInstance, containerId: string, recursive: boolean): Promise<any> {
  const qstr = recursive ? '?recursive=true' : '?recursive=false';
  return api.get(`api/containers/${containerId}${qstr}`).then((res) => Promise.resolve(res.data));
}