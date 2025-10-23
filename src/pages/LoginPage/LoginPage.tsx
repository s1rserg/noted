import { useState, type FC } from 'react';
import {
  httpClient,
  authApiService,
  type AuthResponse,
  type SignInLocalDto,
  handleApiError,
} from 'api';
import { localStorageService } from 'utils/LocalStorageService';
import { LoginForm } from './components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from 'routes';
import type { LocationState } from './types';

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (data: SignInLocalDto): Promise<boolean> => {
    setIsLoading(true);
    try {
      const requestConfig = authApiService.signIn(data);
      const response = await httpClient<AuthResponse>(requestConfig);

      localStorageService.setAccessToken(response.data.accessToken);

      const state = location.state as LocationState | null;
      const from = state?.from?.pathname || AppRoutes.TASKS;
      void navigate(from, { replace: true });

      setIsLoading(false);
      return true;
    } catch (error) {
      handleApiError(error);

      setIsLoading(false);
      return false;
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
    </>
  );
};
