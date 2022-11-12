import { Menu } from 'antd';
import styles from './Navigation.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { flatRoutes } from '../../routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Navigation = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const { pathname } = useLocation();

  const currentRoute = flatRoutes.find((route) => route.path === pathname);

  return (
    <Menu selectable={false} className={styles.wrapper} theme='dark' mode='horizontal'>
      {flatRoutes
        .filter(({ header }) => header[role])
        .map((route) => {
          return (
            <Menu.Item
              className={
                currentRoute?.path === route.path
                  ? 'ant-menu-item-active ant-menu-item-selected'
                  : ''
              }
              key={route.name}
            >
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};
