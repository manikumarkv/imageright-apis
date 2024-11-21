import { AxiosInstance, AxiosRequestConfig } from 'axios';

export function getImageById(api: AxiosInstance, imageId: string, version: number): Promise<ArrayBuffer> {
  const qstr = version ? `?version=${version}` : '?version=0';
  const options: AxiosRequestConfig = { responseType: 'arraybuffer' };
  return api.get(`api/images/${imageId}${qstr}`, options).then((res) => Promise.resolve(res.data));
}

export function getImageByIdV2(api: AxiosInstance,pageId:string, imageId: string, version: number=0): Promise<ArrayBuffer> {
  const options: AxiosRequestConfig = { responseType: 'arraybuffer' };
  return api.get(`api/v2/pages/${pageId}/images/${imageId}/${version}`, options).then((res) => Promise.resolve(res.data));
}