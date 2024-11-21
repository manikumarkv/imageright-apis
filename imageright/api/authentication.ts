/* eslint-disable import/prefer-default-export */
import axios, { AxiosRequestConfig } from 'axios';

export interface AuthResponse {
  AccessToken: string;
}

export function authenticate(baseURL: string, UserName: string, Password: string): Promise<AuthResponse> {
  const config: AxiosRequestConfig = { baseURL };
  return axios
    .post('api/authenticate', { UserName, Password }, config)
    .then((res) => ({ AccessToken: res.data }));
}