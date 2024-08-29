import React, { useCallback } from 'react';

import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

import { clearToken } from '@/utils/clearLoginInfo';

import { outLogin } from '@/services/user';
import { DOMAIN_LOGIN_PATH } from '@/utils/enumeration';
import { useModel } from '@umijs/max';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const setLogoutFn = async () => {
  // 退出登录请求后台token失效
  await outLogin();
  clearToken();
  document.location.href = DOMAIN_LOGIN_PATH;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState } = useModel('@@initialState');
  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      setLogoutFn();
    }
  }, []);

  const loading = (
    <span className={styles.actionWrap}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) return loading;

  const { userInfo } = initialState;

  if (!userInfo || !userInfo.userName) return loading;

  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <Dropdown
      menu={{ selectedKeys: [], onClick: onMenuClick, items: menuItems }}
    >
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={
            userInfo?.avatar ||
            'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          }
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{userInfo?.userName}</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;
