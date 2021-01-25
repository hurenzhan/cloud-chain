import { request } from '@/libs/request'

type UrlType = Record<string, [string, string, object?]>

class Dispatch {
  private url: UrlType
  constructor(url: UrlType) {
    this.url = url
  }

  use(todo: string, dataset = {}): Promise<any> {
    const args = this.url[todo]
    if (!args) {
      throw new Error('参数正确，请检查API方法定义')
    }
    if (args.length > 2) {
      args.splice(-1, 1, dataset)
    } else {
      args.push(dataset)
    }
    return request.apply(this, args)
  }
}

export default Dispatch