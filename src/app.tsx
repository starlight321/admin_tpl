import { errorConfig } from '@/utils/requestErrorConfig';
import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import RightContent from './components/Header/RightContent';
import { UserInfo } from './types/account';
import {
  DOMAIN_PATH_NAME,
  LOGIN_PATH,
  LOGIN_PATH_NAME,
  USER_INFO,
} from './utils/enumeration';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
  menusStr?: string;
  userInfo?: Partial<UserInfo>;
}> {
  const fetchAllMenu = () => {
    const menusStr = localStorage.getItem('system') || '';
    return menusStr;
  };
  const fetchUserInfo = () => {
    const userInfoStr = localStorage.getItem(USER_INFO);
    if (!userInfoStr) {
      document.location.href = LOGIN_PATH;
      return;
    }
    const userInfo = JSON.parse(userInfoStr);
    return userInfo;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== DOMAIN_PATH_NAME) {
    const [menusStr, userInfo] = await Promise.all([
      fetchAllMenu(),
      fetchUserInfo(),
    ]);
    return {
      menusStr,
      userInfo,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const { userInfo } = initialState || {};

  return {
    // actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    waterMarkProps: {
      content: `${userInfo?.userName} ${userInfo?.phone ?? userInfo?.id}`,
      gapX: 140,
      gapY: 120,
      fontSize: 14,
    },
    menu: { locale: false },
    rightContentRender: () => <RightContent />,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.userInfo && location.pathname !== DOMAIN_PATH_NAME) {
        history.push(LOGIN_PATH_NAME);
      }
    },
    // menuHeaderRender: (logo, title) => <MenuHeader {...{ logo, title }} />,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

//  配置，可以配置错误处理
export const request = {
  ...errorConfig,
};
