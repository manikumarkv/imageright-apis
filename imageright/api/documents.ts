import { AxiosInstance } from 'axios';

export function createDocument(api: AxiosInstance, docObj: any): Promise<any> {
  return api.post('api/documents', docObj).then((res) => Promise.resolve(res.data));
}

export function findDocuments(api: AxiosInstance, searchObj: any): Promise<any> {
  return api.post('api/documents/find', searchObj).then((res) => Promise.resolve(res.data));
}

export function getDocumentById(api: AxiosInstance, docId: string): Promise<any> {
  return api.get(`api/documents/${docId}`).then((res) => Promise.resolve(res.data));
}

export function moveDocument(api: AxiosInstance, moveObj: any): Promise<any> {
  return api.post('api/documents/move', moveObj).then((res) => Promise.resolve(res.data));
}

export function updateProperties(api: AxiosInstance, docId: string, propObj: any): Promise<any> {
  return api.post(`api/documents/${docId}/properties`, propObj).then((res) => Promise.resolve(res.data));
}

// V2

export function copyDocument(api: AxiosInstance, copyObj: any): Promise<any> {
  return api.post('api/v2/documents/copy', copyObj).then((res) => Promise.resolve(res.data));
}

export function deleteDocument(api: AxiosInstance, docId: string, force: boolean): Promise<any> {
  const qstr = force ? '?force=true' : '';
  return api.delete(`api/v2/documents/${docId}${qstr}`).then((res) => Promise.resolve(res.data));
}

export function moveDocumentV2(api: AxiosInstance, moveObj: any): Promise<any> {
  return api.post('api/v2/documents/move', moveObj).then((res) => Promise.resolve(res.data));
}