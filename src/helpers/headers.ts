import { isPlainObject } from './utils';

// 标准化headers
const normalizeHeaderName = (headers: any, normalizedName: string): void => {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 处理headers
export const processHeaders = (headers: any, data: any): any => {

  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 处理接口返回的headers
export const parseHeaders = (headers: string): any => {
  let parsed = Object.create(null)
  if (!headers)  return parsed;

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()

    if (!key) return;
    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}
