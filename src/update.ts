
export interface Update<T> {
  isUpdated: boolean,
  payload: T;
}

export function updated<T>(payload: T): Update<T> {
  return {
    isUpdated: true,
    payload
  }
}

export function unchanged<T>(payload: T): Update<T> {
  return {
    isUpdated: false,
    payload
  }
}