import { About } from './Pages/About/About';
import { Login } from './Pages/Login/Login';
import { NotFound } from './Pages/NotFound/NotFound';
import { Role } from './store';
import { withPagelayout } from './Layouts/PageLayout/PageLayout';

interface IRoute {
  path: string;
  [Role.Guest]: React.FunctionComponent;
  [Role.Admin]?: React.FunctionComponent;
  [Role.User]?: React.FunctionComponent;
}

export const routes: IRoute[] = [
  {
    path: '/',
    [Role.Guest]: Login,
  },
  {
    path: '/about',
    [Role.Guest]: Login,
    [Role.User]: About,
  },
  {
    path: '/login',
    [Role.Guest]: Login,
  },
  {
    path: '*',
    [Role.Guest]: NotFound,
  },
];

type GetRoutes = (role: Role) => {
  element: JSX.Element;
  path: string;
}[];

export const getRoutes: GetRoutes = (role) =>
  routes
    .map((route) => {
      if (route[Role.Admin] && role === Role.Admin) {
        return { path: route.path, element: withPagelayout(route[Role.Admin]) };
      }
      if (route[Role.User] && role === Role.User) {
        return { path: route.path, element: withPagelayout(route[Role.User]) };
      }
      return { path: route.path, element: withPagelayout(route[Role.Guest]) };
    })
    .map((route) => {
      return { ...route, element: <route.element /> };
    });
