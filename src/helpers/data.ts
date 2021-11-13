import { isPlainObject } from "./utils";

// 处理请求的data
export const transformRequest = (data: any): any => {
  if (isPlainObject(data)) return JSON.stringify(data);
  return data
}

// 处理返回的data
export const transformResponse = (data: any): any => {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}

