export const createInstance = defaultState => {
  let state = defaultState
  let subscribeCallbacks = []

  const add = (action, cb) => {
    action.cb = params => {
      state = cb(state, params)

      subscribeCallbacks.forEach(subscribeCb => subscribeCb({ state, params }))
    }

    return instance
  }

  const reset = action => {
    action.cb = () => {
      state = defaultState

      subscribeCallbacks.forEach(subscribeCb => subscribeCb({ state, params: defaultState }))
    }

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
