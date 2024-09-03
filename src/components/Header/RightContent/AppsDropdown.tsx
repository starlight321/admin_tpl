import React, { useCallback } from 'react';

import { AppstoreOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import _ from 'lodash';

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
    projectNotice = _.uniqBy(
      projectNotice.concat(app?.children || []),
      'menuId',
    );
  });
  projectNotice.unshift({
    name: '工作台',
    path: `${DOMAIN}`,
    Avatar: '',
    type: 'app',
    menuId: '-1',
  });
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const onMenuClick = useCallback((item: any) => {
    window.location.href = `${item.path}?skipBy=menu`;
  }, []);

 const menuItems = projectNotice
    .filter((item) => !item.hideInMenu)
    .map((app: any) => ({
      key: app.menuId,
      label: (
        <div>
          <Avatar className={styles.cardAvatar} size="small" src={app.icon}>
            {app.name.substr(0, 1)}
          </Avatar>
          <span className={styles.itemName}>{app.name}</span>
        </div>
      ),
    }));

  return (
    <Dropdown  menu={{ selectedKeys: [], onClick: onMenuClick, items: menuItems }}>
      <span className={`${styles.action} ${styles.account}`}>
        <AppstoreOutlined style={{ paddingRight: '6px' }} />
        <span className={`${styles.name} anticon`}>工作台</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;
