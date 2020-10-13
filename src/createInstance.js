export const createInstance = defaultState => {
  let state = defaultState
  let handlers = []

  const add = (action, cb) => {
    const handler = params => {
      state = cb(state, params)

      notify()
    }

    action.cbs = action.cbs ? [...action.cbs, handler] : [handler]

    return instance
  }

  const reset = action => {
    const handler = () => {
      state = defaultState

      notify()
    }

    action.cbs = action.cbs ? [...action.cbs, handler] : [handler]

    return instance
  }

  const subscribe = cb => {
    handlers = [...handlers, cb]

    return () => {
      handlers = handlers.filter(fn => fn !== cb)
    }
  }

  const getState = () => state

  const notify = () => handlers.forEach(fn => fn({ state, params }))

  const instance = {
    getState,
    subscribe,
    reset,
    add
  }

  return instance
}
