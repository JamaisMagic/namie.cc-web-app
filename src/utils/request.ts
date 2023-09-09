import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

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
  try {
    return await mInstance.post(url, dataObject);
  } catch (error: any) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error;
    }
    return null;
  }
}

export async function shorten(longUrl: string) {
  try {
    return await post('/api/shorten/', { url: longUrl });
  } catch (error: any) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error;
    }
    return null;
  }
}

export async function getHostnameWhiteList() {
  try {
    return mInstance.get('/api/allowed_hostname/')
  } catch (error: any) {
    console.error(error);
    if (error instanceof AxiosError) {
      return error;
    }
    return null;
  }
}
