import { Array2D, StrNum, StrNumUnd } from '@/types/common'
import router from '@/router'

export const TOKEN_KEY = 'token'

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



