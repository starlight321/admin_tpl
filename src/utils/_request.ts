import { AxiosRequestConfig, request } from '@umijs/max';

type Options = Omit<AxiosRequestConfig, 'method' | 'responseType'> & {
  isNormal?: boolean;
};

const defaultHeader = {
  'Content-Type': 'application/json;charset=UTF-8',
};

const customRequest =
  (method: 'POST' | 'GET' | 'DELETE' | 'PUT') =>
  <T = any>(url: string, options: Options = {}) => {
    if (options.isNormal) {
      return request<IResponse<T>>(url, {
        ...options,
        headers: { ...defaultHeader, ...options.headers },
        method,
      }).then((rs) => {
        if (rs?.code !== 0) throw rs as any;
        return rs?.result;
      });
    }
    return request<ShopResponse<T>>(url, {
      ...options,
      headers: { ...defaultHeader, ...options.headers },
      method,
    }).then((rs) => {
      if (Number(rs?.resultCode) !== 0) throw rs as any;
      return rs?.data;
    });
  };

const requestBlob =
  (method: 'POST' | 'GET') =>
  (url: string, options: Options = {}) => {
    return request<Blob>(url, { ...options, method }).then(async (rs) => {
      if (rs.type === 'application/json') {
        throw JSON.parse(await rs.text()) as any;
      }
      return rs;
    });
  };

export default {
  get: customRequest('GET'),
  del: customRequest('DELETE'),
  put: customRequest('PUT'),
  post: customRequest('POST'),
  postBlob: requestBlob('POST'),
  getBlob: requestBlob('GET'),
};
