import { About } from './Pages/About/About';
import { Login } from './Pages/Login/Login';
import { NotFound } from './Pages/NotFound/NotFound';
import { Role } from './store';
import { PageLayout } from './Layouts/PageLayout/PageLayout';
import { Home } from './Pages/Home/Home';
import { Admin } from './Pages/Admin/Admin';

interface IRoute {
  path: string;
  level: Role;
  element: () => JSX.Element;
  name: string;
  header: {
    [Role.Guest]: boolean;
    [Role.User]: boolean;
    [Role.Admin]: boolean;
  };
}

export const routes: Record<string, IRoute> = {
  home: {
    path: '/',
    element: Home,
    level: Role.Guest,
    name: 'Home',
    header: {
      [Role.Guest]: true,
      [Role.User]: true,
      [Role.Admin]: true,
    },
  },
  login: {
    path: '/login',
    element: Login,
    level: Role.Guest,
    name: 'Login',
    header: {
      [Role.Guest]: false,
      [Role.User]: false,
      [Role.Admin]: false,
    },
  },
  about: {
    path: '/about',
    element: About,
    level: Role.User,
    name: 'About',
    header: {
      [Role.Guest]: true,
      [Role.User]: true,
      [Role.Admin]: true,
    },
  },
  admin: {
    path: '/admin',
    element: Admin,
    level: Role.User,
    name: 'Admin',
    header: {
      [Role.Guest]: false,
      [Role.User]: false,
      [Role.Admin]: true,
    },
  },
  notFound: {
    path: '*',
    element: NotFound,
    level: Role.Guest,
    name: 'Home',
    header: {
      [Role.Guest]: false,
      [Role.User]: false,
      [Role.Admin]: false,
    },
  },
};

type IFlatRoutes = {
  element: JSX.Element;
  path: string;
  name: string;
  header: {
    [Role.Guest]: boolean;
    [Role.User]: boolean;
    [Role.Admin]: boolean;
  };
}[];

export const flatRoutes: IFlatRoutes = Object.values(routes).map((route: IRoute) => {
  const { element, level, path, name, header } = route;
  const Component = element;
  return {
    path,
    name,
    header,
    element: (
      <PageLayout level={level}>
        <Component />
      </PageLayout>
    ),
  };
});
