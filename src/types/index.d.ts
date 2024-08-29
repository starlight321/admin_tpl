// declare interface Window {

// }

declare type Nullable<T> = T | null | undefined;

declare type IResponse<T = any> = {
  code: number;
  msg?: string;
  result: T;
};

declare type ShopResponse<T = any> = {
  resultCode: string;
  resultMsg?: string;
  data: T;
};

declare type PagParams<T extends any> = T & {
  pageNum: number;
  pageSize: number;
  orderBy?: string;
  orderType?: 'ASC' | 'DESC';
};
declare type PagRes<T = any> = { total: number; list: T[] };

declare const APP_NAME: string;

declare type SaLogicData<T extends any> = T & {
  status: 'fail' | 'success';
};

declare type OItem = {
  label: string;
  value: number | string;
  children?: OItem[];
};
