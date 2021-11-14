import { AxiosTransformer } from '../types'

const transform = (
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any => {
  if (!fns) return data;

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}

export default transform
