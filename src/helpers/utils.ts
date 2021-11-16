const toString = Object.prototype.toString

// 是否是日期类型
export const isDate = (val: unknown): val is Date => {
  return toString.call(val) === '[object Date]'
}

// 是否是普通对象
export const isPlainObject = (val: unknown): val is Object => {
  return toString.call(val) === '[object Object]'
}

// 是否是FormData
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
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

// 混合对象
export const extend = <T, U>(to: T, from: U): T & U => {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}


// 深合并
export function deepMerge(...objs: any[]): any {
  const ret = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(ret[key])) {
            ret[key] = deepMerge(ret[key], val)
          } else {
            ret[key] = deepMerge(val)
          }
        } else {
          ret[key] = val
        }
      })
    }
  })

  return ret
}
