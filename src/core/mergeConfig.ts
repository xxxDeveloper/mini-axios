import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/utils'

// 合并策略函数map
const strats = Object.create(null)

// 默认合并策略
const defaultStrat = (val1: any, val2: any): any => {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取val2的策略
const fromVal2Strat = (val1: any, val2: any): any => {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 深度合并策略
const deepMergeStrat = (val1: any, val2: any): any => {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers']

// 对headers字段的合并策略
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

const mergeConfig = (
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig => {
  if (!config2) config2 = {};

  const config = Object.create(null)

  const mergeField = (key: string): void =>  {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  // config2
  for (let key in config2) {
    mergeField(key)
  }

  // config1
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  return config
}

export default mergeConfig
