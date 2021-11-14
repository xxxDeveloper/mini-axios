import Cancel from "./Cancel"

const isCancel= (value: any): boolean => {
  return value instanceof Cancel
}

export default isCancel
