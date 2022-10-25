import MainLayout from './Layouts/MainLayout/MainLayout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { flatRoutes } from './routes';

const App = () => {
  return (
    <MainLayout>
      <RouterProvider router={createBrowserRouter(flatRoutes)} />
    </MainLayout>
  );
};
export default App;
