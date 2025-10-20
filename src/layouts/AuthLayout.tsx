import { Box } from '@mui/material';
import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

export const AuthLayout: FC = () => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          px: 2,
          height: 'calc(100vh - 73px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
