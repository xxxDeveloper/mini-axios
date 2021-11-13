import { isPlainObject } from "./utils";

export const transformRequest = (data: any): any => {
  if (isPlainObject(data)) return JSON.stringify(data);
  return data
}

