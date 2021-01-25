
// 编码规则信息
export interface CodeRuleInfo {
  count: number;
  hasDate: number;
  hasOrderId: number;
  hasRandomId: number;
  hasSerialId: number;
  name: string;
  pid: number;
  prefix: string;
  randomIdSize: number;
  serialIdSize: number;
  status: number;
  id: number;
}

// 编码规则列表
export interface CodeRulePage {
  pageInfo: CodeRuleInfo[];
  total: number;
}

// 箱码规则信息
export interface PackageCodeRuleInfo {
  count: number;
  createId: number;
  createName: string;
  createTime: string;
  enabled: number;
  hasDate: number;
  hasOrderId: number;
  hasRandomId: number;
  hasSerialId: number;
  id: number;
  modifyId: number;
  modifyName: string;
  modifyTime: string;
  name: string;
  operatorId: number;
  operatorName: string;
  pid: number;
  prefix: string;
  randomIdSize: number;
  remarks: string;
  serialIdSize: number;
  status: number;
}




