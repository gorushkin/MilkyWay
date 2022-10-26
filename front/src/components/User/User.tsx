import { Menu, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Role, RootState, actions } from '../../store';
import styles from './User.module.scss';

export const User = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const dispatch = useDispatch();
  const isUserLogged = role !== Role.Guest;
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/');
    dispatch(actions.logout());
  };

  return (
    <Menu
      selectable={false}
      inlineCollapsed={true}
      className={styles.wrapper}
      theme='dark'
      mode='horizontal'
    >
      <Menu.Item title={false}>
        {isUserLogged ? (
          <Typography.Text onClick={handleLogoutClick} className={styles.userLink}>
            Logout
          </Typography.Text>
        ) : (
          <Link className={styles.userLink} to={'/login'}>
            Login
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
};
