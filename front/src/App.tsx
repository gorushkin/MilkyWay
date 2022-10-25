import MainLayout from './Layouts/MainLayout/MainLayout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { getRoutes } from './routes';
import { useMemo } from 'react';

const App = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const routes = useMemo(() => getRoutes(role), [role]);

  return (
    <MainLayout>
      <RouterProvider router={createBrowserRouter(routes)} />
    </MainLayout>
  );
};
export default App;
