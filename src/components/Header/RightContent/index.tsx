import React from 'react';

import { Space } from 'antd';

import AppsDropdown from './AppsDropdown';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const HeaderRight: React.FC = () => {
  return (
    <Space className={`${styles.right}`}>
      <AppsDropdown />
      <Avatar />
    </Space>
  );
};
export default HeaderRight;
