export const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '用户输入验证错误',
  401: '无鉴权',
  403: '未授权',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方式不允许',
  406: '请求的格式不可得。',
  408: '业务超时',
  409: '业务冲突',
  410: '请求的资源被永久删除，且不会再得到的。',
  413: '请求体太大',
  415: '不支持的Media类型',
  422: '不可处理的请求体',
  429: '过多的请求',
  500: '服务器内部错误',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const DOMAIN = (() => {
  if (!window.location.origin) {
    return `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ''
    }`;
  }
  const origin = window.location.origin;
  return origin.includes('localhost') || origin.includes('127.0.0.1')
    ? `${origin}/${APP_NAME}`
    : origin;
})();
export const HOSTNAME = window.location.hostname;
export const LOGIN_PATH_NAME = '/user/login';
export const DOMAIN_PATH_NAME = `/${APP_NAME}/user/login`;
export const DOMAIN_LOGIN_PATH = `${DOMAIN}/user/login`;
export const LOGIN_PATH = `${DOMAIN_LOGIN_PATH}?redirect=${document.location.href}`;
export const LOGIN_URL = '/auth/login';
export const LOGIN_MOBILE_URL = '/auth/loginByPhone';
export const REFRESH_LOGIN_URL = '/auth/getUser';
export const TOKEN = 'token';
export const USER_INFO = 'userInfo';
export const ADMIN_MENUS = 'admin_menus';
export const IS_LOCAL =
  DOMAIN.includes('localhost') || DOMAIN.includes('127.0.0.1');

export type MENU = {
  type?: string;
  icon?: string;
  label?: string;
  name?: string;
  path?: string;
  children?: any[];
};
