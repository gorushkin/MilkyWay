import { Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions, Role, RootState } from '../../store';
import { useLocation, Navigate } from 'react-router-dom';
import { getRouteInfo } from '../../helpers';

export const Login = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.user.role);

  const handleClick = () => {
    dispatch(actions.login());
  };

  const location = useLocation();
  const pageFrom: string = location.state?.location.pathname || '';
  const level: Role = location.state?.level || Role.User;

  const shouldReturn = !!pageFrom && getRouteInfo(level, role);

  if (shouldReturn) return <Navigate to={pageFrom} />;

  return (
    <>
      <Typography.Title>Login</Typography.Title>
      <Button onClick={() => handleClick()}>Auth</Button>
    </>
  );
};
