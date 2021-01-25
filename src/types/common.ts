export type RecordkeyType = string | number | symbol | any

export type RecordType = Record<RecordkeyType, any>

export type StrNum = string | number

export type StrNumUnd = string | number | undefined

export type Array2D = Array<[any, any]>

export interface UploadFile {
    uid: string;
    name: string;
    status: string;
    type: string;
    size: number;
    response: RecordType;
    linkProps: RecordType;
    xhr: RecordType;
    originFileObj: File;
}
export interface UploadInfoType {
    file: UploadFile;
    fileList: UploadFile[];
    event?: ProgressEvent;
}