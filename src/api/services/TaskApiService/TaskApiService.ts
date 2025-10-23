import type { AxiosRequestConfig } from 'axios';
import type { CreateTaskDto, TaskQueryParameters } from './types';

class TaskApiService {
  public findAll(queryParams: TaskQueryParameters, signal?: AbortSignal): AxiosRequestConfig {
    return {
      method: 'GET',
      url: '/tasks/',
      params: queryParams,
      signal,
    };
  }

  public create(data: CreateTaskDto): AxiosRequestConfig {
    return {
      method: 'POST',
      url: '/tasks/',
      data,
    };
  }
}

export const taskApiService = new TaskApiService();
