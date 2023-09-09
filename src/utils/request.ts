import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const mInstance: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 300000,
});

mInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
});

mInstance.interceptors.response.use(config => {
  return config;
});


async function post(url: string, dataObject: object) {
  return await mInstance.post(url, dataObject)
    .catch((e: AxiosError) => console.error(e));
}

export async function shorten(longUrl: string) {
  return await post('/api/shorten/', {
    url: longUrl
  })
}

export async function getHostnameWhiteList() {
  return mInstance.get('/api/allowed_hostname/')
    .catch((e: AxiosError) => console.error(e));
}
