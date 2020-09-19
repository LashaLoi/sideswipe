export const createAsync = cb => {
  const async = async (...params) => {
    async.pending.data = true
    async.pending.cbs?.forEach(cb => cb(true))

    try {
      const result = await cb(...params)

      async.done.data = result
      async.done.cbs?.forEach(cb => cb(result))

      return result
    } catch ({ message }) {
      async.fail.data = message
      async.fail.cbs?.forEach(cb => cb(message))
    } finally {
      resetAsync()
    }
  }

  const resetAsync = () => {
    async.pending = { data: false }
    async.done = { data: null }
    async.fail = { data: null }
  }

  resetAsync()

  return async
}
