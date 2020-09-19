export const createInstance = defaultState => {
  let state = defaultState
  let subscribeCallbacks = []

  const add = (action, cb) => {
    const handler = params => {
      state = cb(state, params)

      subscribeCallbacks.forEach(subscribeCb => subscribeCb({ state, params }))
    }

    action.cbs = action.cbs ? [...action.cbs, handler] : [handler]

    return instance
  }

  const reset = action => {
    const handler = () => {
      state = defaultState

      subscribeCallbacks.forEach(subscribeCb => subscribeCb({ state, params: defaultState }))
    }

    action.cbs = action.cbs ? [...action.cbs, handler] : [handler]

    return instance
  }

  const subscribe = cb => {
    subscribeCallbacks = [...subscribeCallbacks, cb]

    return () => {
      subscribeCallbacks = subscribeCallbacks.filter(subscribeCb => subscribeCb !== cb)
    }
  }

  const getState = () => state

  const instance = {
    getState,
    subscribe,
    reset,
    add
  }

  return instance
}
