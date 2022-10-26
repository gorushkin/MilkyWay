import styles from './MainLayout.module.scss';
import { Layout } from 'antd';
import React from 'react';
import { Header } from '../../components/Header/Header';

interface IMainLayout {
  children: JSX.Element;
}

export const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <Layout className={styles.container}>
      <Header />
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};
