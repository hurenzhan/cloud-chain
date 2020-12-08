import { request } from '@/libs/request'
import { AxiosPromise } from 'axios'

class Dispatch {
  private url
  constructor(url: Record<string, [string, string, object?]>) {
    this.url = url
  }

  use(todo: string, dataset: object): AxiosPromise<any> {
    const args = this.url[todo]
    if (!args) {
      throw new Error('参数正确，请检查API方法定义')
    }
    // args[2] = dataset
    if (args.length > 2) {
      args.splice(-1, 1, dataset)
    } else {
      args.push(dataset)
    }
    return request.apply(this, args)
  }
}

export default Dispatch