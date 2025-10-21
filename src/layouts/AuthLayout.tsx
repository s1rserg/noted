import { Box } from '@mui/material';
import type { FC } from 'react';
import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';

export const AuthLayout: FC = () => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          px: 2,
          height: 'calc(100dvh - 73px)',
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
