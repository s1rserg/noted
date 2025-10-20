import type { AxiosRequestConfig } from 'axios';
import type { UpdateUserDto } from './types';

class UserApiService {
  public updateProfile(data: UpdateUserDto): AxiosRequestConfig {
    return {
      method: 'PATCH',
      url: '/users/me',
      data,
    };
  }
}

export const userApiService = new UserApiService();
