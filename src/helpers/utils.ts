const toString = Object.prototype.toString

// 是否是日期类型
export const isDate = (val: unknown): val is Date => {
  return toString.call(val) === '[object Date]'
}

// 是否是普通对象
export const isPlainObject = (val: unknown): val is Object => {
  return toString.call(val) === '[object Object]'
}

// 进行编码
export const encode = (val: string): string => {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
