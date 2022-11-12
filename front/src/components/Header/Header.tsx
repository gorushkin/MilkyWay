import styles from './Header.module.scss';
import { Layout } from 'antd';

import { User } from '../User/User';
import { Navigation } from '../Navigation/Navigation';

export const Header = () => {
  return (
    <Layout.Header className={styles.menuWrapper}>
      <Navigation />
      <User />
    </Layout.Header>
  );
};
