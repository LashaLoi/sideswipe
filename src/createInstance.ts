import { Action } from "./createAction"
import { AsyncCbs } from "./createAsync"

type SubscribeFn<T> = (params: { state: T; params: unknown }) => void
type UnsubscribeFn = () => void

type Fn<T> = (state: T, params: unknown) => T

type AddCb<T> = (action: Action<T> | AsyncCbs<any>, fn: Fn<T>) => InstanceResult<T>
type ResetCb<T> = (action: Action<T> | AsyncCbs<any>) => InstanceResult<T>
type SubscribeCb<T> = (cb: SubscribeFn<T>) => UnsubscribeFn
type GetStateCb<T> = () => T

type InstanceResult<T> = {
  subscribe: SubscribeCb<T>
  getState: GetStateCb<T>
  reset: ResetCb<T>
  add: AddCb<T>
}

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
