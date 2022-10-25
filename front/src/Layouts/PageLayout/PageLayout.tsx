import { Role } from '../../store';
import styles from './PageLayout.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Navigate } from 'react-router-dom';
import { routes } from '../../routes';

type IWithPagelayout = (Component: React.FunctionComponent | undefined) => React.FunctionComponent;

interface IPageLayout {
  children: JSX.Element;
  level: Role;
}

export const withPagelayout: IWithPagelayout = (Component) => () =>
  Component ? (
    <div className={styles.wrapper}>
      <Component />
    </div>
  ) : null;

const getRedirectInfo = (level: Role, role: Role): boolean => {
  if (level === Role.Guest) return true;
  if (level === Role.User) return role === Role.User || role === Role.Admin;
  if (level === Role.Admin) return role === Role.Admin;
  return false;
};

export const PageLayout: React.FC<IPageLayout> = ({ children, level }) => {
  const role = useSelector((state: RootState) => state.user.role);

  const isRoutePrivate = !getRedirectInfo(level, role);

  if (isRoutePrivate) return <Navigate to={routes.login.path} />;

  return <div className={styles.wrapper}>{children}</div>;
};
