import { Typography, Button, Form, Input, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actions, Role, RootState } from '../../store';
import { useLocation, Navigate } from 'react-router-dom';
import { getRouteInfo } from '../../helpers';

export const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const role = useSelector((state: RootState) => state.user.role);

  const handleClick = () => {
    dispatch(actions.login());
  };

  const pageFrom: string = location.state?.location.pathname || '';
  const level: Role = location.state?.level || Role.User;
  const shouldReturn = !!pageFrom && getRouteInfo(level, role);

  if (shouldReturn) return <Navigate to={pageFrom} />;

  const onFinish = () => {
    dispatch(actions.login());
  };

  const onFinishFailed = () => {
    console.log('finish failed');
  };

  return (
    <>
      <Typography.Title>Login</Typography.Title>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <Button onClick={() => handleClick()}>Auth</Button> */}
    </>
  );
};
