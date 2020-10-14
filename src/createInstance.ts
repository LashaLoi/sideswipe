import { InstanceResult, SubscribeFn, SubscribeCb, AddCb, ResetCb, GetStateCb } from "./index.d"

export function createInstance<T = unknown>(defaultState: T): InstanceResult<T> {
  let _state = defaultState
  let _subscriptions: SubscribeFn<T>[] = []

  const _notify = (params?: unknown) => _subscriptions.forEach(fn => fn({ state: _state, params }))

  const add: AddCb<T> = (action, fn) => {
    const handler = (params: T) => {
      _state = fn(_state, params)

      _notify(params)
    }

    action.cbs = action.cbs ? [...action.cbs, handler] : [handler]

    return instance
  }

  const reset: ResetCb<T> = action => {
    const handler = () => {
      _state = defaultState

      _notify()
    }

    action.cbs = action.cbs ? [...action.cbs, handler] : [handler]

    return instance
  }

  const subscribe: SubscribeCb<T> = cb => {
    _subscriptions = [..._subscriptions, cb]

    return () => {
      _subscriptions = _subscriptions.filter(fn => fn !== cb)
    }
  }

  const getState: GetStateCb<T> = () => _state

  const instance: InstanceResult<T> = {
    getState,
    subscribe,
    reset,
    add
  }

  return instance
}
