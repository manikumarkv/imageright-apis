import { AxiosInstance } from 'axios';

export function getConcurrentLoginData(api: AxiosInstance, featureName: string): Promise<any> {
  return api
    .get(`api/licensing/${featureName}/currentlogindata`)
    .then((res) => Promise.resolve(res.data));
}

export function getMessages(api: AxiosInstance, referenceKey: string): Promise<any> {
  return api.get(`api/licensing/${referenceKey}`).then((res) => Promise.resolve(res.data));
}

export function login(api: AxiosInstance, programId: string, featureName: string): Promise<any> {
  return api
    .post(`api/licensing/${programId}/${featureName}/login`)
    .then((res) => Promise.resolve(res.data));
}

export function logout(api: AxiosInstance, loginId: string, featureName: string): Promise<any> {
  return api
    .post(`api/licensing/${loginId}/${featureName}/logout`)
    .then((res) => Promise.resolve(res.data));
}

export function stillAlive(api: AxiosInstance, referenceKey: string, programId: string, featureName: string): Promise<any> {
  return api
    .post(`api/licensing/${referenceKey}/${programId}/${featureName}/stillalive`)
    .then((res) => Promise.resolve(res.data));
}

export function validateLicense(api: AxiosInstance, feature: string): Promise<any> {
  return api
    .get(`api/licensing/ValidateLicese/${feature}`)
    .then((res) => Promise.resolve(res.data));
}