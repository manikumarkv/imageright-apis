import { AxiosInstance } from 'axios';

export function getFileMarkDefinitions(api: AxiosInstance): Promise<any> {
  return api.get('api/marks').then((res) => Promise.resolve(res.data));
}

export function getFileMarkDefinitionsByFileTypeId(api: AxiosInstance, fileTypeId: string): Promise<any> {
  return api.get(`api/marks?fileTypeId=${fileTypeId}`).then((res) => Promise.resolve(res.data));
}

// V2

export function getFileMarkDefinitionsByFileTypeIdV2(api: AxiosInstance, fileTypeId: string): Promise<any> {
  return api.get(`api/v2/objectypes/${fileTypeId}/filemarks`).then((res) => Promise.resolve(res.data));
}

export function getFileMarkDefinitionsV2(api: AxiosInstance): Promise<any> {
  return api.get('api/v2/filemarks').then((res) => Promise.resolve(res.data));
}

export function getImageDataForFileMark(api: AxiosInstance, markId: string): Promise<any> {
  return api.get(`api/v2/filemarks/${markId}/image`).then((res) => Promise.resolve(res.data));
}

export function getImageDataForPageMark(api: AxiosInstance, markId: string): Promise<any> {
  return api.get(`api/v2/pagemarks/${markId}/image`).then((res) => Promise.resolve(res.data));
}

export function getMarksForFile(api: AxiosInstance, fileId: string): Promise<any> {
  return api.get(`api/v2/files/${fileId}/marks`).then((res) => Promise.resolve(res.data));
}

export function getMarksForPage(api: AxiosInstance, pageId: string): Promise<any> {
  return api.get(`api/v2/pages/${pageId}/marks`).then((res) => Promise.resolve(res.data));
}