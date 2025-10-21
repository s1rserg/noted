import { ApiConfig } from './config';
import axios from 'axios';
import { localStorageService } from 'utils/LocalStorageService';

const createHttpClient = () => {
  const instance = axios.create(ApiConfig);

  instance.interceptors.request.use((config) => {
    const accessToken = localStorageService.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};

export const httpClient = createHttpClient();
