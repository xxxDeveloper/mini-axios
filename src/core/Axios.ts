import dispatchRequest from "./dispatchRequest";
import { AxiosRequestConfig, AxiosPromise, Method } from '../types/index';

export default class Axios {
  // request
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    return  dispatchRequest(config)
  }

  // get
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  // delete
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  // head
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  // options
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  // post
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  // put
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  // patch
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  // 没有数据的请求方法
  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  // 带有数据的请求方法
  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
