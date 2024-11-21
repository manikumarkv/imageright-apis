import { AxiosInstance } from 'axios';

export function createFolder(api: AxiosInstance, folderObj: any): Promise<any> {
  return api.post('api/folders', folderObj).then((res) => Promise.resolve(res.data));
}

export function findFolders(api: AxiosInstance, searchObj: any): Promise<any> {
  return api.post('api/folders/find', searchObj).then((res) => Promise.resolve(res.data));
}

export function getFolderById(api: AxiosInstance, folderId: string, includeHasNotes: boolean): Promise<any> {
  const qstr = includeHasNotes ? '?includeHasNotes=true' : '';
  return api.get(`api/folders/${folderId}${qstr}`).then((res) => Promise.resolve(res.data));
}