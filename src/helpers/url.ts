import { encode, isDate, isPlainObject, isUrlSearchParams } from "./utils";

interface URLOrigin {
  protocol: string
  host: string
}

/**
 * 将params拼接至url上
 *
 * @param {string} url
 * @param {*} params
 * @returns {*}
 */
export const buildURL = (
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string => {
  if (!params) return url;

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isUrlSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    // 键值对数组
    const parts: string[] = []

    // 处理params
    Object.keys(params).forEach((key) => {
      let val = params[key]

      if (val === null || typeof val === 'undefined') return;

      let values: string[]

      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach((val) => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)

      })
    })

    // 进行params拼接
    serializedParams = parts.join('&')

  }

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

const resolveURL = (url: string): URLOrigin => {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}

// 判断是否是同源
export const isURLSameOrigin = (requestURL: string): boolean => {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)
