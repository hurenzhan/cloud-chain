import { RecordkeyType, RecordType } from '@/types/common'

export const forEach = (arr: string | any[], fn: (arg0: any, arg1: number, arg2: any) => void) => {
  if (!arr.length || !fn) return
  let i = -1
  const len = arr.length
  while (++i < len) {
    const item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = <T>(arr1: Array<T>, arr2: Array<T>): Array<T> => {
  const len = Math.min(arr1.length, arr2.length)
  let i = -1
  const res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = <T>(arr1: Array<T>, arr2: Array<T>): Array<T> => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = <T>(target: Array<T>, arr: Array<T>): Boolean => {
  return target.some(_ => arr.indexOf(_) > -1)
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  return function (element: Element, event: string, handler: EventListenerOrEventListenerObject) {
    if (element && event && handler) {
      element.addEventListener(event, handler, false)
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  return function (element: Element, event: string, handler: EventListenerOrEventListenerObject) {
    if (element && event) {
      element.removeEventListener(event, handler, false)
    }
  }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: RecordType, key: RecordkeyType) => {
  if (key) return key in obj
  else {
    const keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1: RecordType, obj2: RecordType) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}
