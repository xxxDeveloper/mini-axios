import { bulidURL } from './helpers/url';
import { AxiosRequestConfig } from './types/index';
import xhr from './xhr';

const axios = (config: AxiosRequestConfig) => {
  processConfig(config)
  xhr(config)
}

// 处理配置
const processConfig =(config: AxiosRequestConfig): void => {
  config.url = transformURL(config)
}

// 处理URL
const transformURL = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
