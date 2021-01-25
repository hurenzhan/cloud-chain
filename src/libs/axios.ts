import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'
import publicConfig from '@/config'
import { getToken, LoginOut } from './utils'

const CancelToken = axios.CancelToken

import { notification } from 'ant-design-vue';

class HttpRequest {
  private baseUrl: string
  private pending: Record<string, Canceler>

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.pending = {}
  }

  // 获取axios配置
  getInsideConfig() {
    const config: AxiosRequestConfig = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending(key: string, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  verifyStatus(res: AxiosResponse<any>) {
    const { code, message } = res.data
    if (code) {
      notification.error({
        message: code,
        description: message,
      });
      if (code === 401) {
        setTimeout(() => {
          LoginOut()
        }, 1000)
      } else return false
    }
    return true
  }

  // 设定拦截器
  interceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const isPublic = publicConfig.publicPath.some((path: RegExp) => path.test(config.url || ''))
        const token = getToken()
        if (!isPublic && token) config.headers.Authorization = token
        const key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken((c: Canceler) => {
          this.pending[key] = c
        })
        return config
      },
      (err) => {
        return Promise.resolve([err, null])
      }
    )

    // 响应请求的拦截器
    instance.interceptors.response.use(
      (res): Promise<any> => {
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        if (res.status === 200) {
          if (this.verifyStatus(res)) {
            return Promise.resolve([null, res.data])
          }
          return Promise.resolve([res.data, null])
        } else {
          return Promise.resolve([res.data, null])
        }
      },
      (err) => {
        return Promise.resolve([err, null])
      }
    )
  }

  // 创建实例
  request(options: Record<string, any>) {
    const instance = axios.create()
    const newOptions: AxiosRequestConfig = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get(url: string, config?: Record<string, any>) {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.request(options)
  }

  post(url: string, data: Record<string, any>) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}
export default HttpRequest
