import { About } from './Pages/About/About';
import { Login } from './Pages/Login/Login';
import { NotFound } from './Pages/NotFound/NotFound';
import { Role } from './store';
import { PageLayout } from './Layouts/PageLayout/PageLayout';

interface IRoute {
  path: string;
  level: Role;
  element: JSX.Element;
}

export const routes = {
  home: {
    path: '/',
    element: <Login />,
    level: Role.Guest,
  },
  login: {
    path: '/login',
    element: <Login />,
    level: Role.Guest,
  },
  about: {
    path: '/about',
    element: <About />,
    level: Role.User,
  },
  notFound: {
    path: '*',
    element: <NotFound />,
    level: Role.Guest,
  },
};

type IFlatRoutes = {
  element: JSX.Element;
  path: string;
}[];

export const flatRoutes: IFlatRoutes = Object.values(routes).map((route: IRoute) => {
  const { element, level, path } = route;
  return {
    path,
    element: <PageLayout level={level}>{element}</PageLayout>,
  };
});
