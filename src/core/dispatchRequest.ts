import { buildURL } from '../helpers/url';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index';
import xhr from './xhr';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders } from '../helpers/headers';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理配置
const processConfig =(config: AxiosRequestConfig): void => {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理URL
const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理请求的data
const transformRequestData = (config: AxiosRequestConfig): unknown => {
  return transformRequest(config.data)
}

// 处理headers
const transformHeaders = (config: AxiosRequestConfig): unknown => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 处理返回的data
const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}
