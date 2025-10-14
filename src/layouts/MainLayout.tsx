import { Box } from '@mui/material';
import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

export const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ px: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};
