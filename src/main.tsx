import { appRouter } from 'routes';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { theme } from 'styles';
import { ThemedToastContainer } from 'components/ThemedToastContainer';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={appRouter} />
    <ThemedToastContainer />
  </ThemeProvider>,
);
