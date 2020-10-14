// createAction
export type ActionResult<T> = ((params?: T) => void) & {
  cbs?: ((params?: T) => void)[]
}

export type Action<T> = () => ActionResult<T>

// createAsync
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

// createInstance
type SubscribeFn<T> = (params: { state: T; params: unknown }) => void
type UnsubscribeFn = () => void

type Fn<T> = (state: T, params: unknown) => T

type AddCb<T> = (action: ActionResult<T> | AsyncCbs<any>, fn: Fn<T>) => InstanceResult<T>
type ResetCb<T> = (action: ActionResult<T> | AsyncCbs<any>) => InstanceResult<T>
type SubscribeCb<T> = (cb: SubscribeFn<T>) => UnsubscribeFn
type GetStateCb<T> = () => T

export type InstanceResult<T> = {
  subscribe: SubscribeCb<T>
  getState: GetStateCb<T>
  reset: ResetCb<T>
  add: AddCb<T>
}
