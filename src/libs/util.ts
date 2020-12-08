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