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

  public uploadAvatar(file: File): AxiosRequestConfig {
    const formData = new FormData();
    formData.append('file', file);

    return {
      method: 'POST',
      url: '/users/me/avatars',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }

  public getAllAvatars(signal?: AbortSignal): AxiosRequestConfig {
    return {
      method: 'GET',
      url: '/users/me/avatars',
      signal,
    };
  }

  public setMainAvatar(mediaId: number): AxiosRequestConfig {
    return {
      method: 'PATCH',
      url: `/users/me/avatars/${mediaId}/set-main`,
    };
  }

  public deleteAvatar(mediaId: number): AxiosRequestConfig {
    return {
      method: 'DELETE',
      url: `/users/me/avatars/${mediaId}`,
    };
  }
}

export const userApiService = new UserApiService();
