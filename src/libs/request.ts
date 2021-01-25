import HttpRequest from '@/libs/axios'
import config from '@/config'
import { getToken } from '@/libs/utils'
import qs from 'qs'

export const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)

const request = (url: string, method: string, dataset: object = {}) => {
  return axios.request({
    url: url,
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'application/json',
      'cached-control': 'no-cache'
    },
    method: method,
    [method === 'get' ? 'params' : 'data']: dataset,
    paramsSerializer: (params: Record<string, any>): string => qs.stringify(params)
  })
}

export {
  axios,
  request
}
