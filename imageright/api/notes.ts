import { AxiosInstance } from 'axios';

export function addNoteContainer(api: AxiosInstance, objectId: string, category: string): Promise<any> {
  return api
    .post(`api/objects/${objectId}/notes/${category}`)
    .then((res) => Promise.resolve(res.data));
}

export function addNoteItem(api: AxiosInstance, objectId: string, noteObj: any): Promise<any> {
  return api
    .post(`api/objects/${objectId}/notes`, noteObj.toJSON())
    .then((res) => Promise.resolve(res.data));
}

export function getNotes(
  api: AxiosInstance,
  objectId: string,
  category: string,
  status?: string,
  includeHidden?: boolean,
  includeDeleted?: boolean
): Promise<any> {
  const qstrs: string[] = [];
  if (status) qstrs.push(`status=${status}`);
  if (includeHidden) qstrs.push(`includeHidden=${includeHidden}`);
  if (includeDeleted) qstrs.push(`includeDeleted=${includeDeleted}`);
  const qstr = qstrs.length ? `?${qstrs.join('&')}` : '';
  return api
    .get(`api/objects/${objectId}/notes/${category}${qstr}`)
    .then((res) => Promise.resolve(res.data));
}

export function lockNote(api: AxiosInstance, objectId: string, category: string, version: number): Promise<any> {
  const qstr = `?version=${version}`;
  return api
    .post(`api/objects/${objectId}/notes/${category}/lock${qstr}`)
    .then((res) => Promise.resolve(res.data));
}

export function setNoteAsDefault(api: AxiosInstance, objectId: string, category: string, collectionId: string): Promise<any> {
  return api
    .post(`api/objects/${objectId}/notes/${category}/${collectionId}/setasdefault`)
    .then((res) => Promise.resolve(res.data));
}