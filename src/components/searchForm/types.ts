import { RecordType } from "@/types/common";

export enum FORM_ITEM_ENUM {
  INPUT,
}

export interface FormItemType {
  type: number;
  key: string;
  label: string;
  widgetAttrs?: object;
  options?: ItemOptionsType;
}

export interface ItemOptionsType {
  initialValue: any;
  rules: object | object[];
}

export type SearchFunction = (modelRef: RecordType) => void;

export type ResetFunction = (modelRef: RecordType) => void;