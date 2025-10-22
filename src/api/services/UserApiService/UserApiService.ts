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

  public fetchUser(): AxiosRequestConfig {
    return {
      method: 'GET',
      url: '/users/me',
    };
  }
}

export const userApiService = new UserApiService();
