import { appRouter } from 'routes';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { theme } from 'styles';
import { ThemedToastContainer } from 'components/ThemedToastContainer';
import './index.css';
import './config/i18n';
import { Suspense } from 'react';
import { Loader } from 'components/Loader';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Suspense fallback={<Loader />}>
      <RouterProvider router={appRouter} />
    </Suspense>
    <ThemedToastContainer />
  </ThemeProvider>,
);
