import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';
import type { FC } from 'react';

export const MainLayout: FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
