import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import Cookie from 'js-cookie';
import {
  CODE_MESSAGE,
  LOGIN_MOBILE_URL,
  LOGIN_PATH,
  LOGIN_PATH_NAME,
  LOGIN_URL,
  TOKEN,
} from './enumeration';

/**
 * @name 错误处理
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  timeout: 40000,
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: any) => {
      console.log(error, 'requestConfig');
      const resultMsg = error?.response?.data?.resultMsg;
      notification.error({
        message: '请求错误',
        description: resultMsg || error?.message || '网络异常',
      });
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url || '';
      if (!config['login-token']) {
        if (Cookie.get(TOKEN)) {
          // @ts-ignore
          config.headers['login-token'] = Cookie.get(TOKEN);
        } else if (
          !url.includes(LOGIN_URL) &&
          !url.includes(LOGIN_MOBILE_URL)
        ) {
          // 请求拦截 token 失效走刷新流程
          document.location.href = LOGIN_PATH;
        }
      }
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      if (!response) {
        notification.error({
          description: '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
        return response;
      }

      const res = response.data as any;
      if (
        /^2\d{2}$/.test(JSON.stringify(response.status)) ||
        response.status === 304
      ) {
        const code = res.code ?? res.resultCode;
        if (code && Number(code) !== 0) {
          message.error(res.message || res.resultMsg || '网络异常');
          if (
            [1051, 1050, 403].includes(Number(code)) &&
            !document.location.href.includes(LOGIN_PATH_NAME)
          ) {
            // 这里未登录跳转
            document.location.href = LOGIN_PATH;
          }
          // return;
        }
        return response;
      }
      const errorText =
        CODE_MESSAGE[response.status as keyof typeof CODE_MESSAGE] ||
        response.statusText ||
        '网络异常';
      notification.error({ message: '请求错误', description: errorText });
      return response;
    },
  ],
};
