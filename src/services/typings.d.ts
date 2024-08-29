declare namespace Common {
  interface ProvincesAndCityVO {
    id: string;
    levelId: string;
    name: string;
    parentCode: string;
    code: string;
    children: ProvincesAndCityVO[];
  }

  interface TreeByTypeToB {
    status: number; // 0 启用，1停用
    itemValue: string;
    itemKey: string;
    children?: TreeByTypeToB[];
  }
}
