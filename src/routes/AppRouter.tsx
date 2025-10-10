import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppRoutes } from './config';
import TasksPage from 'pages/TasksPage/TasksPage';

const APP_ROUTES: RouteObject[] = [
  {
    children: [
      {
        path: AppRoutes.TASKS,
        element: <TasksPage />,
      },
    ],
  },
];

export const appRouter = createBrowserRouter(APP_ROUTES);
