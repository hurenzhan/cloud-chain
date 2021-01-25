// 原厂标签信息
export interface OriginTagInfo {
  brandName: string;
  count: number;
  pid: number;
  status: number;
  typeName: string;
  id: number
}

// 原厂标签列表
export interface OriginTagPage {
  pageInfo: OriginTagInfo[];
  total: number;
}
