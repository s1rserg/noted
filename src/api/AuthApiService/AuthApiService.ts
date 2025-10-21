import type { SignInLocalDto, SignUpLocalDto } from './types';

import type { AxiosRequestConfig } from 'axios';

class AuthApiService {
  public signUp(data: SignUpLocalDto): AxiosRequestConfig {
    return {
      method: 'POST',
      url: '/auth/sign-up',
      data,
    };
  }

  public signIn(data: SignInLocalDto): AxiosRequestConfig {
    return {
      method: 'POST',
      url: '/auth/sign-in',
      data,
    };
  }
}

export const authApiService = new AuthApiService();
