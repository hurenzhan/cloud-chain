export interface UserInfo {
  avatar: string;
  captcha: string;
  count: number;
  enterpriseId: number;
  enterpriseName: string;
  inviteCode: string;
  name: string;
  password: string;
  phoneNo: string;
  pid: number;
  roleId: number;
  status: number;
  token: string;
  id: number;
}

export interface UserPage {
  pageInfo: UserInfo[];
  total: number;
}

export interface InviteInfo {
  operatorId?: any;
  operatorName?: any;
  deadline: Date;
  url: string;
  pid?: any;
}