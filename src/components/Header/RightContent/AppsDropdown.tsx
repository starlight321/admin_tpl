import React, { useCallback } from 'react';

import { AppstoreOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';

import { DOMAIN } from '@/utils/enumeration';

import { MenuItem } from '@/types/account';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

let projectNotice: Record<string, any>[] = [];
const menusStr = localStorage.getItem('admin_menus');
let menus: MenuItem[] = [];
if (menusStr) {
  menus = JSON.parse(menusStr);
  menus.forEach((app) => {
    projectNotice = projectNotice.concat(app?.children || []);
  });
  projectNotice.unshift({
    name: '工作台',
    path: `${DOMAIN}`,
    Avatar: '',
    type: 'app',
  });
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const onMenuClick = useCallback((item: any) => {
    window.location.href = `${item.path}?skipBy=menu`;
  }, []);
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      {projectNotice.map((app: any) => {
        return app.hideInMenu ? null : (
          <Menu.Item
            key={app.name}
            data-index={app}
            onClick={() => onMenuClick(app)}
          >
            {/* <Avatar size="small" src={app.icon} /> */}
            <Avatar className={styles.cardAvatar} size="small" src={app.icon}>
              {app.name.substr(0, 1)}
            </Avatar>
            <span className={styles.itemName}>{app.name}</span>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <AppstoreOutlined style={{ paddingRight: '6px' }} />
        <span className={`${styles.name} anticon`}>工作台</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;
