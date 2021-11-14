import { parseHeaders } from "../helpers/headers";
import { AxiosRequestConfig, AxiosResponse } from "../types";
import { AxiosPromise } from '../types/index';
import { createError } from '../helpers/error';

const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    // 处理请求返回
    request.onreadystatechange = () => {
      if (request.readyState !== 4) return;

      if (request.status === 0) return;

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        (responseType && responseType !== 'text')
          ? request.response
          : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 处理错误
    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }

    // 处理超时
    request.ontimeout = () => {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 处理headers
    Object.keys(headers).forEach((name) => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 发送请求
    request.send(data)

    // 处理返回内容
    const handleResponse = (response: AxiosResponse): void => {
      if (response.status >= 200 && response.status <  300) {
        resolve(response)
      } else {
        reject(createError(`Request failed whit status code ${request.status}`, config, null, request, response))
      }
    }
  })
}

export default xhr
