import Axios from "./core/Axios"
import { extend } from "./helpers/utils"
import { AxiosStatic } from "./types"
import { AxiosRequestConfig } from './types/index';
import defaults from './defaults';
import mergeConfig from "./core/mergeConfig";
import CancelToken from "./cancel/CancelToken";
import Cancel from "./cancel/Cancel";
import isCancel from "./cancel/isCancel";


const createInstance = (config: AxiosRequestConfig): AxiosStatic => {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = (config: AxiosRequestConfig) => {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
