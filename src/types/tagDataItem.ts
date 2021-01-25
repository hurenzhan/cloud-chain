// 标签数据项信息
export interface TagDataItemInfo {
  count: number;
  createId: number;
  createName: string;
  createTime: string;
  enabled: number;
  id: number;
  isEdit: number;
  isItemDetail: number;
  isItemReceipt: number;
  isPrimaryKey: number;
  isRequired: number;
  modifyId: number;
  modifyName: string;
  modifyTime: string;
  name: string;
  operatorId: number;
  operatorName: string;
  parentTagId: number;
  pid: number;
  remarks: string;
  status: number;
  tagId: number;
}

// 标签数据项分页
export interface TagDataItemPage {
  pageInfo: TagDataItemInfo[];
  total: number;
}