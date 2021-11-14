import { buildURL } from '../helpers/url';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index';
import xhr from './xhr';
import { flattenHeaders } from '../helpers/headers';
import transform from './transform';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理配置
const processConfig =(config: AxiosRequestConfig): void => {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理URL
const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理响应的data
const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

// 处理取消请求
const throwIfCancellationRequested = (config: AxiosRequestConfig): void => {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
