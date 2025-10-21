import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, type FC } from 'react';
import { localStorageService } from 'utils/LocalStorageService';
import { AppRoutes } from '../config';
import { useUserStore } from 'store';

export const ProtectedRoute: FC = () => {
  const location = useLocation();
  const accessToken = localStorageService.getAccessToken();

  const user = useUserStore((state) => state.user);
  const initUser = useUserStore((state) => state.initUser);

  useEffect(() => {
    if (!user && accessToken) {
      void initUser();
    }
  }, [user, accessToken, initUser]);

  if (!accessToken) {
    return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
