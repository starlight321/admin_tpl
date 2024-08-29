import request from '@/utils/_request';

const URI = {
  GET_PROVINCES_AND_CITIES: '/crmcenteryunxi/api/data/v4/area/tree',
  GET_DICTIONARY_CONFIG: '/boss/dict/treeByType',
};

/** 获取省市区  */
export const getProvincesAndCities = () =>
  request.get<Common.ProvincesAndCityVO[]>(URI.GET_PROVINCES_AND_CITIES);

/** 获取字典配置  */
export const getDictionaryConfig = (dictType: string) =>
  request.get<Common.TreeByTypeToB[]>(
    `${URI.GET_DICTIONARY_CONFIG}/${dictType}`,
    { isNormal: true },
  );
