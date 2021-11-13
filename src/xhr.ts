import { AxiosRequestConfig } from "./types";

const xhr = (config: AxiosRequestConfig) => {
  const {
    data = null,
    url,
    method = 'get',
    headers
  } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach((name) => {
    if (!data && name.toLocaleLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}

export default xhr
