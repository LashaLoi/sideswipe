export type Action<T> = ((params?: T) => void) & {
  cbs?: ((params?: T) => void)[]
}

export function createAction<T>(): Action<T> {
  const action: Action<T> = params => action.cbs?.forEach(fn => fn(params))

  return action
}
