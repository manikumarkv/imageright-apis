import { AxiosInstance } from 'axios';

export function getAllowedTypes(api: AxiosInstance, typeId: string): Promise<any> {
  return api
    .get(`api/objecttypes/allowedtypes?typeId=${typeId}`)
    .then((res) => Promise.resolve(res.data));
}

export function getAllowedTypesForContainer(api: AxiosInstance, objectId: string): Promise<any> {
  return api
    .get(`api/containers/${objectId}/allowedtypes`)
    .then((res) => Promise.resolve(res.data));
}

export function getAttributeDefinitionsForType(api: AxiosInstance, objectTypeId: string): Promise<any> {
  return api
    .get(`api/objecttypes/${objectTypeId}/attributes`)
    .then((res) => Promise.resolve(res.data));
}

export function getFileTypeExtensions(api: AxiosInstance, fileTypeId: string): Promise<any> {
  return api
    .get(`api/objecttypes/${fileTypeId}/extensions`)
    .then((res) => Promise.resolve(res.data));
}

export function getFileTypeTemplate(api: AxiosInstance, fileTypeId: string): Promise<any> {
  return api.get(`api/objecttypes/${fileTypeId}/template`).then((res) => Promise.resolve(res.data));
}

export function getObjectType(api: AxiosInstance, objectTypeId: string): Promise<any> {
  return api.get(`api/objecttypes/${objectTypeId}`).then((res) => Promise.resolve(res.data));
}

export function getSortOptionsForType(api: AxiosInstance, objectTypeId: string): Promise<any> {
  return api
    .get(`api/objecttypes/${objectTypeId}/sortoptions`)
    .then((res) => Promise.resolve(res.data));
}

export function getTypesForClass(api: AxiosInstance, standardObjectClass: string): Promise<any> {
  return api.get(`api/objecttypes/${standardObjectClass}`).then((res) => Promise.resolve(res.data));
}