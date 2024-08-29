import { MenuItem, UserInfo } from './types/account';

const isDev = process.env.NODE_ENV === 'development';
const loopMenu = (menu: MenuItem[], target: Map<string, MenuItem>) => {
  // 将所有菜单层级展开
  if (menu?.length) {
    menu.map((menuItem) => {
      if (menuItem) {
        loopMenu(menuItem.children, target);
        const key =
          menuItem.type === 'button' ? menuItem.permission : menuItem.path;
        target.set(key, menuItem);
      }
    });
  }
};

export default function access(
  initialState: { userInfo?: UserInfo; menusStr?: string } | undefined,
) {
  const { userInfo, menusStr } = initialState ?? {};
  const hasLogin = userInfo && userInfo.id;
  const accessObj: { [key: string]: boolean } = {};
  const menusMap = new Map();
  if (menusStr) {
    const menu = JSON.parse(menusStr);
    loopMenu(menu.children, menusMap);
    menusMap.forEach((value) => {
      if (value.permission) accessObj[value.permission] = true;
    });
  }
  const { pma_menu_add, pma_menu_export, pma_menu_view } = accessObj;
  // 本地环境的话不需要路由权限
  return {
    ...accessObj,
    hasLogin,
    // normalRouteFilter: hasLogin
    //   ? (route: MenuItem) => isDev || menusMap.has(route.path)
    //   : false,
    normalRouteFilter: true,
    pma_menu_export,
    pma_menu_add,
    pma_menu_view,
  };
}
