export type UserInfo = {
  id: number;
  mailAddress: string;
  imHeadUrl: string;
  imNickName: string;
  phone: string;
  userId: string;
  userName: string;
  avatar: string;
};

export type MenuItem = {
  id: number;
  menuId: string;
  code: string;
  name: string;
  permission: string;
  path: string;
  parentCode: string;
  label: string;
  icon: string;
  sort: number;
  type: string;
  status: number;
  desc: string;
  children: MenuItem[];
};
