import type { AxiosRequestConfig } from 'axios';
import type { SignUpLocalDto } from './types';

class AuthApiService {
  public signUp(data: SignUpLocalDto): AxiosRequestConfig {
    return {
      method: 'POST',
      url: '/auth/sign-up',
      data,
    };
  }
}

export const authApiService = new AuthApiService();
