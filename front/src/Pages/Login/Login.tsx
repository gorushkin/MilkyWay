import { Typography, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store';

export const Login = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.login());
  };

  return (
    <>
      <Typography.Title>Login</Typography.Title>
      <Button onClick={() => handleClick()}>Auth</Button>
    </>
  );
};
