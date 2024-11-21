import { AxiosInstance } from 'axios';

// Users
export function changeUserPassword(api: AxiosInstance, content: any): Promise<any> {
  return api.post('api/users/changepassword', content).then((res) => Promise.resolve(res.data));
}

export function getCurrentUser(api: AxiosInstance): Promise<any> {
  return api.get('api/users/currentuser').then((res) => Promise.resolve(res.data));
}

export function getCurrentUserData(api: AxiosInstance): Promise<any> {
  return api.get('api/users/currentuser/userdata').then((res) => Promise.resolve(res.data));
}

export function getUserData(api: AxiosInstance, userId: string): Promise<any> {
  return api.get(`api/users/${userId}/userdata`).then((res) => Promise.resolve(res.data));
}