import { MainLayout } from './Layouts/MainLayout/MainLayout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { flatRoutes } from './routes';

const App = () => {
  return <BrowserRouter>
    <MainLayout>
      <Routes>
        {flatRoutes.map(({ path, element, name }) => (
          <Route key={name} path={path} element={element} />
        ))}
      </Routes>
    </MainLayout>
  </BrowserRouter>
}

export default App;
