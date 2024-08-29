import { MenuItem, UserInfo } from '@/types/account';
import request from '@/utils/_request';

const URI = {
  LOGIN: '/boss/auth/loginByPhone',
  OUT_LOGIN: '/boss/auth/logout',
  GET_USER: '/boss/auth/getUser',
  GET_MENU_LIST: '/boss/auth/getMenuByType/1',
};

/** 登录 获取token */
export const login = (data: USER.LoginParams) => {
  return request.post(URI.LOGIN, { data, isNormal: true });
};

// 登出
export const outLogin = async () => {
  return request.post(URI.OUT_LOGIN, { isNormal: true });
};

/** 获取用户信息 */
export const getUser = async () => {
  return request.get<UserInfo>(URI.GET_USER, { isNormal: true });
};

/** 获取权限菜单 */
export const getMenuList = () => {
  return request.get<MenuItem[]>(URI.GET_MENU_LIST, { isNormal: true });
};
