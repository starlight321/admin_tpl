import { getMenuList, getUser, login } from '@/services/user';
import { UserInfo } from '@/types/account';
import {
  ADMIN_MENUS,
  DOMAIN,
  LOGIN_PATH,
  TOKEN,
  USER_INFO,
} from '@/utils/enumeration';
import { checkURL, getQueryString } from '@/utils/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Card, Form, Input, Row } from 'antd';
import Cookie from 'js-cookie';
import styles from './index.less';

const Login = () => {
  const { setInitialState } = useModel('@@initialState');

  /* ******************************** 登录操作 ******************************** */
  const getMenuByUser = async () => {
    const menus = await getMenuList();
    if (menus) {
      menus.map((menu) => {
        return menu.children?.map((item) => {
          if (!checkURL(item.path)) {
            item.path = `${DOMAIN}${item.path}/`;
          }
          localStorage.setItem(item.label, JSON.stringify(item));
          return item;
        });
      });
      localStorage.setItem(ADMIN_MENUS, JSON.stringify(menus));
    }
  };

  const getToken = async (
    loginParams: { values: USER.LoginParams; redirect: string },
    userCallback: (val: UserInfo) => void,
  ) => {
    let token = null;
    token = await login(loginParams.values);

    if (token) {
      if (token && token.loginToken) {
        Cookie.set(TOKEN, token.loginToken, {
          expires: new Date(token.expiredTime),
        });
      } else {
        document.location.href = LOGIN_PATH;
      }
      const [user] = await Promise.all([getUser(), getMenuByUser()]);
      if (user) {
        localStorage.setItem(USER_INFO, JSON.stringify(user));
        userCallback(user);
      }
      if (loginParams.redirect) {
        document.location.href = loginParams.redirect;
      } else {
        document.location.href = DOMAIN;
      }
    }
  };

  /* ********************************登录操作 ******************************** */

  function handleSubmit(values: USER.LoginParams) {
    const params = getQueryString('redirect');
    const loginParams = {
      values,
      redirect: params,
    };
    // 登录按钮点击方法
    getToken(loginParams, (userInfo) =>
      setInitialState((pre) => ({ ...pre, userInfo })),
    );
  }

  return (
    <Row className={styles.container}>
      <Card
        className={styles.content}
        style={{ width: 400 }}
        bodyStyle={{ width: '100%' }}
      >
        <h2 className={styles.title}>统一登录平台</h2>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ username: '', password: '', verifyCode: '1234' }}
          onFinish={handleSubmit}
        >
          {/* <Form name="basic" wrapperCol={{ span: 24 }} initialValues={user} onFinish={handleSubmit}> */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: '用户名不能为空' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className={styles.prefixIcon} />}
              placeholder="用户名：请输入用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className={styles.prefixIcon} />}
              placeholder="密码：请输入密码"
            />
          </Form.Item>
          <Form.Item name="verifyCode" hidden>
            <Input />
          </Form.Item>
          <Form.Item className={styles.sub} wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};

export default Login;
