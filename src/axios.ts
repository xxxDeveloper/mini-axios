import Axios from "./core/Axios"
import { extend } from "./helpers/utils"
import { AxiosStatic } from "./types"

const createInstance = (): AxiosStatic => {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance()

export default axios
