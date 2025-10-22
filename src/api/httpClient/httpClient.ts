import { ApiConfig } from './config';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { localStorageService } from 'utils/LocalStorageService';
import { authApiService, type AuthResponse } from '../services';
import type { RetryableAxiosRequestConfig } from './types';
import { useUserStore } from 'store';
import { appRouter, AppRoutes } from 'routes';

const createHttpClient = () => {
  const instance = axios.create(ApiConfig);

  instance.interceptors.request.use((config) => {
    const accessToken = localStorageService.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableAxiosRequestConfig;

      if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          const refreshConfig = authApiService.refresh();
          const response = await axios.request<AuthResponse>({
            ...refreshConfig,
            baseURL: ApiConfig.baseURL,
          });
          localStorageService.setAccessToken(response.data.accessToken);
          return instance.request(originalRequest);
        } catch (_e) {
          localStorageService.deleteAccessToken();
          useUserStore.getState().clearUser();
          void appRouter.navigate(AppRoutes.LOGIN);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const httpClient = createHttpClient();
