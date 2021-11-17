import { parseHeaders } from "../helpers/headers";
import { AxiosRequestConfig, AxiosResponse } from "../types";
import { AxiosPromise } from '../types/index';
import { createError } from '../helpers/error';
import { isURLSameOrigin } from "../helpers/url";
import cookie from "../helpers/cookie";
import { isFormData } from "../helpers/utils";

const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    // 配置请求
    configureRequest()

    // 添加事件函数
    addEvents()

    // 处理headers
    processHeaders()

    // 处理取消
    processCancel()

    // 发送请求
    request.send(data)

    // 配置请求
    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    // 添加事件函数
    function addEvents(): void {
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

      // 下载
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      // 上传
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    // 处理headers
    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = `Basic ${btoa(`${auth.username}:${auth.password}`)}`
      }

      // 处理headers
      Object.keys(headers).forEach((name) => {
        if (!data && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    // 处理取消
    function processCancel(): void {
      // 处理取消请求
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    // 处理返回内容
    const handleResponse = (response: AxiosResponse): void => {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(createError(`Request failed whit status code ${request.status}`, config, null, request, response))
      }
    }
  })
}

export default xhr
