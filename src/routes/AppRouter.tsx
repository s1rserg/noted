import TasksPage from 'pages/TasksPage/TasksPage';
import { AppRoutes } from './config';
import { MainLayout } from 'layouts';
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
];

export const appRouter = createBrowserRouter(APP_ROUTES);
