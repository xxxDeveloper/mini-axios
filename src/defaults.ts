import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/headers';
import { AxiosRequestConfig } from './types/index';

// 默认配置
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF_TOKEN',
  xsrfHeaderName: 'X-XSRF_TOKEN',
  transformRequest: [
    (data: any, headers: any): any => {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    (data: any): any =>  {
      return transformResponse(data)
    }
  ],
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

// delete、get、head、options
// 默认不添加headers
const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

// post、put、patch
// 默认headers为form data类型
const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
