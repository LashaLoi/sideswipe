export type ActionResult<T> = ((params?: T) => void) & {
  cbs?: ((params?: T) => void)[]
}

export type Action<T> = () => ActionResult<T>

export function createAction<T>(): ActionResult<T> {
  const action: ActionResult<T> = params => action.cbs?.forEach(fn => fn(params))

  return action
}
