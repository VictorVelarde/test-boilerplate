import axios from 'axios'
import { getCache, setCache, removeRequest } from './cache'

const CancelToken = axios.CancelToken

const PENDING_REQUESTS = {}

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

const METHODS = {
  request: axiosInstance.request,
  head: axiosInstance.head,
  options: axiosInstance.options,
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  patch: axiosInstance.patch,
  delete: axiosInstance.delete
}

function getRequestId (method, config) {
  const url = config[0]
  let body

  if (method === 'post' || method === 'put' || method === 'patch') {
    body = config[1]

    if (typeof body !== 'string') {
      body = JSON.stringify(body)
    }
  }

  return `${method} ${url} ${body || ''}`.trim()
}

function getKeyRequest (config) {
  return getRequestId(config.method, [
    config.url,
    config.data
  ])
}

function handlePendingRequest (config, cancelFn) {
  const key = getKeyRequest(config)

  PENDING_REQUESTS[key] = cancelFn
}

axiosInstance.interceptors.request.use(config => {
  config.cancelToken = new CancelToken(cancelFn => {
    handlePendingRequest(config, cancelFn)
  })
  return config
})

axiosInstance.interceptors.response.use(
  response => {
    const key = getKeyRequest(response.config)
    removeRequest(key)
    return response
  },
  error => {
    const requestConfig = error.response ? error.response.config : error.config
    const key = getKeyRequest(requestConfig)
    removeRequest(key)

    return Promise.reject(error)
  }
)

export function clearRequests () {
  Object.keys(PENDING_REQUESTS).forEach(key => {
    const cancelFn = PENDING_REQUESTS[key]
    if (cancelFn) {
      cancelFn()
      removeRequest(key)
    }
  })
}

function handlerCache (method, params) {
  const key = getRequestId(method, params)
  if (getCache(key)) {
    return getCache(key)
  }
  const promise = METHODS[method](...params)

  setCache(key, promise)
  return promise
}

export function setToken (token) {
  axiosInstance.defaults.headers.Authorization = token
}

export default Object.keys(METHODS).reduce((acum, current) => {
  acum[current] = (...args) => handlerCache(current, args)
  return acum
}, {
  ...axiosInstance
})
