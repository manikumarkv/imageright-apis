import { AxiosInstance } from 'axios';

export function getDocumentOverlayInfo(api: AxiosInstance, docId: string): Promise<any> {
  return api.get(`api/documents/${docId}/overlayInfo`).then((res) => Promise.resolve(res.data));
}

export function getOverlayImage(api: AxiosInstance, overlayId: string, overlayImageId: string): Promise<any> {
  return api
    .get(`api/overlays/${overlayId}?overlayImageId=${overlayImageId}`)
    .then((res) => Promise.resolve(res.data));
}