// 标签信息
export interface TagInfo {
  operatorId?: any;
  operatorName?: any;
  id: number;
  remarks: string;
  enabled: number;
  createId: number;
  createName: string;
  createTime: Date;
  modifyId: number;
  modifyName: string;
  modifyTime: Date;
  count?: any;
  parentTagId?: any;
  name: string;
  packageRuleId: number;
  packageRuleName: string;
  type: number;
  status: number;
  tagItemIdList?: any;
  pid?: any;
}

// 标签分页
export interface TagPage {
  pageInfo: TagInfo[];
  total: number;
}

// 装箱规则信息
export interface PackageRuleInfo {
  operatorId?: any;
  operatorName?: any;
  id: number;
  remarks: string;
  enabled: number;
  createId: number;
  createName: string;
  createTime: Date;
  modifyId: number;
  modifyName: string;
  modifyTime: Date;
  count?: any;
  parentTagId: number;
  name: string;
  packageRuleId: number;
  packageRuleName: string;
  type: number;
  status: number;
  tagItemIdList?: any;
  tagItemIdStr: string;
  tagItemNameStr: string;
  pid?: any;
}

// 装箱规则分页
export interface PackageRulePage {
  pageInfo: PackageRuleInfo[];
  total: number;
}

// 查询标签实例列表
export interface LabePaginate {
  headers: string[];
  labelList: any[];
  total: number;
}



