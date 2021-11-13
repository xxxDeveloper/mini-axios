import { buildURL } from './helpers/url';
import { AxiosPromise, AxiosRequestConfig } from './types/index';
import xhr from './xhr';
import { transformRequest } from './helpers/data';
import { processHeaders } from './helpers/headers';

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config)
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
  return buildURL(url, params)
}

// 处理data
const transformRequestData = (config: AxiosRequestConfig): unknown => {
  return transformRequest(config.data)
}

// 处理headers
const transformHeaders = (config: AxiosRequestConfig): unknown => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
