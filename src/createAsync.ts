type A<T = unknown> = {
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

export type AsyncCbs<T> = A["pending"] | A<T>["done"] | A["fail"]

export type Async<T> = ((params?: T) => Promise<T | undefined>) & A<T>

export function createAsync<T>(cb: (params?: T) => Promise<T>): Async<T> {
  const async: Async<T> = async params => {
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
