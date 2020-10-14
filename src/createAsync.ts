type Status<T = unknown> = {
  pending: {
    cbs?: ((params?: boolean) => void)[]
  }
  done: {
    cbs?: ((params?: T) => void)[]
  }
  fail: {
    cbs?: ((params?: string) => void)[]
  }
}

export type AsyncCbs<T> = Status["pending"] | Status<T>["done"] | Status["fail"]
export type AsyncResult<T> = ((params?: T) => Promise<T | undefined>) & Status<T>
export type Async<T> = (cb: (params?: T) => Promise<T>) => AsyncResult<T>

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
