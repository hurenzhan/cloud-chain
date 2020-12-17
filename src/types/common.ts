export type RecordkeyType = string | number | symbol | any
 
export type RecordType = Record<RecordkeyType, any>

export type StrNum = string | number

export type StrNumUnd = string | number | undefined

export type Array2D = Array<[any, any]>

// 分页器
export interface PaginationType {
    total: string | number;
    current: number;
    showSizeChanger: boolean;
    showSizeChange: (current: number, size: number) => void;
    change: (current: number, size: number) => void;
    showTotal: (total: string | number) => string;
  }
