import { Role } from '../../store';
import styles from './PageLayout.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import { getRouteInfo } from '../../helpers';

interface IPageLayout {
  children: JSX.Element;
  level: Role;
}

export const PageLayout: React.FC<IPageLayout> = ({ children, level }) => {
  const role = useSelector((state: RootState) => state.user.role);
  const isRoutePrivate = !getRouteInfo(level, role);
  const location = useLocation();

  if (isRoutePrivate) return <Navigate to={routes.login.path} state={{ location, level }} />;

  return <div className={styles.wrapper}>{children}</div>;
};
