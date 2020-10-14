import { ActionResult } from "./index.d"

export function createAction<T>(): ActionResult<T> {
  const action: ActionResult<T> = params => action.cbs?.forEach(fn => fn(params))

  return action
}
