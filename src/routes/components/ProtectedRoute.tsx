import { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { localStorageService } from 'utils/LocalStorageService';
import { authApiService, refreshClient, type AuthResponse } from 'api';
import { Loader } from 'components/Loader';
import { AppRoutes } from '../config';

export const ProtectedRoute = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const response = await refreshClient<AuthResponse>(authApiService.refresh());
        localStorageService.setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
      } catch (_error) {
        setIsAuthenticated(false);
      } finally {
        setIsInitializing(false);
      }
    };

    if (localStorageService.getAccessToken()) {
      setIsAuthenticated(true);
      setIsInitializing(false);
    } else {
      void initializeSession();
    }
  }, []);

  if (isInitializing) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
