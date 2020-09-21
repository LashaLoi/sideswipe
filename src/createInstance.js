export const createInstance = defaultState => {
  let state = defaultState
  let subscribeCallbacks = []

  const add = (action, cb) => {
    handleAction(action, () => cb(state, params))

    return instance
  }

  const reset = action => {
    handleAction(action, () => defaultState)

    return instance
  }

  const subscribe = cb => {
    subscribeCallbacks = [...subscribeCallbacks, cb]

    return () => {
      subscribeCallbacks = subscribeCallbacks.filter(subscribeCb => subscribeCb !== cb)
    }
  }

  const getState = () => state

  const handleAction = (action, cb) => {
    const handler = params => {
      state = cb()

      subscribeCallbacks.forEach(subscribeCb => subscribeCb({ state, params }))
    }

    action.cbs = action.cbs ? [...action.cbs, handler] : [handler]
  }

  const instance = {
    getState,
    subscribe,
    reset,
    add
  }

  return instance
}
