import Axios from "./core/Axios"
import { extend } from "./helpers/utils"
import { AxiosStatic } from "./types"
import { AxiosRequestConfig } from './types/index';
import defaults from './defaults';

const createInstance = (config: AxiosRequestConfig): AxiosStatic => {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

export default axios
