import TasksPage from 'pages/TasksPage/TasksPage';
import { AppRoutes } from './config';
import { AuthLayout, MainLayout } from 'layouts';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

const APP_ROUTES: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: AppRoutes.TASKS,
        element: <TasksPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: AppRoutes.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
];

export const appRouter = createBrowserRouter(APP_ROUTES);
