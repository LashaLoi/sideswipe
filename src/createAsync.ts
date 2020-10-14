import { AsyncResult } from "./index.d"

export function createAsync<T>(cb: (params?: T) => Promise<T>): AsyncResult<T> {
  const async: AsyncResult<T> = async params => {
    async.pending.cbs?.forEach(cb => cb(true))

    try {
      const result = await cb(params)

      async.done.cbs?.forEach(cb => cb(result))

      return result
    } catch ({ message }) {
      async.fail.cbs?.forEach(cb => cb(message))
    }
  }

  async.pending = {}
  async.done = {}
  async.fail = {}

  return async
}
