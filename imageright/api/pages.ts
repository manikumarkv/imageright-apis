import { AxiosInstance } from 'axios';

export function checkReadPermissions(api: AxiosInstance, pageId: string): Promise<any> {
  return api.get(`api/pages/${pageId}/readpermissions`).then((res) => Promise.resolve(res.data));
}

export function createPage(api: AxiosInstance, content: any): Promise<any> {
  const { formdata, headers } = content;
  return api.post('api/pages', formdata, { headers }).then((res) => Promise.resolve(res.data));
}

export function getAllPagesFromDocument(api: AxiosInstance, docId: string): Promise<any> {
  return api.get(`api/documents/${docId}/pages`).then((res) => Promise.resolve(res.data));
}

export function getPageById(api: AxiosInstance, pageId: string): Promise<any> {
  return api.get(`api/pages/${pageId}`).then((res) => Promise.resolve(res.data));
}

export function getPageImageMetadata(api: AxiosInstance, pageId: string): Promise<any> {
  return api.get(`api/pages/${pageId}/imagemetadata`).then((res) => Promise.resolve(res.data));
}

export function lockPage(api: AxiosInstance, pageId: string): Promise<any> {
  return api.get(`api/pages/${pageId}/lock`).then((res) => Promise.resolve(res.data));
}

export function movePage(api: AxiosInstance, moveObj: any): Promise<any> {
  return api.post('api/pages/move', moveObj.toJSON()).then((res) => Promise.resolve(res.data));
}

export function rotatePage(api: AxiosInstance, pageId: string, rotationAngle: number): Promise<any> {
  return api
    .post(`api/pages/${pageId}/rotate?rotationAngle=${rotationAngle}`)
    .then((res) => Promise.resolve(res.data));
}

export function unlockPage(api: AxiosInstance, pageId: string): Promise<any> {
  return api.get(`api/pages/${pageId}/unlock`).then((res) => Promise.resolve(res.data));
}

export function updatePageContent(api: AxiosInstance, pageId: string, content: any): Promise<any> {
  return api.post(`api/pages/${pageId}/content`, content).then((res) => Promise.resolve(res.data));
}

export function updatePageProperties(api: AxiosInstance, pageId: string, properties: any): Promise<any> {
  return api
    .post(`api/pages/${pageId}/properties`, properties)
    .then((res) => Promise.resolve(res.data));
}

// V2

export function copyPage(api: AxiosInstance, copyObj: any): Promise<any> {
  return api.post('api/v2/pages/copy', copyObj.toJSON()).then((res) => Promise.resolve(res.data));
}

export function createPageV2(api: AxiosInstance, content: any, params: any = {}): Promise<any> {
  const { formdata, headers } = content;
  const options = { headers, params };
  return api.post('api/v2/pages', formdata, options).then((res) => Promise.resolve(res.data));
}

export function mergeToDocument(api: AxiosInstance, mergeObj: any): Promise<any> {
  return api.post('api/v2/pages/merge', mergeObj.toJSON()).then((res) => Promise.resolve(res.data));
}

export function movePageV2(api: AxiosInstance, moveObj: any): Promise<any> {
  return api.post('api/v2/pages/move', moveObj.toJSON()).then((res) => Promise.resolve(res.data));
}

export function updatePageContentV2(api: AxiosInstance, pageId: string, content: any): Promise<any> {
  return api
    .post(`api/v2/pages/${pageId}/content`, content)
    .then((res) => Promise.resolve(res.data));
}