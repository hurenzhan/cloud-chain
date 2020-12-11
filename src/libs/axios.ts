import axios, { AxiosInstance, AxiosRequestConfig, Canceler } from 'axios'
// import { Spin } from 'iview'
import publicConfig from '@/config'
import { getToken } from './util'

const CancelToken = axios.CancelToken

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

  // 设定拦截器
  interceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const isPublic = publicConfig.publicPath.some((path: RegExp) => path.test(config.url || ''))
        const token = getToken()
        if (!isPublic && token) config.headers.Authorization = 'Bearer ' + token
        const key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken((c: Canceler) => {
          this.pending[key] = c
        })
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    // 响应请求的拦截器
    instance.interceptors.response.use(
      (res) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      (err) => {
        return Promise.reject(err)
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
