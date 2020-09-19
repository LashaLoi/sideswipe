export const createAsync = cb => {
  const async = async (...params) => {
    async.pending.cb?.(true)

    try {
      const result = await cb(...params)

      async.done.cb?.(result)

      return result
    } catch ({ message }) {
      async.fail.cb?.(message)
    } finally {
      async.pending.cb?.(false)
    }
  }

  async.pending = {}
  async.done = {}
  async.fail = {}

  return async
}
