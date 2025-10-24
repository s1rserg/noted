import { ApiConfig } from './config';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { localStorageService } from 'utils/LocalStorageService';
import { authApiService, type AuthResponse } from '../services';
import type { RetryableAxiosRequestConfig } from './types';
import { useUserStore } from 'store';
import { appRouter, AppRoutes } from 'routes';

export const httpClient = axios.create(ApiConfig);

export const refreshClient = axios.create(ApiConfig);

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorageService.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await refreshClient<AuthResponse>(authApiService.refresh());

        localStorageService.setAccessToken(response.data.accessToken);
        return httpClient.request(originalRequest);
      } catch {
        localStorageService.deleteAccessToken();
        useUserStore.getState().clearUser();
        void appRouter.navigate(AppRoutes.LOGIN);
      }
    }

    return Promise.reject(error);
  },
);
