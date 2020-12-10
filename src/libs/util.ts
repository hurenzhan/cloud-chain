import { Array2D, StrNum } from '@/types/common'

export const TOKEN_KEY = 'token'

// /**
//  * @param {String} token
//  * @description 设置 token
//  */
// export const setToken = (token: String) => {
//   return ''
// }

/**
 * @returns {String}
 * @description 获取 token
 */
export const getToken = (): string => localStorage.getItem(TOKEN_KEY) || ''

/**
 * @param {Array} dict
 * @param {*} index
 * @returns {*} 索引值
 * @description 查询字典，传key返回value，反之返回key
 */
export const findDict = (dict: Array2D, index: StrNum): StrNum => dict.find(item => item?.includes(index))?.[0]