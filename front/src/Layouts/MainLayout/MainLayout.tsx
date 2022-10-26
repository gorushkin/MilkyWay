import styles from './MainLayout.module.scss';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { flatRoutes } from '../../routes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface IMainLayout {
  children: JSX.Element;
}

export const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  const role = useSelector((state: RootState) => state.user.role);

  return (
    <Layout className={styles.container}>
      <Layout.Header>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
          {flatRoutes
            .filter(({ header }) => header[role])
            .map((route) => {
              return (
                <Menu.Item key={route.name}>
                  <Link to={route.path}>{route.name}</Link>
                </Menu.Item>
              );
            })}
        </Menu>
      </Layout.Header>
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};
