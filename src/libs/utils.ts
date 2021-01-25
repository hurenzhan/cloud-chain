import { Array2D, RecordType, StrNum, StrNumUnd } from '@/types/common'
import router from '@/router'
import { baseUrl } from './request'


export const TOKEN_KEY = 'token'
export const USER_INFO = 'userInfo'

/**
 * @param {String} token
 * @description 设置 token
 */
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * @returns {String}
 * @description 获取 token
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * @param {String} info
 * @description 设置用户信息
 */
export const setUserInfo = (info: object) => {
  localStorage.setItem(USER_INFO, JSON.stringify(info))
}

/**
 * @description 获取用户信息
 */
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USER_INFO) as string)
}

/**
 * @description 清空登录信息
 */
export const LoginOut = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO);
  window.location.assign(baseUrl)
}


/**
 * @param {Array} dict 数据字典
 * @param {*} index 索引
 * @param {*} indexType 索引类型
 * @returns {*} 索引值
 * @description 查询字典，传key返回value，反之返回key
 */
export const findDict = (dict: Array2D, index: StrNum, indexType = 0): StrNumUnd => dict.find((item: StrNum[]) => item[indexType] === index)?.[indexType ^ 1]

/**
 * @description 正则索引
 */
export const regs = {
  // 手机号
  phone: /^1(3|4|5|6|7|8|9)\d{9}$/
}

/**
 * @description 返回上一页
 */
export const pageBack = () => {
  router.back();
}

/**
 * @param {String | Blob} source 下载地址，也可以是一个blob对象，必选
 * @param {String} fileName 保存文件名，可选
 */
export const exportFile = (source: string | Blob, fileName?: string) => {
  const selfURL = window[window.webkitURL ? 'webkitURL' : 'URL'];
  if (typeof source === 'object' && source instanceof Blob) {
    source = selfURL.createObjectURL(source); // 创建blob地址
  }
  const alink = document.createElement('a');
  if ('download' in alink) {
    alink.download = fileName || `${new Date().getTime()}`;
    alink.style.display = 'none';
    alink.href = source;
    document.body.appendChild(alink);
    alink.click();
    selfURL.revokeObjectURL(alink.href);
    document.body.removeChild(alink);
  } else {
    navigator.msSaveBlob(source, fileName);
  }
};

/**
 * @param {Array} source 表格数据
 * @param {Object} condition 搜索条件
 * @returns {*} 过滤后的数据
 * @description 模糊表格搜索
 */
export const handleTableSearch = (source: RecordType[], condition: RecordType) => source?.
  filter(item => Object.keys(item)?.
    every(key => `${item[key]}`?.includes(condition[key] || ''))
  )

/**
 * @param {string | number} value 复制内容
 * @description 复制数据
 */
export const handleCopy = (value: string) => {
  const input = document.createElement("input");
  input.value = value;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
}

