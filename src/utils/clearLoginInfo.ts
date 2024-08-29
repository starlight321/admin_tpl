import { ADMIN_MENUS, HOSTNAME, TOKEN, USER_INFO } from '@/utils/enumeration';
import Cookie from 'js-cookie';
const removeDomainToken = (domainName: string, url: string) => {
  // 清除各个环境的指定的cookie
  if (!domainName || !url) {
    return;
  }
  const splitUrl = url.match(/\.(\S*)/);
  const domainUrl = splitUrl?.[0];
  const remainURL = splitUrl?.[1];
  Cookie.remove(domainName, { domain: domainUrl });
  if (!remainURL) {
    return;
  }
  removeDomainToken(domainName, remainURL);
};

export const clearToken = () => {
  removeDomainToken(TOKEN, HOSTNAME);
  const adminsMenus = localStorage.getItem(ADMIN_MENUS);
  if (adminsMenus) {
    JSON.parse(adminsMenus).map((item: any) => {
      if (item.children) {
        item.children.map((menu: any) => {
          localStorage.removeItem(menu.label);
        });
      }
    });
  }
  // 防止 ADMIN_MENUS 被手动删除 就无法循环删掉 APPNAME
  localStorage.removeItem(APP_NAME);
  localStorage.removeItem(USER_INFO);
  localStorage.removeItem(ADMIN_MENUS);
};
