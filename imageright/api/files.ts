import { AxiosInstance } from 'axios';

export function createFile(api: AxiosInstance, fileObj: any): Promise<any> {
  return api.post('api/files', fileObj).then((res) => Promise.resolve(res.data));
}

export function findFiles(api: AxiosInstance, searchObj: any): Promise<any> {
  return api.post('api/files/find', searchObj).then((res) => Promise.resolve(res.data));
}

export function getFileById(api: AxiosInstance, fileId: string, includeHasNotes: boolean): Promise<any> {
  const qstr = includeHasNotes ? '?includeHasNotes=true' : '';
  return api.get(`api/files/${fileId}${qstr}`).then((res) => Promise.resolve(res.data));
}

export function getRelatedFiles(api: AxiosInstance, fileId: string): Promise<any> {
  return api.get(`api/files/${fileId}/related`).then((res) => Promise.resolve(res.data));
}