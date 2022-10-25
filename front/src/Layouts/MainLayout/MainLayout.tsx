import styles from './MainLayout.module.scss';
import { Layout } from 'antd';
import React from 'react';

interface IMainLayout {
  children: JSX.Element;
}

const MainLayout: React.FC<IMainLayout> = ({ children }) => (
  <Layout className={styles.container}>
    <Layout.Header>Header</Layout.Header>
    <Layout.Content className={styles.content}>{children}</Layout.Content>
  </Layout>
);

export default MainLayout;
